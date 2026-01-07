import os
import sys
import fitz  # PyMuPDF
from pathlib import Path

def convert_pdfs_to_images(input_dir, output_dir, dpi=300):
    """
    Converts all PDFs in input_dir to JPG images in output_dir.
    Maintains high quality (300 DPI) for Forensic Training.
    """
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    input_path = Path(input_dir)
    pdf_files = list(input_path.glob("*.pdf"))
    
    if not pdf_files:
        print(f"No PDFs found in {input_dir}")
        return

    print(f"Found {len(pdf_files)} PDFs. Converting to Images (300 DPI)...")
    
    for pdf_file in pdf_files:
        try:
            doc = fitz.open(pdf_file)
            for i, page in enumerate(doc):
                # 300 DPI = matrix(4.16, 4.16) approx, basic is 72 dpi. 300/72 = 4.16
                zoom = 300 / 72
                mat = fitz.Matrix(zoom, zoom)
                pix = page.get_pixmap(matrix=mat)
                
                # Output filename: original_page_X.jpg
                base_name = pdf_file.stem
                out_name = f"{base_name}_page_{i+1}.jpg"
                out_path = os.path.join(output_dir, out_name)
                
                pix.save(out_path)
                print(f"   -> Saved {out_name}")
                
        except Exception as e:
            print(f"Error converting {pdf_file.name}: {e}")

if __name__ == "__main__":
    # Default Paths
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Input Directory (User Argument or Default)
    if len(sys.argv) > 1:
        INPUT_DIR = sys.argv[1]
    else:
        # Fallback to internal folder
        INPUT_DIR = os.path.join(BASE_DIR, "..", "DATASET_REAL", "RAW_PDFS")

    # 2. Output Directory
    OUTPUT_DIR = os.path.join(BASE_DIR, "..", "DATASET_REAL", "AUTHENTIC")
    
    print("--- VerifDoc Dataset Prepper ---")
    print(f"Input: {INPUT_DIR}")
    print(f"Output: {OUTPUT_DIR}")
    
    if not os.path.exists(INPUT_DIR):
        print(f"Error: Input Directory not found: {INPUT_DIR}")
    else:
        convert_pdfs_to_images(INPUT_DIR, OUTPUT_DIR)
