import os
import tensorflow as tf
import numpy as np

def test_model():
    print("[-] Testing Model Loading...")
    
    # Path logic from signal_analysis.py
    base_path = os.path.abspath("core")
    model_path = os.path.join(base_path, "models", "verifdoc_forensic_model_v2.h5")
    
    print(f"[-] Looking for model at: {model_path}")
    
    if not os.path.exists(model_path):
        print("❌ FAIL: File not found at expected path.")
        return

    try:
        model = tf.keras.models.load_model(model_path)
        print("✅ SUCCESS: Model loaded via Keras!")
        
        # Dummy prediction
        print("[-] Running dummy prediction...")
        dummy_input = np.zeros((1, 224, 224, 3))
        pred = model.predict(dummy_input)
        print(f"[-] Prediction output shape: {pred.shape}")
        print(f"[-] Prediction value: {pred[0][0]}")
        print("✅ SUCCESS: Model is functional.")
        
    except Exception as e:
        print(f"❌ ERROR: Failed to load model. Reason: {e}")

if __name__ == "__main__":
    test_model()
