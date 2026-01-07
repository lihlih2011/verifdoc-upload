import os
import cv2
import numpy as np
import random
from glob import glob

class ForgeryFactory:
    """
    Automated Forgery Generator for Training Data.
    Creates 'Copy-Move' and 'Splicing' forgeries from authentic documents.
    """

    def __init__(self, input_dir, output_dir):
        self.input_dir = input_dir
        self.output_dir = output_dir
        
        self.fake_dir = os.path.join(output_dir, "FAKE")
        self.mask_dir = os.path.join(output_dir, "MASKS") # Ground Truth
        
        os.makedirs(self.fake_dir, exist_ok=True)
        os.makedirs(self.mask_dir, exist_ok=True)

    def load_images(self):
        # Support PDF conversion if needed, but for now expect JPG/PNG
        extensions = ['*.jpg', '*.jpeg', '*.png', '*.bmp']
        files = []
        for ext in extensions:
            files.extend(glob(os.path.join(self.input_dir, ext)))
        return files

    def create_copy_move(self, image_path):
        """
        Takes a random patch from the image and pastes it elsewhere.
        """
        try:
            img = cv2.imread(image_path)
            if img is None: return False
            
            h, w, c = img.shape
            
            # 1. Select a random patch (Source)
            # Size determined by image size (e.g. 5% to 15%)
            patch_w = random.randint(int(w*0.05), int(w*0.15))
            patch_h = random.randint(int(h*0.02), int(h*0.05)) # Documents have text lines, so flatter patches
            
            src_x = random.randint(0, w - patch_w)
            src_y = random.randint(0, h - patch_h)
            
            patch = img[src_y:src_y+patch_h, src_x:src_x+patch_w].copy()
            
            # 2. Select target location (Destination)
            # Try to find a place that is NOT the source
            for _ in range(10):
                dst_x = random.randint(0, w - patch_w)
                dst_y = random.randint(0, h - patch_h)
                
                # Ensure no overlap
                if abs(src_x - dst_x) > patch_w or abs(src_y - dst_y) > patch_h:
                    break
            
            # 3. Create Mask (Black background, White forgery)
            mask = np.zeros((h, w), dtype=np.uint8)
            mask[dst_y:dst_y+patch_h, dst_x:dst_x+patch_w] = 255
            
            # 4. Paste Patch (Tampering)
            tampered = img.copy()
            tampered[dst_y:dst_y+patch_h, dst_x:dst_x+patch_w] = patch
            
            # 5. Save
            filename = os.path.basename(image_path)
            name, ext = os.path.splitext(filename)
            
            save_name_fake = f"{name}_copymove_{random.randint(100,999)}{ext}"
            save_name_mask = f"{name}_copymove_{random.randint(100,999)}_mask.png"
            
            cv2.imwrite(os.path.join(self.fake_dir, save_name_fake), tampered)
            cv2.imwrite(os.path.join(self.mask_dir, save_name_mask), mask)
            
            print(f"[+] Generated Copy-Move: {save_name_fake}")
            return True
            
        except Exception as e:
            print(f"[-] Error processing {image_path}: {e}")
            return False

    def run(self, count=10):
        images = self.load_images()
        if not images:
            print("No images found in input directory.")
            return

        print(f"[*] Found {len(images)} authentic images. Generating {count} forgeries...")
        
        for i in range(count):
            # Pick a random image to tamper
            target = random.choice(images)
            self.create_copy_move(target)

if __name__ == "__main__":
    # Default paths (can be changed via args if needed)
    base_dir = r"C:\Users\chaou\Desktop\VerifDoc Beta\DATASET_TAX_NOTICE_FR"
    
    input_d = os.path.join(base_dir, "AUTHENTIC")
    output_d = base_dir # Logic handles /FAKE subfolder
    
    factory = ForgeryFactory(input_d, output_d)
    factory.run(count=20) # Generate 20 fakes from user's sample