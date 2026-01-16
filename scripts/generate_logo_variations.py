from PIL import Image, ImageOps
import os

def process_logos(source_path, output_dir):
    try:
        # Load source
        print(f"Processing: {source_path}")
        img = Image.open(source_path).convert("RGBA")
        
        # 1. Generate LIGHT Version (For Dark Mode) -> All visible pixels become pure White
        # We use the alpha channel as the mask for the new white image
        print("Generating Light version...")
        r, g, b, a = img.split()
        img_light = Image.merge("RGBA", (
            Image.new("L", img.size, 255), # R = 255
            Image.new("L", img.size, 255), # G = 255
            Image.new("L", img.size, 255), # B = 255
            a # Keep original alpha
        ))
        img_light.save(os.path.join(output_dir, "logo-verifdoc-light.png"), "PNG")

        # 2. Generate DARK Version (For Light Mode) -> All visible pixels become Dark Blue (#1e293b)
        print("Generating Dark version...")
        dark_color = (30, 41, 59) # Slate-800
        img_dark = Image.merge("RGBA", (
            Image.new("L", img.size, dark_color[0]),
            Image.new("L", img.size, dark_color[1]),
            Image.new("L", img.size, dark_color[2]),
            a # Keep original alpha
        ))
        img_dark.save(os.path.join(output_dir, "logo-verifdoc-dark.png"), "PNG")

        # 3. Generate SAFE Version (Original on White Background)
        print("Generating Safe version...")
        # Add 10% padding
        # If source has white background already, we might want to remove it first? 
        # Assuming source is transparent PNG. If not, this step just expands canvas.
        
        # Create white canvas
        bg_w, bg_h = int(img.width * 1.2), int(img.height * 1.2)
        img_safe = Image.new("RGBA", (bg_w, bg_h), (255, 255, 255, 255))
        
        # Center image
        offset = ((bg_w - img.width) // 2, (bg_h - img.height) // 2)
        img_safe.paste(img, offset, mask=img) # Use img as mask to handle transparency
        
        img_safe.save(os.path.join(output_dir, "logo-verifdoc-safe.png"), "PNG")
        
        print("Done! Generated 3 variations.")

    except Exception as e:
        print(f"Error processing logo: {e}")

if __name__ == "__main__":
    SOURCE = r"c:\Users\chaou\Desktop\VerifDoc Beta\frontend\public\logo-official-source.png"
    OUTPUT = r"c:\Users\chaou\Desktop\VerifDoc Beta\frontend\public"
    process_logos(SOURCE, OUTPUT)
