import numpy as np
import cv2
import os

class SpectralEngine:
    def __init__(self):
        print("⚡ Spectral Engine (FFT) Initialized.")

    def analyze(self, image_path: str):
        """
        Performs Fast Fourier Transform (FFT) analysis to detect tampering artifacts.
        Returns a risk score (0-100) and a diagnosis.
        """
        try:
            # 1. Load Image in Grayscale
            # If cv2 fails or image is PDF, we might need pre-conversion. 
            # Assuming image_path is a valid image file here.
            img = cv2.imread(image_path, 0)
            if img is None:
                return {"score": 0, "verdict": "neutre", "details": "Image illisible pour FFT"}

            # 2. Compute FFT (2D)
            f = np.fft.fft2(img)
            fshift = np.fft.fftshift(f)
            
            # 3. Magnitude Spectrum (Log Scale)
            magnitude_spectrum = 20 * np.log(np.abs(fshift) + 1e-10) # Avoid log(0)

            # 4. Artifact Detection (Basic Heuristic)
            # A natural image has a specific spectral decay. 
            # Tampering (resampling, grid alignment) creates distinct spikes away from center.
            
            rows, cols = img.shape
            crow, ccol = rows//2 , cols//2
            
            # Mask the center (low frequencies = structure)
            # We want to check HIGH frequencies (noise/edges)
            mask_size = 30
            magnitude_spectrum[crow-mask_size:crow+mask_size, ccol-mask_size:ccol+mask_size] = 0
            
            # Calculate mean energy in high frequencies
            high_freq_energy = np.mean(magnitude_spectrum)
            max_energy = np.max(magnitude_spectrum)
            
            # 5. Risk Calculation
            # This is a calibrated heuristic. 
            # If high freq noise is too uniform or too peaked, it might be artificial.
            
            risk_score = 0
            details = "Spectre naturel cohérent."
            verdict = "conforme"

            # Thresholds (Simulated based on common forgery patterns)
            if max_energy > 200: # Very bright spikes in high freq
                risk_score = 85
                details = "Anomalies fréquentielles fortes (Possible copier-coller ou redimensionnement)"
                verdict = "suspect"
            elif high_freq_energy > 150: # Too much high freq noise globally
                risk_score = 65
                details = "Bruit numérique incohérent (Possible compression multiple)"
                verdict = "suspect"
            
            result = {
                "score": int(risk_score),
                "verdict": verdict,
                "details": details,
                "energy_mean": float(high_freq_energy)
            }
            
            return result

        except Exception as e:
            print(f"❌ Spectral Error: {e}")
            return {"score": 0, "verdict": "error", "details": "Echec analyse spectrale"}

# Singleton
spectral_engine = SpectralEngine()
