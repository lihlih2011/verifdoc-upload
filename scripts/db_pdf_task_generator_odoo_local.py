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
    # Task: Odoo Local Integration Strategy
    task_content = """
    ## 1. Contexte : Odoo Local (Même Réseau)
    Vous avez Odoo installé sur votre machine locale (localhost:8069).
    Le problème : Votre serveur VerifDoc (sur OVH) ne peut pas contacter votre "localhost" directement.

    ## 2. La Solution : Le "Tunnel" (Reverse Proxy)
    Pour que le Cloud parle à votre Local, il faut ouvrir une porte sécurisée.
    *   **Option A : Ngrok (Le plus rapide)**
        Outil qui expose votre port 8069 sur internet temporairement.
        Command : `ngrok http 8069` -> Donne une URL `https://xyz.ngrok.io`.
    *   **Option B : VPN / Wireguard (Le plus pro)**
        Connecter le serveur OVH et votre PC Windows au même VPN.
    *   **Option C : Installer Odoo sur le VPS (Recommandé)**
        Puisque vous avez un VPS puissant (15 Go RAM), installez Odoo DESSUS (via Docker).
        C'est beaucoup plus simple : VerifDoc et Odoo seront voisins sur la même puce.

    ## 3. Plan d'Action (Si on reste en Local)
    * [ ] Installer 'ngrok' sur votre PC Windows.
    * [ ] Lancer `ngrok http 8069`.
    * [ ] Configurer l'URL ngrok dans le Dashboard VerifDoc comme "Webhook URL".

    ## 4. Recommandation Antigravity
    Migrez Odoo sur le serveur OVH Public Cloud. C'est plus stable que de dépendre de votre PC allumé.
    """

    generate_task_pdf("TACHE_INTEGRATION_ODOO_LOCAL.pdf", "STRATEGIE ODOO LOCAL vs CLOUD", task_content)
