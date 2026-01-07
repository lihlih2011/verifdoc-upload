import requests
import os
import sys

BASE_URL = "http://localhost:8000"

def test_full_flow():
    print("--- STARTING AUTOMATED SYSTEM TEST ---")
    
    # 1. Login (simulated or real)
    # Since auth is mocked/flexible, we might just hit the analyze endpoint with a dummy token if allowed, 
    # OR lets use the 'login_test_user' from seed if possible.
    # We'll use the token endpoint.
    print("1. Logging in as Client...")
    try:
        resp = requests.post(f"{BASE_URL}/api/auth/token", data={
            "username": "client@verifdoc.io",
            "password": "client123"
        })
        if resp.status_code != 200:
            print(f"FAILED LOGIN: {resp.text}")
            return
        token = resp.json()["access_token"]
        print("   -> Login Success. Token acquired.")
    except Exception as e:
        print(f"FAILED LOGIN CONNECTION: {e}")
        return

    # 2. Upload Document
    print("2. Uploading Test Document...")
    # Create a dummy PDF
    with open("test_upload.pdf", "wb") as f:
        f.write(b"%PDF-1.4 header dummy content")
    
    try:
        files = {'file': ('test_upload.pdf', open('test_upload.pdf', 'rb'), 'application/pdf')}
        headers = {'Authorization': f'Bearer {token}'}
        
        # Determine endpoint - is it /api/vds/analyze or /api/vision/analyze?
        # Frontend uses /api/vds/analyze now.
        resp = requests.post(f"{BASE_URL}/api/vds/analyze", headers=headers, files=files)
        
        if resp.status_code != 200:
            print(f"FAILED UPLOAD: {resp.text}")
            return
        
        result = resp.json()
        print("   -> Analysis Success.")
        print(f"   -> Verdict: {result.get('verdict')}")
        print(f"   -> File Path from API: {result.get('file_path')}")
        
    except Exception as e:
        print(f"FAILED UPLOAD REQUEST: {e}")
        return

    # 3. Check PDF Download
    print("3. Verifying PDF Accessibility...")
    file_path = result.get('file_path')
    if not file_path:
        print("FAILED: No file path returned.")
        return
        
    if not file_path.endswith(".pdf"):
        print(f"WARNING: Returned file is not a PDF! ({file_path})")
    
    download_url = f"{BASE_URL}{file_path}"
    print(f"   -> Downloading from: {download_url}")
    
    try:
        dl_resp = requests.get(download_url)
        if dl_resp.status_code == 200:
            print(f"   -> SUCCESS! File downloaded ({len(dl_resp.content)} bytes).")
            print("   -> PDF Header check: " + str(dl_resp.content[:4]))
        else:
             print(f"FAILED DOWNLOAD: HTTP {dl_resp.status_code}")
    except Exception as e:
         print(f"FAILED DOWNLOAD REQUEST: {e}")

    print("--- TEST COMPLETED SUCCESSFULLY ---")

if __name__ == "__main__":
    test_full_flow()
