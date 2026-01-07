
import numpy as np
import io
# Try importing optional heavy dependencies
try:
    import easyocr
except ImportError:
    easyocr = None

try:
    from pdf2image import convert_from_bytes
except ImportError:
    convert_from_bytes = None

class OCREngine:
    def __init__(self, languages=['fr', 'en']):
        if easyocr:
            print("⚡ Loading EasyOCR Model...")
            self.reader = easyocr.Reader(languages)
            print("✅ EasyOCR Model Loaded.")
        else:
            print("⚠️ EasyOCR not found. OCR features will be disabled.")
            self.reader = None

    def extract_text_from_pdf(self, pdf_bytes: bytes) -> str:
        """
        Convert PDF to image and extract text via OCR.
        Returns the full text string.
        """
        if not self.reader:
            return "[OCR Disabled: Library missed]"

        if not convert_from_bytes:
             return "[OCR Disabled: pdf2image missed]"

        try:
            # Convert first page of PDF to image
            images = convert_from_bytes(pdf_bytes)
            full_text = ""
            
            for i, image in enumerate(images):
                # Convert PIL image to numpy array for EasyOCR
                img_np = np.array(image)
                result = self.reader.readtext(img_np, detail=0)
                full_text += " ".join(result) + "\n"
                
                # Limit to first 2 pages for performance in MVP
                if i >= 1: break
                
            return full_text
            
        except Exception as e:
            print(f"❌ OCR Error (PDF): {e}")
            return ""

    def extract_text_from_image(self, image_bytes: bytes) -> str:
        """
        Directly extract text from image bytes.
        """
        if not self.reader:
             return "[OCR Disabled: Library missed]"

        try:
            result = self.reader.readtext(image_bytes, detail=0)
            return " ".join(result)
        except Exception as e:
            print(f"❌ OCR Error (Image): {e}")
            return ""

# Singleton instance to avoid reloading model
ocr_engine = OCREngine()