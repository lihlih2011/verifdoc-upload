from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import markdown
import re

def create_pdf(output_filename):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=A4,
        rightMargin=50, leftMargin=50,
        topMargin=50, bottomMargin=50
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1e40af'),  # Blue 800
        spaceAfter=30,
        alignment=1 # Center
    )
    
    h1_style = ParagraphStyle(
        'CustomH1',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.HexColor('#1e3a8a'), # Blue 900
        spaceBefore=20,
        spaceAfter=10,
        borderPadding=5,
        borderColor=colors.HexColor('#e2e8f0'),
        borderWidth=0,
        borderBottomWidth=1
    )
    
    h2_style = ParagraphStyle(
        'CustomH2',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#3b82f6'), # Blue 500
        spaceBefore=15,
        spaceAfter=10
    )

    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155'), # Slate 700
        spaceAfter=8
    )

    code_style = ParagraphStyle(
        'Code',
        parent=styles['Code'],
        fontSize=8,
        textColor=colors.HexColor('#e11d48'), # Red 600
        backColor=colors.HexColor('#f1f5f9'), # Slate 100
        fontName='Courier',
        borderPadding=4
    )

    story = []

    # Title Page
    story.append(Spacer(1, 60))
    story.append(Paragraph("AUDIT GÉNÉRAL & ARCHITECTURE", title_style))
    story.append(Paragraph("PROJET VERIFDOC", ParagraphStyle('Sub', parent=title_style, fontSize=16, textColor=colors.gray)))
    story.append(Spacer(1, 100))
    story.append(Paragraph("Rapport Technique & Plan de maintenance", ParagraphStyle('Sub2', parent=normal_style, alignment=1, fontSize=12)))
    story.append(Spacer(1, 20))
    story.append(Paragraph("Généré le 06 Janvier 2026", ParagraphStyle('Date', parent=normal_style, alignment=1, textColor=colors.gray)))
    story.append(Spacer(1, 200))
    
    # Content from Markdown (Simplified parsing for demo)
    content = [
        ("1. État de Santé du Projet", "h1"),
        ("Score Global : A-", "h2"),
        ("Le projet est dans un état très avancé (MVP+). La séparation Frontend/Backend est propre et les technologies utilisées sont modernes et performantes.", "p"),
        ("Frontend (Client)", "h2"),
        ("- Techno : React 18 + Vite + TypeScript", "p"),
        ("- Style : Tailwind CSS + Framer Motion", "p"),
        ("- État : Interface moderne, composants réactifs (UploadSimulator), Routing géré.", "p"),
        ("Backend (Serveur)", "h2"),
        ("- Techno : Python 3.10+ + FastAPI", "p"),
        ("- Data : SQLite / PostgreSQL via SQLAlchemy", "p"),
        ("- État : Structure API claire, Sécurité OK (CORS, Rate Limit), Doc Swagger active.", "p"),
        
        ("2. Architecture Technique", "h1"),
        ("Le système repose sur une architecture modulaire classique :", "p"),
        ("- Un Frontend SPA (Single Page App) hébergé sur CDN (Vercel).", "p"),
        ("- Un Backend REST API hébergé sur conteneur (Render).", "p"),
        ("- Une Base de Données relationnelle.", "p"),
        ("- Des modules IA (Vision/ML) intégrés au Backend.", "p"),
        ("(Voir le schéma d'architecture fourni séparément)", "p"),

        ("3. Plan de Déploiement (Mise en Ligne)", "h1"),
        ("Étape A : Backend (Le Cerveau)", "h2"),
        ("1. Hébergeur : Render recommandé.", "p"),
        ("2. Config : Utiliser le Dockerfile présent.", "p"),
        ("3. Commande : uvicorn backend.app.main:app --host 0.0.0.0 --port 10000", "code"),
        ("Étape B : Frontend (Le Visage)", "h2"),
        ("1. Hébergeur : Vercel.", "p"),
        ("2. Build : npm run build.", "code"),
        ("3. Env Var : VITE_API_URL pointant vers le backend.", "p"),

        ("4. Plan de Maintenance (Autonomie)", "h1"),
        ("1. Surveillance : Vérifiez les logs du backend pour les erreurs 500.", "p"),
        ("2. IA : Mettez à jour les modèles dans backend/ml/models/ si nécessaire.", "p"),
        ("3. Backup : Configurez des backups automatiques pour la base de données.", "p"),
        ("4. Nettoyage : Purgez le dossier uploads/ régulièrement (tâches Cron).", "p"),
        
        ("Conclusion", "h1"),
        ("Le projet VerifDoc est solide et prêt pour le déploiement.", "p"),
        ("Le simulateur Frontend est un atout majeur pour la conversion utilisateur.", "p")
    ]

    story.append(Spacer(1, 20))

    for text, style_type in content:
        if style_type == "h1":
            story.append(Paragraph(text, h1_style))
        elif style_type == "h2":
            story.append(Paragraph(text, h2_style))
        elif style_type == "code":
            story.append(Paragraph(text, code_style))
        else:
            story.append(Paragraph(text, normal_style))
        
        story.append(Spacer(1, 6))

    doc.build(story)
    print(f"PDF Generated: {output_filename}")

if __name__ == "__main__":
    create_pdf("c:/Users/chaou/Desktop/VerifDoc Beta/AUDIT_GENERAL_ET_ARCHITECTURE.pdf")
