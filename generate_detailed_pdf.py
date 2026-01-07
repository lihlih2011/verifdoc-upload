from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import markdown
import re

def create_pdf(output_filename):
    doc = SimpleDocTemplate(
        output_filename,
        pagesize=A4,
        rightMargin=40, leftMargin=40,
        topMargin=40, bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles (Enhanced)
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Title'],
        fontSize=26,
        textColor=colors.HexColor('#0f172a'),  # Slate 900
        spaceAfter=10,
        alignment=1,
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'Subtitle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#64748b'), # Slate 500
        alignment=1,
        spaceAfter=50
    )

    h1_style = ParagraphStyle(
        'CustomH1',
        parent=styles['Heading1'],
        fontSize=16,
        textColor=colors.HexColor('#1e40af'), # Blue 800
        spaceBefore=20,
        spaceAfter=12,
        borderPadding=6,
        borderColor=colors.HexColor('#e2e8f0'),
        borderWidth=0,
        borderBottomWidth=2
    )
    
    h2_style = ParagraphStyle(
        'CustomH2',
        parent=styles['Heading2'],
        fontSize=13,
        textColor=colors.HexColor('#0f172a'), # Slate 900
        spaceBefore=12,
        spaceAfter=6,
        fontName='Helvetica-Bold'
    )

    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#334155'), # Slate 700
        spaceAfter=8,
        alignment=4 # Justify
    )

    bullet_style = ParagraphStyle(
        'CustomBullet',
        parent=normal_style,
        bulletIndent=10,
        leftIndent=20,
        spaceAfter=4
    )


    
    story = []

    # --- COVER PAGE ---
    story.append(Spacer(1, 100))
    story.append(Paragraph("DOCUMENTATION D'ARCHITECTURE", title_style))
    story.append(Paragraph("PROJET VERIFDOC v2.0", subtitle_style))
    story.append(Spacer(1, 40))
    
    # Optional Logo Placeholder
    # story.append(Image('logo.png', width=100, height=100)) 
    
    story.append(Paragraph("AUDIT TECHNIQUE & CARTOGRAPHIE FONCTIONNELLE", ParagraphStyle('CoverSub', parent=normal_style, alignment=1, fontSize=12)))
    story.append(Spacer(1, 150))
    
    data_table = [
        ['Date de génération', '06 Janvier 2026'],
        ['Version', '2.0.1 (Beta)'],
        ['Auteur', 'Antigravity Agent AI'],
        ['Statut', 'Prêt pour Déploiement']
    ]
    t = Table(data_table, colWidths=[150, 200])
    t.setStyle(TableStyle([
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#334155')),
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
    ]))
    story.append(t)
    
    story.append(PageBreak())

    # --- CONTENT ---
    
    # 1. Executive Summary
    story.append(Paragraph("1. SYNTHÈSE EXÉCUTIVE", h1_style))
    story.append(Paragraph("VerifDoc est une plateforme SaaS de vérification documentaire automatisée par IA, conçue pour détecter les fraudes (retouches d'images, incohérences métadonnées) sur des documents administratifs (fiches de paie, avis d'impôt, RIB, etc.).", normal_style))
    story.append(Paragraph("L'architecture est construite sur un modèle micro-services découplé, garantissant scalabilité et haute disponibilité.", normal_style))
    
    # 2. Cartographie des Micro-Modules (Detailed)
    story.append(Paragraph("2. CARTOGRAPHIE DÉTAILLÉE DES MODULES", h1_style))
    
    story.append(Paragraph("2.1. Cœur API (FastAPI Backend)", h2_style))
    modules_backend = [
        "<b>Auth Module (auth_api.py)</b> : Gestion des tokens JWT, Hashage de mots de passe (Bcrypt), Sessions utilisateurs.",
        "<b>Vision Engine (vision_api.py)</b> : Traitement d'image OpenCV. Pré-traitement, conversion noir & blanc, détection de contours.",
        "<b>ML Router (ml_router.py)</b> : Orchestrateur IA. Charge les modèles YOLOv8 et CasIA à la demande pour l'inférence.",
        "<b>CRM Module (crm_api.py)</b> : Gestion des Leads, Contacts, et Pipelines de vente intégrés.",
        "<b>Billing & Credits (billing_api.py)</b> : Gestion des crédits utilisateurs, webhooks Stripe (simulés), facturation.",
        "<b>Admin Dashboard (admin_api.py)</b> : Métriques globales, logs d'audit, gestion des utilisateurs bannis."
    ]
    for mod in modules_backend:
        story.append(Paragraph(f"• {mod}", bullet_style))

    story.append(Paragraph("2.2. Moteur IA & Forensique", h2_style))
    modules_ia = [
        "<b>Modèle YOLOv8 (Détection d'Objets)</b> : Entraîné pour localiser les signatures, tampons, et zones MRZ.",
        "<b>Modèle CasIA (Deep Learning)</b> : Analyse de bruit (Noise Analysis) et ELA (Error Level Analysis) pour détecter les copier-coller.",
        "<b>Algorithme 2D-Doc (vds_analysis.py)</b> : Décodage et validation cryptographique des codes barres 2D sécurisés français.",
        "<b>OCR Engine (Tesseract/EasyOCR)</b> : Extraction de texte brut pour analyse sémantique (cohérence des dates et montants)."
    ]
    for mod in modules_ia:
        story.append(Paragraph(f"• {mod}", bullet_style))

    story.append(Paragraph("2.3. Base de Données & Modèle de Données", h2_style))
    story.append(Paragraph("Le schéma relationnel (SQLAlchemy) est structuré autour du Multi-Tenant :", normal_style))
    modules_db = [
        "<b>Users & Organizations</b> : Table pivot pour gestion des rôles (Admin/Viewer) par organisation.",
        "<b>Documents & Reports</b> : Stockage des métadonnées d'analyse (Score de fraude, JSON des anomalies).",
        "<b>Audit Logs</b> : Traçabilité immuable de toutes les actions (RGPD/Compliance).",
        "<b>API Keys</b> : Gestion des clés développeurs pour l'accès API externe."
    ]
    for mod in modules_db:
        story.append(Paragraph(f"• {mod}", bullet_style))

    # 3. Flow Architecture
    story.append(Paragraph("3. FLUX DE TRAITEMENT (PIPELINE)", h1_style))
    story.append(Paragraph("Lorsqu'un utilisateur uploade un document, le processus suivant s'enclenche (Latence < 3s) :", normal_style))
    
    pipeline_steps = [
        "1. <b>Upload & Validation</b> : Le fichier est reçu, hashé (SHA-256) pour unicité, et stocké temporairement.",
        "2. <b>Extraction Métadonnées</b> : Analyse des tags EXIF/XMP (Logiciel de retouche ? Date de modif ?).",
        "3. <b>Analyse Visuelle (Pixel Level)</b> : ELA (Error Level Analysis) pour détecter les compressions incohérentes.",
        "4. <b>Inférence IA</b> : YOLO localise les zones clés. CasIA scanne pour la falsification.",
        "5. <b>Cross-Check Sémantique</b> : L'OCR lit les montants. Le système vérifie si 'Net à payer' == 'Brut' - 'Charges'.",
        "6. <b>Génération Rapport</b> : Un JSON consolidé est créé + un PDF de preuve certifié."
    ]
    for step in pipeline_steps:
        story.append(Paragraph(step, bullet_style))

    # 4. Deployment Specs
    story.append(Paragraph("4. SPÉCIFICATIONS DE DÉPLOIEMENT", h1_style))
    
    specs = [
        ["Composant", "Technologie", "Hébergement Cible"],
        ["Frontend", "React 18 / Vite / TS", "Vercel / Netlify (Edge)"],
        ["Backend API", "FastAPI / Python 3.10", "Render / AWS ECS"],
        ["Database", "PostgreSQL 15", "Supabase / AWS RDS"],
        ["Storage", "S3 Compatible", "AWS S3 / MinIO"],
        ["AI Inference", "PyTorch / ONNX", "CPU (Prod Light) / GPU (High Perf)"]
    ]
    
    t_specs = Table(specs, colWidths=[120, 150, 150])
    t_specs.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#eff6ff')),
        ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#1e40af')),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 10),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
    ]))
    story.append(t_specs)

    story.append(Spacer(1, 30))
    story.append(Paragraph("Ce document sert de référence technique pour l'audit de sécurité et la maintenance évolutive.", ParagraphStyle('Footer', parent=normal_style, fontSize=9, textColor=colors.gray, alignment=1)))

    doc.build(story)
    print(f"Detailed PDF Generated: {output_filename}")

if __name__ == "__main__":
    create_pdf("c:/Users/chaou/Desktop/VerifDoc Beta/ARCHITECTURE_DETAILLEE_V2.pdf")
