from PIL import Image

def create_white_bg_logo(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        # Open image
        img = Image.open(input_path).convert("RGBA")
        
        # Create solid WHITE background
        bg = Image.new("RGB", img.size, (255, 255, 255))
        
        # Paste logo on top using alpha mask
        bg.paste(img, (0, 0), img)
        
        # Save as JPG
        bg.save(output_path, "JPEG", quality=95)
        print(f"Saved solid white bg logo to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

# Paths
input_file = r"c:\Users\chaou\Desktop\VerifDoc Beta\frontend\public\images\verifdoc-logo-v3.png"
output_file = r"c:\Users\chaou\Desktop\VerifDoc Beta\backend\static\img\logo_print.jpg"

create_white_bg_logo(input_file, output_file)
