
import os
import glob
import pikepdf
from PIL import Image
import io

def extract_images_from_pdf(input_dir):
    pdf_files = glob.glob(os.path.join(input_dir, "*.pdf"))
    if not pdf_files:
        print(f"No PDF files found in {input_dir}")
        return

    print(f"Found {len(pdf_files)} PDFs. Extracting images...")

    for pdf_path in pdf_files:
        print(f"Processing: {pdf_path}")
        try:
            pdf = pikepdf.open(pdf_path)
            count = 0
            for i, page in enumerate(pdf.pages):
                for name, image_obj in page.images.items():
                    try:
                        # Extract basic images
                        img = pikepdf.PdfImage(image_obj) 
                        pil_img = img.as_pil_image()
                        
                        # Convert to RGB if needed
                        if pil_img.mode in ("P", "RGBA", "LA"):
                            pil_img = pil_img.convert("RGB")
                            
                        # Filter very small images (icons, logos)
                        w, h = pil_img.size
                        if w < 200 or h < 200:
                            continue

                        save_name = f"{os.path.splitext(pdf_path)[0]}_page{i}_{count}.jpg"
                        pil_img.save(save_name, quality=95)
                        print(f"   [+] Saved {save_name}")
                        count += 1
                    except Exception as e:
                        print(f"   [-] Error extracting image {name}: {e}")
            
            if count == 0:
                print("   [!] WARNING: No usable images found (Vector PDF?). Please provide a JPG/PNG scan.")

        except Exception as e:
            print(f"[-] Failed to open PDF: {e}")

if __name__ == "__main__":
    target_dir = r"C:\Users\chaou\Desktop\VerifDoc Beta\DATASET_TAX_NOTICE_FR\AUTHENTIC"
    extract_images_from_pdf(target_dir)
