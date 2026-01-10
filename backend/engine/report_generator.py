from fpdf import FPDF
import os
from datetime import datetime
import json
import math
import time
import tempfile
from PIL import Image, ImageDraw, ImageFont

# --- COLORS (Inspired by Duo Analytics) ---
COLOR_DEEP_BLUE = (18, 26, 60)      # Header BG
COLOR_ACCENT_ORANGE = (234, 88, 12) # Title Accent
COLOR_TEXT_WHITE = (255, 255, 255)
COLOR_TEXT_DARK = (30, 41, 59)
COLOR_BG_LIGHT = (248, 250, 252)

COLOR_OK = (16, 185, 129)     # Green
COLOR_WARN = (245, 158, 11)   # Orange
COLOR_CRIT = (239, 68, 68)    # Red

def create_gauge_modern(value, max_val, color_rgb, label, filename_prefix):
    """ Modern thin gauge for the KPI cards """
    scale = 4
    W, H = 300 * scale, 300 * scale # Square
    img = Image.new('RGBA', (W, H), (0, 0, 0, 0)) # Transparent
    draw = ImageDraw.Draw(img)
    
    cx, cy = W//2, H//2
    radius = 100 * scale
    stroke = 15 * scale
    
    # Background Ring (White semi-transparent or Dark based on context? Let's use White for colored cards)
    # Actually, if the card is colored, ring should be lighter.
    # Let's assume white background for the gauge itself usually looks cleaner on white cards.
    # But user image shows colored cards (Green Card -> White Ring).
    
    # Let's make the ring white with opacity if possible, but FPDF handles PNG alpha well.
    draw.arc([(cx-radius, cy-radius), (cx+radius, cy+radius)], start=0, end=360, fill=(255, 255, 255, 100), width=stroke)
    
    # Value Ring (White Solid)
    end_angle = -90 + int((value / max_val) * 360)
    draw.arc([(cx-radius, cy-radius), (cx+radius, cy+radius)], start=-90, end=end_angle, fill=(255, 255, 255, 255), width=stroke)
    
    # Text (Percentage)
    font_size = 60 * scale
    try: font = ImageFont.truetype("arial.ttf", font_size)
    except: font = ImageFont.load_default()
    
    text = f"{int(value)}%"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    draw.text((cx - text_w/2, cy - text_h/2), text, font=font, fill=(255, 255, 255))
    
    tmp_path = os.path.join(tempfile.gettempdir(), f"gauge_{filename_prefix}_{int(time.time())}.png")
    img.save(tmp_path)
    return tmp_path

class ModernPDF(FPDF):
    def __init__(self, filename, record_id, sector="GENERIC", logo_path=None):
        super().__init__()
        self.filename_display = filename
        self.record_id = record_id
        self.sector = sector
        self.logo_path = logo_path
        self.set_auto_page_break(auto=True, margin=15)

    def header(self):
        # 1. DEEP BLUE BANNER (Top 40mm)
        self.set_fill_color(*COLOR_DEEP_BLUE)
        self.rect(0, 0, 210, 45, 'F')
        
        # 2. LOGO / BRANDING
        self.set_font('Arial', 'B', 14)
        self.set_text_color(*COLOR_TEXT_WHITE)
        self.set_xy(10, 10)
        # Assuming no logo file for now, using Text
        self.cell(50, 10, "VERIFDOC.IO", 0, 1)
        
        # 3. TITLE (Orange Accent)
        self.set_font('Arial', 'B', 24)
        self.set_text_color(*COLOR_ACCENT_ORANGE)
        self.set_xy(10, 20)
        self.cell(0, 10, "Rapport d'Analyse Documentaire", 0, 1)
        
        # 4. SUBTITLE Info
        self.set_font('Arial', '', 9)
        self.set_text_color(200, 200, 200)
        self.set_xy(10, 32)
        self.cell(0, 5, f"Ref: {self.record_id} | Date: {datetime.now().strftime('%d %B %Y').upper()}", 0, 1)

        # 5. INFO STRIP (White Strip below blue)
        # Just spacing
        self.ln(15)

    def footer(self):
        self.set_y(-20)
        self.set_fill_color(*COLOR_DEEP_BLUE)
        self.rect(0, 277, 210, 20, 'F')
        
        self.set_font('Arial', '', 8)
        self.set_text_color(200, 200, 200)
        self.set_xy(10, -15)
        self.cell(0, 10, f"VerifDoc.io © {datetime.now().year} - Analyse IA Forensique. Ce document ne constitue pas une expertise judiciaire.", 0, 0, 'C')
        
    def draw_kpi_card(self, x, y, w, h, title, value_str, bg_color, icon_path=None):
        """ Draws a colored KPI card like in the example """
        self.set_fill_color(*bg_color)
        self.set_draw_color(*bg_color) # No border
        self.rect(x, y, w, h, 'F')
        
        # Gauge/Icon area (Centered roughly)
        if icon_path:
            self.image(icon_path, x=x + (w/2) - 12, y=y+15, w=24)
        
        # Title at Bottom
        self.set_xy(x, y + h - 15)
        self.set_font('Arial', 'B', 9)
        self.set_text_color(255, 255, 255) # Always white text on colored cards
        self.cell(w, 5, title, 0, 0, 'C')
        
        # Value (if no icon/gauge passed, print text)
        if not icon_path:
            self.set_xy(x, y + (h/2) - 5)
            self.set_font('Arial', 'B', 20)
            self.set_text_color(255, 255, 255)
            self.cell(w, 10, value_str, 0, 0, 'C')

    def draw_info_bar(self, y, data_dict):
        """ The Grey Strip with 4 info columns """
        self.set_fill_color(226, 232, 240) # Slate-200
        self.rect(10, y, 190, 15, 'F')
        
        col_width = 190 / len(data_dict)
        current_x = 10
        
        for label, value in data_dict.items():
            # Label
            self.set_xy(current_x, y+2)
            self.set_font('Arial', 'B', 8)
            self.set_text_color(100, 116, 139) # Slate-500
            self.cell(col_width, 4, label.upper(), 0, 2, 'L')
            
            # Value
            self.set_font('Arial', '', 9)
            self.set_text_color(30, 41, 59) # Slate-800
            self.cell(col_width, 5, str(value), 0, 0, 'L')
            
            current_x += col_width

class ReportGenerator:
    def __init__(self, output_dir="data/reports"):
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)
        # Use absolute path for robustness
        self.logo_path = "/app/backend/static/img/logo.png"

    def generate_report(self, data: dict, heatmaps: dict = None):
        doc_id = data.get("document_id", "UNKNOWN")
        filename = data.get("filename", f"Doc_{doc_id}")
        file_path = data.get("file_path", None)

        # Init PDF
        pdf = ModernPDF(filename, doc_id, sector=data.get("sector","GENERIC"), logo_path=self.logo_path)
        pdf.alias_nb_pages()
        pdf.add_page()
        
        # --- DATA PROCESSING ---
        fraud_risk_score = data.get("confidence", 0.0) # 0.0 to 1.0 (1.0 = Clean)
        trust_score = int(fraud_risk_score * 100) # 0 to 100%
        
        # VERDICT 3 NIVEAUX
        if trust_score >= 90:
            verdict_label = "CONFORME"
            main_color = COLOR_OK
            risk_label = "Faible"
        elif trust_score >= 50:
            verdict_label = "NON CONFORME"
            main_color = COLOR_WARN
            risk_label = "Moyen"
        else:
            verdict_label = "CRITIQUE"
            main_color = COLOR_CRIT
            risk_label = "Élevé"

        # --- SECTION 1: INFO BAR ---
        # "Project Manager", "Project Supervisor"... adapted to VerifDoc
        pdf.draw_info_bar(50, {
            "Document": filename[:20],
            "Type": data.get("sector", "Autre").upper(),
            "Statut": verdict_label,
            "Date": datetime.now().strftime('%d/%m/%Y')
        })
        
        # --- SECTION 2: THE 3 KPI CARDS ---
        y_cards = 75
        card_w, card_h = 60, 60
        gap = 5
        
        # Card 1: Score Global
        # Generate Gauge
        gauge_path_1 = create_gauge_modern(trust_score, 100, (255,255,255), "", "global")
        pdf.draw_kpi_card(10, y_cards, card_w, card_h, "SCORE DE CONFIANCE", "", main_color, icon_path=gauge_path_1)
        
        # Card 2: Meta Score
        meta_score = 100 - data.get("meta_audit", {}).get("risk_score", 0)
        meta_color = COLOR_OK if meta_score > 80 else COLOR_WARN
        gauge_path_2 = create_gauge_modern(meta_score, 100, (255,255,255), "", "meta")
        pdf.draw_kpi_card(10 + card_w + gap, y_cards, card_w, card_h, "INTEGRITE STRUCTURE", "", meta_color, icon_path=gauge_path_2)

        # Card 3: Risk Level (Just Text/Icon)
        # Using Deep Blue as background for contrast like in example
        card_3_color = COLOR_DEEP_BLUE
        # We draw a simple text or triangle
        pdf.draw_kpi_card(10 + (card_w + gap)*2, y_cards, card_w, card_h, "NIVEAU DE RISQUE", risk_label.upper(), card_3_color)
        
        # Remove temps
        try:
             os.remove(gauge_path_1)
             os.remove(gauge_path_2)
        except: pass

        # --- SECTION 3: MILESTONES (The Table) ---
        y_table = 150
        
        # Table Header
        pdf.set_xy(10, y_table)
        pdf.set_fill_color(165, 180, 252) # Indigo Light/Pastel
        pdf.set_font('Arial', 'B', 10)
        pdf.set_text_color(30, 41, 59)
        pdf.cell(90, 8, " Point de Contrôle", 0, 0, 'L', 1)
        pdf.cell(50, 8, " Statut", 0, 0, 'L', 1)
        pdf.cell(50, 8, " Détail", 0, 1, 'L', 1)
        
        # Rows
        checks = [
            ("Analyse Métadonnées", data.get("meta_audit", {}).get("risk_score", 0) < 20, "Logiciels suspects (Photoshop...)"),
            ("Analyse Spectrale", data.get("spectral_audit", {}).get("score", 0) < 20, "Manipulations de pixels"),
            ("Cohérence Sémantique", data.get("semantic_audit", {}).get("score", 100) > 80, "Logique du contenu textuel"),
            ("Détection IA", int(data.get("confidence", 0)*100) > 50, "Probabilité de génération synthétique")
        ]
        
        pdf.set_font('Arial', '', 9)
        fill = False
        for name, passed, comment in checks:
            pdf.set_fill_color(248, 250, 252) if fill else pdf.set_fill_color(255, 255, 255)
            status_text = "CONFORME" if passed else "NON CONFORME"
            pdf.set_text_color(16, 185, 129) if passed else pdf.set_text_color(239, 68, 68)
            
            pdf.cell(90, 8, f" {name}", 0, 0, 'L', fill)
            pdf.cell(50, 8, status_text, 0, 0, 'L', fill)
            
            pdf.set_text_color(100, 116, 139)
            pdf.cell(50, 8, str(comment)[:30], 0, 1, 'L', fill)
            fill = not fill

        # --- SECTION 4: DARK BOXES (Bottom) ---
        y_boxes = 200
        box_w = 92
        box_h = 60
        
        # Box 1: Conclusions
        pdf.set_fill_color(*COLOR_DEEP_BLUE)
        pdf.rect(10, y_boxes, box_w, box_h, 'F')
        pdf.set_xy(15, y_boxes + 5)
        pdf.set_text_color(*COLOR_TEXT_WHITE)
        pdf.set_font('Arial', 'B', 10)
        pdf.cell(0, 5, "CONCLUSIONS DE L'AUDIT", 0, 1)
        pdf.set_font('Arial', '', 8)
        pdf.set_xy(15, y_boxes + 15)
        pdf.multi_cell(box_w-10, 4, data.get("message", "Aucun commentaire particulier.")[:300])
        
        # Box 2: Recommendations (Orange Logic ?)
        # Or Deep Blue as well
        pdf.rect(10 + box_w + 5, y_boxes, box_w, box_h, 'F')
        pdf.set_xy(10 + box_w + 10, y_boxes + 5)
        pdf.set_font('Arial', 'B', 10)
        pdf.cell(0, 5, "RECOMMANDATIONS", 0, 1)
        pdf.set_font('Arial', '', 8)
        pdf.set_xy(10 + box_w + 10, y_boxes + 15)
        
        rec_text = "Accepter le document." if trust_score > 90 else "Demander un original papier ou procéder à une vérification manuelle approfondie."
        pdf.multi_cell(box_w-10, 4, rec_text)

        # Output
        import time
        tstamp = int(time.time())
        output_filename = f"VDS_REPORT_{doc_id}_{tstamp}.pdf"
        output_path = os.path.join(self.output_dir, output_filename)
        pdf.output(output_path)
        
        with open(output_path, "rb") as f:
            pdf_bytes = f.read()
            
        return output_path, pdf_bytes