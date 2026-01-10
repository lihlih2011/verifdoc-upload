from fpdf import FPDF
import os
from datetime import datetime
import json
import hashlib
import math
import time
import tempfile
from PIL import Image, ImageDraw, ImageFont

# Helper to generate circular chart image
def create_gauge(value, max_val, color, label, filename_prefix):
    # Config High Res (4x scale for sharpness)
    scale = 4
    W, H = 400 * scale, 350 * scale
    img = Image.new('RGBA', (W, H), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Geometry
    cx, cy = W//2, H//2
    radius = 120 * scale
    stroke = 25 * scale
    
    # Background Ring (Grey)
    draw.arc([(cx-radius, cy-radius), (cx+radius, cy+radius)], start=0, end=360, fill=(230, 230, 230), width=stroke)
    
    # Value Ring (Colored)
    end_angle = -90 + int((value / max_val) * 360)
    draw.arc([(cx-radius, cy-radius), (cx+radius, cy+radius)], start=-90, end=end_angle, fill=color, width=stroke)
    
    # Text (Percentage)
    try:
        font_size = 60 * scale
        label_size = 30 * scale
        font = ImageFont.truetype("arial.ttf", font_size)
        font_label = ImageFont.truetype("arial.ttf", label_size)
    except:
        font = ImageFont.load_default()
        font_label = ImageFont.load_default()

    text = f"{int(value)}%"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    draw.text((cx - text_w/2, cy - text_h/2 - (10*scale)), text, font=font, fill=color)
    
    # Label below
    bbox_l = draw.textbbox((0, 0), label, font=font_label)
    label_w = bbox_l[2] - bbox_l[0]
    draw.text((cx - label_w/2, cy + (40*scale)), label, font=font_label, fill=(100,100,100))
    
    tmp_path = os.path.join(tempfile.gettempdir(), f"gauge_{filename_prefix}_{int(time.time())}.png")
    img.save(tmp_path)
    return tmp_path

class PremiumPDF(FPDF):
    def __init__(self, filename, record_id, user_initials="SYS", logo_path=None):
        super().__init__()
        self.filename = filename
        self.record_id = record_id
        self.user_initials = user_initials
        self.logo_path = logo_path
        self._angle = 0

    def rotate(self, angle, x=-1, y=-1):
        if x == -1:
            x = self.x
        if y == -1:
            y = self.y
        if self._angle != 0:
            self._out('Q')
        self._angle = angle
        if angle != 0:
            angle *= math.pi / 180
            c = math.cos(angle)
            s = math.sin(angle)
            cx = x * self.k
            cy = (self.h - y) * self.k
            self._out(f'q {c:.5f} {s:.5f} {-s:.5f} {c:.5f} {cx:.2f} {cy:.2f} cm 1 0 0 1 {-cx:.2f} {-cy:.2f} cm')

    def _endpage(self):
        if self._angle != 0:
            self._angle = 0
            self._out('Q')
        super()._endpage()

    def header(self):
        # --- HEADER BACKGROUND ---
        self.set_fill_color(15, 23, 42) # Dark Slate
        self.rect(0, 0, 210, 40, 'F')
        
        # --- TITLE (LEFT) ---
        self.set_text_color(255, 255, 255)
        self.set_font('Arial', 'B', 16)
        self.set_xy(10, 15)
        self.cell(0, 10, "RAPPORT D'ANALYSE FORENSIQUE", 0, 0, 'L')
        
        self.set_font('Arial', '', 8)
        self.set_xy(10, 22)
        self.cell(0, 5, "NON-FALSIFIABLE | GENERATION IA", 0, 0, 'L')

        # --- LOGO IMAGE (TOP RIGHT) ---
        # Place logo at Top Right, height constrained to fit blue bar (approx 25mm)
        # We assume logo is loaded.
        if self.logo_path and os.path.exists(self.logo_path):
            try:
                # x=160, y=5, h=30 (let width auto-scale)
                # Note: FPDF places top-left of image at x,y.
                self.image(self.logo_path, x=160, y=5, h=30)
            except:
                pass # Fail silently

        # Ref Info (Moved below title or center?)
        # Let's put it below the blue bar, right aligned
        self.set_y(42)
        self.set_font('Courier', 'B', 9)
        self.set_text_color(148, 163, 184)
        self.cell(0, 5, f"REF: {self.record_id} | {datetime.now().strftime('%Y-%m-%d %H:%M')}", 0, 0, 'R')

        self.ln(10) # Spacing after blue header

        # --- WATERMARK (CENTER - Faded) ---
        # Keeping the big watermark but ensuring it's not overriding everything?
        # User complained about "crushed" logo. Maybe the watermark was the issue.
        # I will reduce watermark opacity/size or remove it if it was the problem.
        # Let's keep it but ensure ratio.
        if self.logo_path and os.path.exists(self.logo_path):
             try:
                 self.image(self.logo_path, x=60, y=120, w=90) 
             except: pass

        # Overlay Diagonal Text (Subtle Watermark)
        self.set_font('Arial', 'B', 50)
        self.set_text_color(252, 252, 252)
        self.rotate(45, 105, 148)
        self.text(40, 190, "VERIFDOC CERTIFIED")
        self.rotate(0)

    def footer(self):
        self.set_y(-25)
        
        # Specific Legal Disclaimer from User
        self.set_font('Arial', '', 5) # Petit caractère
        self.set_text_color(100, 100, 100) # Gris discret
        
        disclaimer = (
            "VerifDoc fournit un service d'analyse technique base sur l'intelligence artificielle et des algorithmes forensiques. "
            "Les resultats sont fournis a titre d'aide a la prise de decision pour assister l'utilisateur dans son evaluation des risques. "
            "En aucun cas le rapport VerifDoc ne saurait constituer une preuve juridique absolue ou se substituer a l'avis d'un expert judiciaire assermente. "
            "L'utilisateur final reste seul responsable des decisions prises suite a la consultation de ces rapports."
        )
        self.multi_cell(0, 3, disclaimer, 0, 'C')
        
        self.ln(1)
        # Page info
        self.set_font('Arial', 'I', 7)
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}} | VerifDoc.io', 0, 0, 'C')

    def chapter_title(self, label, data):
        self.set_font('Arial', 'B', 12)
        self.set_fill_color(240, 240, 245) # Very Light Grey to reduce overload
        self.set_text_color(50, 50, 50)
        self.cell(0, 10, f" {label} : {data}", 0, 1, 'L', 1)
        self.ln(4)

    def stylish_table_row(self, label, value, detail, is_odd):
        fill = (250, 250, 252) if is_odd else (255, 255, 255)
        self.set_fill_color(*fill)
        self.set_font('Arial', 'B', 9)
        self.set_text_color(70, 80, 100)
        self.cell(50, 8, f" {label}", 0, 0, 'L', 1)
        
        val_str = str(value).upper()
        if "SUSPECT" in val_str or "ALTERE" in val_str:
            self.set_text_color(220, 40, 40)
        elif "INTEGRE" in val_str or "OK" in val_str or "CONFORME" in val_str:
            self.set_text_color(30, 160, 80)
        else:
            self.set_text_color(50, 50, 50)

        self.set_font('Arial', 'B', 9)
        self.cell(40, 8, val_str, 0, 0, 'L', 1)
        
        self.set_text_color(100, 100, 100)
        self.set_font('Arial', '', 8)
        det = (str(detail)[:65] + '...') if len(str(detail)) > 65 else str(detail)
        self.cell(0, 8, det, 0, 1, 'L', 1)

    def rounded_rect(self, x, y, w, h, r, style='D'):
        # Helper for rounded rectangles to make it look modern
        k = self.k
        hp = self.h
        self._out(f'{x*k:.2f} {(hp-y)*k:.2f} m')
        self._out(f'{(x+w)*k:.2f} {(hp-y)*k:.2f} l')
        self._out(f'{(x+w)*k:.2f} {(hp-(y+h))*k:.2f} l')
        self._out(f'{x*k:.2f} {(hp-(y+h))*k:.2f} l')
        self._out('h')
        if style:
            self._out(style)

    def draw_card(self, x, y, w, h, title=None, bg_color=(255, 255, 255)):
        self.set_fill_color(*bg_color)
        self.set_draw_color(220, 220, 230) # Light border
        self.set_line_width(0.5)
        self.rect(x, y, w, h, 'FD')
        
        if title:
            self.set_xy(x, y)
            self.set_font('Arial', 'B', 10)
            self.set_text_color(100, 110, 130) # Slate Grey
            self.set_fill_color(245, 247, 250) # Header bg
            self.cell(w, 8, f"  {title.upper()}", 1, 0, 'L', 1)

class ReportGenerator:
    def __init__(self, output_dir="data/reports"):
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)
        base_path = os.path.dirname(os.path.abspath(__file__))
        self.logo_path = os.path.join(base_path, "..", "..", "static", "img", "logo.png")

    def generate_report(self, data: dict, heatmaps: dict = None):
        doc_id = data.get("document_id", "UNKNOWN")
        filename = data.get("filename", f"Doc_{doc_id}")
        file_path = data.get("file_path", None)

        pdf = PremiumPDF(filename, doc_id, logo_path=self.logo_path)
        pdf.alias_nb_pages()
        pdf.add_page()
        
        # --- DATA PREP ---
        fraud_risk = data.get("confidence", 0.0)
        trust_score = int(1000 - (fraud_risk * 1000))
        meta_score = 100 - data.get("meta_audit", {}).get("risk_score", 0)
        ai_prob = int(fraud_risk * 100)
        
        # Colors & Tiers
        # Colors & Tiers (Professional Naming)
        if trust_score >= 900:
            tier, color_rgb = "NIVEAU A - EXCELLENT", (22, 163, 74)
            desc_text = "Authenticité Confirmée"
        elif trust_score >= 750:
            tier, color_rgb = "NIVEAU B - SATISFAISANT", (37, 99, 235)
            desc_text = "Conforme aux Standards"
        elif trust_score >= 500:
            tier, color_rgb = "NIVEAU C - A VERIFIER", (234, 179, 8)
            desc_text = "Anomalies Mineures"
        else:
            tier, color_rgb = "NIVEAU D - RISQUE CRITIQUE", (220, 38, 38)
            desc_text = "Preuves de Falsification"

        # --- LAYOUT GRID ---
        
        # 1. LEFT COLUMN : VERDICT (Big Card)
        # x=10, y=50, w=80, h=100
        pdf.draw_card(10, 50, 90, 80, "VERDICT FORENSIQUE")
        
        # Big Donut Gauge (Trust Score)
        p_main = create_gauge(int(trust_score/10), 100, color_rgb, "", "main")
        pdf.image(p_main, x=25, y=60, w=60)
        
        pdf.set_xy(10, 115)
        pdf.set_font('Arial', 'B', 14)
        pdf.set_text_color(*color_rgb)
        pdf.cell(90, 6, tier, 0, 1, 'C')
        pdf.set_font('Arial', '', 10)
        pdf.set_text_color(100, 100, 100)
        pdf.cell(90, 5, desc_text, 0, 1, 'C')
        
        # 2. RIGHT COLUMN : INFOS & METRICS
        # Document Info
        pdf.draw_card(110, 50, 90, 35, "FICHIER ANALYSE")
        pdf.set_xy(112, 60)
        pdf.set_font('Arial', '', 8)
        pdf.set_text_color(50, 50, 50)
        pdf.cell(80, 5, f"Nom: {filename[:30]}", 0, 1)
        pdf.set_xy(112, 65)
        pdf.cell(80, 5, f"Type: PDF / Image", 0, 1)
        pdf.set_xy(112, 70)
        pdf.set_font('Courier', '', 7)
        pdf.cell(80, 5, f"Hash: {data.get('file_hash', 'N/A')[:25]}...", 0, 1)
        
        # Technical Metrics (Small Cards Row)
        pdf.draw_card(110, 90, 90, 40, "METRIQUES IA")
        
        # Small Gauge 1: Meta
        g_meta_col = (37, 99, 235)
        p_meta = create_gauge(meta_score, 100, g_meta_col, "Meta", "meta")
        pdf.image(p_meta, x=115, y=100, w=25)
        
        # Small Gauge 2: AI
        g_ai_col = (147, 51, 234)
        p_ai = create_gauge(ai_prob, 100, g_ai_col, "IA Gen", "ai")
        pdf.image(p_ai, x=165, y=100, w=25)

        # 3. BOTTOM : DETAILS TABLE
        y_details = 140
        pdf.draw_card(10, y_details, 190, 90, "DETAILS DE L'INSPECTION")
        
        pdf.set_xy(12, y_details + 10)
        checks = [
            ("Logiciels & Méta.", data.get("meta_audit", {}).get("risk_score", 0), "Analyse des traces d'édition"),
            ("Spectrométrie", data.get("spectral_audit", {}).get("score", 0), "Détection manipulations pixel"),
            ("Sémantique", data.get("semantic_audit", {}).get("score", 0), "Cohérence visuelle et textuelle"),
            ("Modèle IA", int(fraud_risk * 100), "Détection de synthèse générative"),
        ]
        
        for i, (name, score, desc) in enumerate(checks):
             pdf.set_x(12)
             pdf.stylish_table_row(name, f"{score}/100", desc, i % 2 != 0)

        # 4. QR CODE (Bottom Right Overlay)
        import qrcode
        qr_url = f"https://verifdoc.io/verify/{doc_id}"
        qr = qrcode.QRCode(box_size=10, border=1)
        qr.add_data(qr_url)
        qr.make(fit=True)
        img_qr = qr.make_image(fill_color="black", back_color="white")
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp_qr:
            img_qr.save(tmp_qr.name)
            tqp = tmp_qr.name
            
        pdf.set_xy(175, 235)
        pdf.image(tqp, 175, 235, 20, 20)
        
        # Cleanup
        for p in [p_main, p_meta, p_ai, tqp]:
            try: os.remove(p)
            except: pass

        # PAGE 2
        if file_path and os.path.exists(file_path):
            pdf.add_page()
            pdf.chapter_title("Preuve Visuelle", "Document Original")
            try: pdf.image(file_path, x=10, y=30, w=190)
            except: pass

        # Output
        safe_filename = "".join([c for c in filename if c.isalpha() or c.isdigit() or c=='_']).rstrip()
        import time
        tstamp = int(time.time())
        output_filename = f"VDS_REPORT_{doc_id}_{tstamp}.pdf"
        output_path = os.path.join(self.output_dir, output_filename)
        pdf.output(output_path)
        
        # Read bytes for hash computation
        with open(output_path, "rb") as f:
            pdf_bytes = f.read()
            
        return output_path, pdf_bytes