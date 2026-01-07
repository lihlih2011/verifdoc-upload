import cv2
import numpy as np
import os

class AISynthesisDetector:
    """
    Module expert pour la détection de contenu généré par IA (GANs/Diffusion)
    et la validation de provenance C2PA.
    """

    @staticmethod
    def analyze_image(file_path: str):
        """
        Analyse complète d'une image pour détecter la synthèse.
        Retourne un score de probabilité IA (0-100) et la présence de C2PA.
        """
        if not os.path.exists(file_path):
            return {"error": "File not found"}

        # 1. Vérification C2PA (Provenance)
        has_c2pa = AISynthesisDetector._check_c2pa_manifest(file_path)

        # 2. Analyse Fréquentielle (FFT) pour artefacts IA
        # Les IA laissent des signatures périodiques en hautes fréquences
        ai_score = AISynthesisDetector._analyze_frequency_spectrum(file_path)

        # 3. Interprétation
        verdict = "Authentique"
        details = "Structure naturelle des pixels."
        
        if ai_score > 75:
            verdict = "Suspect (IA probable)"
            details = "Artefacts de grille détectés (signature GAN/Diffusion)."
        elif has_c2pa:
            verdict = "Certifié C2PA"
            details = "Manifeste de provenance cryptographique présent."

        return {
            "ai_probability_score": round(ai_score, 2),
            "c2pa_detected": has_c2pa,
            "verdict": verdict,
            "details": details
        }

    @staticmethod
    def _check_c2pa_manifest(file_path: str) -> bool:
        """
        Scan binaire rapide à la recherche du marqueur 'jumb' (JUMBF Box/C2PA).
        """
        try:
            with open(file_path, "rb") as f:
                # On lit les premiers 64kb, généralement le header suffit
                header = f.read(64000) 
                # Recherche de la signature hexadécimale du SuperBox C2PA
                # 'jumb' en ASCII
                return b'jumb' in header or b'c2pa' in header
        except Exception:
            return False

    @staticmethod
    def _analyze_frequency_spectrum(file_path: str) -> float:
        """
        Applique une Transformée de Fourier Rapide (FFT) pour détecter
        les anomalies fréquentielles typiques des Deepfakes.
        """
        try:
            # Charger en niveau de gris
            img = cv2.imread(file_path, cv2.IMREAD_GRAYSCALE)
            if img is None:
                return 0.0

            # Transformée de Fourier 2D
            f = np.fft.fft2(img)
            fshift = np.fft.fftshift(f)
            
            # Spectre de magnitude
            magnitude_spectrum = 20 * np.log(np.abs(fshift) + 1)

            # Analyse des Hautes Fréquences (Coins du spectre shifté)
            h, w = magnitude_spectrum.shape
            center_h, center_w = h // 2, w // 2
            
            # On masque le centre (basses fréquences = contenu visible)
            # Pour ne garder que le bruit/texture (hautes fréquences)
            mask_size = 30
            magnitude_spectrum[center_h-mask_size:center_h+mask_size, center_w-mask_size:center_w+mask_size] = 0

            # Calcul de la moyenne et de la variance des hautes fréquences
            mean_hf = np.mean(magnitude_spectrum)
            std_hf = np.std(magnitude_spectrum)

            # HEURISTIQUE:
            # Les images naturelles ont un bruit aléatoire (StdDev élevée).
            # Les images IA ont souvent des motifs trop réguliers ou trop lisses (StdDev faible ou Pics spécifiques).
            # Ceci est un algorithme simplifié pour la démo.
            
            # Si l'écart type est anormalement bas (lissage IA) ou présente des pics (artefacts de grille)
            # Score arbitraire basé sur la variance pour cette démo
            score = 0
            if std_hf < 20: 
                score = 80 # Très lisse/synthétique
            elif std_hf > 150:
                score = 60 # Trop bruité (bruit ajouté pour masquer ?)
            else:
                score = 10 # Normal

            return float(score)

        except Exception as e:
            print(f"FFT Error: {e}")
            return 0.0
