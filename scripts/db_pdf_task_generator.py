from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem

def generate_task_pdf(filename, title, content):
    doc = SimpleDocTemplate(filename, pagesize=A4, rightMargin=2*cm, leftMargin=2*cm, topMargin=2*cm, bottomMargin=2*cm)
    styles = getSampleStyleSheet()
    story = []

    # Title
    story.append(Paragraph(title, styles['Title']))
    story.append(Spacer(1, 1*cm))

    # Content Processing (Basic Markdown-like parsing for the PDF)
    # This is a simplified generator for the user's request context
    for line in content.split('\n'):
        if line.startswith('## '):
            story.append(Paragraph(line[3:], styles['Heading2']))
            story.append(Spacer(1, 0.5*cm))
        elif line.startswith('* '):
            story.append(Paragraph(f"• {line[2:]}", styles['BodyText']))
        elif line.strip() == "":
            story.append(Spacer(1, 0.2*cm))
        else:
            story.append(Paragraph(line, styles['BodyText']))

    doc.build(story)
    print(f"[OK] PDF Generated: {filename}")

if __name__ == "__main__":
    # Example content based on the previous task request (Dataset Strategy)
    task_content = """
    ## 1. Objectif
    Créer un dataset robuste pour entraîner l'IA VerifDoc.

    ## 2. Actions Prioritaires
    * Collecter Fiches de Paie, Avis d'Imposition, Justificatifs de Domicile.
    * Anonymiser les données personnelles (RGPD).
    * Scanner 10 documents "propres" (Scanner plat).
    * Photographier 10 documents "sales" (Smartphone, angle, ombre).

    ## 3. Structure
    * Organiser par Pays (FR) puis par Type (Payslip, Tax).
    * Séparer les fichiers 'Natifs Numériques' des 'Scans'.

    ## 4. Prochaine étape
    * Lancer le script d'anonymisation sur le dossier DATASET.
    """
    
    generate_task_pdf("TACHE_DATASET_STRATEGIE.pdf", "STRATEGIE DATASET VERIFDOC", task_content)
