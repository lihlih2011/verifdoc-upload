from PIL import Image, ImageOps

def create_compatible_logo(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        # Open image
        img = Image.open(input_path).convert("RGBA")
        
        # Create background with the exact PDF Header Color (18, 26, 60)
        bg = Image.new("RGB", img.size, (18, 26, 60))
        
        # Create a white layout of the logo to paste on top
        # We assume the logo alpha channel defines the shape
        
        # Create a solid white image
        white_logo = Image.new("RGBA", img.size, (255, 255, 255, 255))
        
        # Use the original image alpha as mask to paste white on bg?
        # Or just paste the original image if it's already bright?
        # Start by making the logo WHITE
        
        datas = img.getdata()
        new_data = []
        for item in datas:
            # item is (r,g,b,a)
            if item[3] > 0: # If visible
                # Make it WHITE
                new_data.append((255, 255, 255, item[3]))
            else:
                new_data.append((0, 0, 0, 0))
        
        img_white = Image.new("RGBA", img.size)
        img_white.putdata(new_data)
        
        # Composite white logo over dark blue background
        bg.paste(img_white, (0, 0), img_white)
        
        # Save as JPG
        bg.save(output_path, "JPEG", quality=95)
        print(f"Saved optimized logo to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

# Paths
input_file = r"c:\Users\chaou\Desktop\VerifDoc Beta\frontend\public\images\verifdoc-logo-v3.png"
output_file = r"c:\Users\chaou\Desktop\VerifDoc Beta\backend\static\img\logo_header.jpg"

create_compatible_logo(input_file, output_file)
