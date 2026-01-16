import os
import shutil
from backend.app.config import settings
from fastapi import UploadFile

try:
    import boto3
    from botocore.exceptions import NoCredentialsError
except ImportError:
    boto3 = None

class StorageManager:
    def __init__(self):
        self.type = settings.STORAGE_TYPE
        self.bucket = settings.S3_BUCKET_NAME
        self.region = settings.AWS_REGION
        self.local_upload_dir = os.path.join(os.getcwd(), "backend", "uploads", "temp")
        
        if not os.path.exists(self.local_upload_dir):
            os.makedirs(self.local_upload_dir, exist_ok=True)

        if self.type == "s3" and boto3:
            self.s3_client = boto3.client(
                's3',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=self.region
            )
        else:
            self.s3_client = None

    async def save_upload(self, file: UploadFile, filename: str) -> str:
        """
        Save an uploaded file to storage.
        Returns the path or URI to access the file.
        """
        # Always save locally first for processing if needed, 
        # or stream to S3. For simplicity, we save locally first using a buffer.
        
        file_path = os.path.join(self.local_upload_dir, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        if self.type == "s3" and self.s3_client:
            try:
                s3_key = f"uploads/{filename}"
                self.s3_client.upload_file(file_path, self.bucket, s3_key)
                
                # We can delete local file if we want, but for now we might need it for local processing
                # Actually, the async task will need to DOWNLOAD it if it's S3.
                # So we return the S3 URI.
                
                # Cleanup local immediately if we are pure cloud? 
                # No, we might want to keep it short term or logic.
                # Let's clean it up to verify download logic works.
                os.remove(file_path)
                
                return f"s3://{self.bucket}/{s3_key}"
            except Exception as e:
                print(f"S3 Upload Error: {e}")
                # Fallback to local
                return file_path
        
        return file_path

    def download_file(self, uri: str) -> str:
        """
        Ensures file is available locally at a returned path.
        If S3 URI, downloads it to temp.
        """
        if uri.startswith("s3://"):
            if not self.s3_client:
                 raise ValueError("S3 configured but client not initialized")
            
            # Parse bucket and key
            parts = uri.replace("s3://", "").split("/", 1)
            bucket = parts[0]
            key = parts[1]
            
            local_dest = os.path.join(self.local_upload_dir, os.path.basename(key))
            
            self.s3_client.download_file(bucket, key, local_dest)
            return local_dest
        
        # It's a local path
        return uri

    def delete_file(self, uri: str):
        """
        Deletes file from storage.
        """
        if uri.startswith("s3://"):
             if self.s3_client:
                parts = uri.replace("s3://", "").split("/", 1)
                bucket = parts[0]
                key = parts[1]
                self.s3_client.delete_object(Bucket=bucket, Key=key)
        else:
            if os.path.exists(uri):
                os.remove(uri)

storage = StorageManager()
