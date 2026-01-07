import os
from datetime import datetime
from PIL import Image
import piexif
from PyPDF2 import PdfReader
from backend.engine.ai_detector import AISynthesisDetector

class MetadataInspector:
    def __init__(self):
        # Liste noire des logiciels de retouche/génération
        self.SUSPICIOUS_SOFTWARE = [
            "adobe photoshop", "gimp", "canva", "ilai", "phantompdf", 
            "midjourney", "stable diffusion", "dall-e", "paint.net", 
            "wkhtmltopdf", "ilovepdf", "sejda", "edit", "modify"
        ]
        
        # Liste blanche (Scanners, OS, Imprimantes)
        self.TRUSTED_SOFTWARE = [
            "canon", "hp", "brother", "epson", "ricoh", "sharp", "xerox",
            "konica minolta", "samsung", "apple ios", "android", "microsoft office lens"
        ]

    def inspect(self, file_path):
        """
        Analyse les métadonnées pour déterminer l'origine du fichier.
        Retourne un score de risque (0-100) et un rapport textuel.
        """
        ext = os.path.splitext(file_path)[1].lower()
        report = {
            "risk_score": 0,
            "software": "Inconnu",
            "creation_date": None,
            "modification_date": None,
            "flags": [],
            "verdict": "neutre",
            "ai_report": None # NOUVEAU CHAMP
        }

        # --- NOUVEAU : DETECTION EXPERTE IA & C2PA ---
        # On lance l'analyse fréquentielle et C2PA
        try:
            ai_res = AISynthesisDetector.analyze_image(file_path)
            report["ai_report"] = ai_res
            
            if ai_res["c2pa_detected"]:
                report["flags"].append("C2PA_SIGNED_CONTENT")
                report["risk_score"] = 0 # Contenu signé = confiance absolue (pour l'instant)
            
            if ai_res["ai_probability_score"] >= 80:
                report["risk_score"] = 100
                report["flags"].append(f"AI_GENERATION_DETECTED ({ai_res['ai_probability_score']}%)")
            elif ai_res["ai_probability_score"] >= 50:
                report["risk_score"] += 40
                report["flags"].append("SUSPICIOUS_FREQUENCY_ARTIFACTS")

        except Exception as e:
            print(f"AI Detection failed: {e}")

        try:
            if ext in ['.jpg', '.jpeg', '.png', '.tiff']:
                self._inspect_image(file_path, report)
            elif ext == '.pdf':
                self._inspect_pdf(file_path, report)
        except Exception as e:
            report["flags"].append(f"Erreur lecture métadonnées: {str(e)}")
            # Si on ne peut pas lire les métadonnées, c'est suspect mais pas coupable
            report["risk_score"] += 10 

        # Analyse finale des flags
        if report["risk_score"] >= 80:
            report["verdict"] = "fraude_structurelle"
        elif report["risk_score"] >= 40:
            report["verdict"] = "suspect"
        elif "SAFE_ORIGIN" in report["flags"]:
            report["verdict"] = "certifie"
        else:
            report["verdict"] = "neutre"

        return report

    def _inspect_image(self, file_path, report):
        try:
            img = Image.open(file_path)
            exif_dict = piexif.load(img.info.get("exif", b""))
            
            # 1. Recherche du logiciel (Software - Tag 305)
            if "0th" in exif_dict and piexif.ImageIFD.Software in exif_dict["0th"]:
                software = exif_dict["0th"][piexif.ImageIFD.Software].decode("utf-8").lower()
                report["software"] = software
                self._check_software(software, report)

            # 2. Dates (DateTimeOriginal - Tag 36867)
            if "Exif" in exif_dict and piexif.ExifIFD.DateTimeOriginal in exif_dict["Exif"]:
                date_str = exif_dict["Exif"][piexif.ExifIFD.DateTimeOriginal].decode("utf-8")
                # Format standard Exif: "YYYY:MM:DD HH:MM:SS"
                report["creation_date"] = date_str
            
        except Exception:
            # Pas d'exif ou illisible (fréquent sur le web)
            pass

    def _inspect_pdf(self, file_path, report):
        try:
            reader = PdfReader(file_path)
            meta = reader.metadata
            
            if not meta:
                return

            # Creator / Producer
            creator = meta.get("/Creator", "").lower()
            producer = meta.get("/Producer", "").lower()
            software_found = f"{creator} / {producer}".strip(" /")
            
            if software_found:
                report["software"] = software_found
                self._check_software(software_found, report)

            # Dates
            if "/CreationDate" in meta:
                report["creation_date"] = meta["/CreationDate"]
            if "/ModDate" in meta:
                report["modification_date"] = meta["/ModDate"]

            # Vérification Anachronisme (Si Modified >> Created)
            # (Implémentation simplifiée pour l'instant)

        except Exception as e:
            pass

    def _check_software(self, software_name, report):
        """Vérifie si le logiciel détecté est ami ou ennemi"""
        
        # Test Blacklist (Fraude)
        for bad in self.SUSPICIOUS_SOFTWARE:
            if bad in software_name:
                report["risk_score"] = 100
                report["flags"].append(f"LOGICIEL INTERDIT DÉTECTÉ: {bad.upper()}")
                report["flags"].append("ORIGINE_IA_OU_RETOUCHE")
                return

        # Test Whitelist (Scanner/Camera)
        for good in self.TRUSTED_SOFTWARE:
            if good in software_name:
                report["risk_score"] = 0
                report["flags"].append("SAFE_ORIGIN")
                report["flags"].append(f"Matériel certifié: {good.upper()}")
                return

inspector = MetadataInspector()
