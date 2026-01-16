from PIL import Image
import numpy as np

def remove_white_background(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if pixel is white-ish (allow some tolerance)
            # 240 is a safe threshold for "white" in typical logos
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0)) # Transparent
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # Paths are relative to where the command is run, usually root
    input_file = r"c:\Users\chaou\Desktop\VerifDoc Beta\frontend\public\logo-verifdoc.png"
    output_file = r"c:\Users\chaou\Desktop\VerifDoc Beta\frontend\public\logo-verifdoc.png"
    remove_white_background(input_file, output_file)
