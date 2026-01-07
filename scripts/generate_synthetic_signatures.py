import numpy as np
import cv2
import os
import random
from scipy.interpolate import splprep, splev

OUTPUT_DIR = r"data/authentic/signatures"
NUM_SIGNATURES = 50

def generate_signature(idx):
    # Create blank image (white background)
    width, height = 400, 200
    img = np.ones((height, width, 3), dtype=np.uint8) * 255
    
    # Generate random points for the signature path
    num_points = random.randint(5, 12)
    # Random walk somewhat centered
    x = np.linspace(50, width-50, num_points) + np.random.randint(-20, 20, num_points)
    y = np.linspace(height/2, height/2, num_points) + np.random.randint(-50, 50, num_points)
    
    # Interpolate using B-Spline (creates smooth curves)
    try:
        # B-spline representations of N-D curves
        tck, u = splprep([x, y], s=0)
        u_new = np.linspace(u.min(), u.max(), 1000)
        x_new, y_new = splev(u_new, tck)
        
        # Draw the points
        pts = np.vstack((x_new, y_new)).astype(np.int32).T
        
        # Randomize ink color (blue/black variations)
        # Blueish: R low, G low, B high
        # Black: all low
        if random.random() > 0.5:
             # Blue ink
             ink_color = (random.randint(50, 100), random.randint(0, 50), random.randint(0, 50)) # BGR
        else:
             # Black ink
             v = random.randint(0, 60)
             ink_color = (v, v, v)
        
        thickness = random.randint(2, 4)
        
        cv2.polylines(img, [pts], isClosed=False, color=ink_color, thickness=thickness, lineType=cv2.LINE_AA)
        
        # Save
        if not os.path.exists(OUTPUT_DIR):
            os.makedirs(OUTPUT_DIR)

        filename = f"sig_syn_{idx:04d}.png"
        path = os.path.join(OUTPUT_DIR, filename)
        cv2.imwrite(path, img)
        return True
    except Exception as e:
        print(f"Failed to gen signature {idx}: {e}")
        return False

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    print(f"Generating {NUM_SIGNATURES} synthetic signatures in {OUTPUT_DIR}...")
    
    count = 0
    for i in range(NUM_SIGNATURES):
        if generate_signature(i):
            count += 1
            
    print(f"Done. Generated {count} signatures.")

if __name__ == "__main__":
    main()
