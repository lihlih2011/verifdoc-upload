from PIL import Image, ImageOps

def create_white_logo(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        
        # Create a new image with the same size
        # We want to make the non-transparent pixels WHITE
        # And keep the transparency
        
        datas = img.getdata()
        new_data = []
        
        for item in datas:
            # item is (r, g, b, a)
            # If pixel is not fully transparent, make it white
            if item[3] > 0: 
                # Check if it's not white background (some logos look transparent but are white)
                # If it's close to white (>240, 240, 240), make it transparent
                if item[0] > 240 and item[1] > 240 and item[2] > 240:
                    new_data.append((255, 255, 255, 0)) # Transparent
                else:
                    # Make it WHITE, keep alpha
                    new_data.append((255, 255, 255, item[3]))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Saved white logo via transparency method to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")
        # Fallback: Invert colors if simple transparency fail
        try:
            img = Image.open(input_path).convert("RGB")
            img = ImageOps.invert(img)
            img.save(output_path)
            print("Saved inverted logo (fallback)")
        except:
            print("Failed completely.")

# Paths
input_file = r"c:\Users\chaou\Desktop\VerifDoc Beta\frontend\public\images\verifdoc-logo-v3.png"
output_file = r"c:\Users\chaou\Desktop\VerifDoc Beta\backend\static\img\logo_white.png"

create_white_logo(input_file, output_file)
