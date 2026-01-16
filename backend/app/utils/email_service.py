import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)

SMTP_HOST = os.getenv("SMTP_HOST", "ssl0.ovh.net")
SMTP_PORT = int(os.getenv("SMTP_PORT", "465"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM_EMAIL = os.getenv("SMTP_FROM_EMAIL", SMTP_USER)

class EmailService:
    
    def _send_email(self, to_email: str, subject: str, body_text: str, body_html: str = None):
        """
        Envoie un email via SMTP si configuré, sinon affiche dans la console.
        """
        if not SMTP_USER or not SMTP_PASSWORD:
            logger.warning("⚠️ SMTP non configuré. Mode SIMULATION activé.")
            print(f"\n📨 [SIMULATION EMAIL] To: {to_email} | Subject: {subject}\n{body_text}\n")
            return True

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = SMTP_FROM_EMAIL
            msg["To"] = to_email

            part1 = MIMEText(body_text, "plain")
            msg.attach(part1)
            
            if body_html:
                part2 = MIMEText(body_html, "html")
                msg.attach(part2)

            # Connexion SMTP SSL (OVH standard)
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
                server.login(SMTP_USER, SMTP_PASSWORD)
                server.sendmail(SMTP_FROM_EMAIL, to_email, msg.as_string())
            
            logger.info(f"✅ Email envoyé avec succès à {to_email}")
            return True

        except Exception as e:
            logger.error(f"❌ Erreur envoi email SMTP: {e}")
            print(f"FAILED EMAIL TO {to_email}: {e}")
            return False

    def send_verification_email(self, to_email: str, verify_token: str):
        subject = "VerifDoc - Confirmation de votre compte professionnel"
        link = f"https://verifdoc.io/verify-email?token={verify_token}"
        
        body_text = f"""
        Bienvenue chez VerifDoc.
        
        Veuillez confirmer votre email en cliquant ici : {link}
        
        L'équipe VerifDoc.
        """
        
        body_html = f"""
        <html>
            <body>
                <h2 style="color:#2563EB;">Bienvenue chez VerifDoc</h2>
                <p>Merci de rejoindre la référence en analyse documentaire.</p>
                <p>Pour activer votre compte, cliquez sur le bouton ci-dessous :</p>
                <a href="{link}" style="background-color:#2563EB; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">Confirmer mon email</a>
                <p style="margin-top:20px; font-size:12px; color:#666;">Si vous n'êtes pas à l'origine de cette inscription, ignorez cet email.</p>
            </body>
        </html>
        """
        return self._send_email(to_email, subject, body_text, body_html)

    def send_welcome_sales_email(self, to_email: str, name: str = "Client"):
        subject = "VerifDoc - Sécurisez vos dossiers dès aujourd’hui (Diagnostic Offert)"
        
        body_text = f"Bonjour {name},\n\nMerci d'avoir rejoint VerifDoc. On vous offre un diagnostic personnalisé cette semaine.\nRépondez à cet email pour fixer un créneau."
        
        body_html = f"""
        <html>
            <body style="font-family: sans-serif; color: #333;">
                <h2 style="color:#2563EB;">Bonjour {name} 👋</h2>
                <p>Bienvenue chez <strong>VerifDoc</strong>, l’IA qui blinde vos décisions.</p>
                <p>Vous venez de faire un premier pas pour protéger votre activité contre la fraude documentaire.</p>
                <div style="background-color: #F3F4F6; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h3 style="margin-top: 0;">🎁 Offre de Lancement</h3>
                    <p>Cette semaine, nous offrons une **session de diagnostic de 15 min** pour auditer vos processus de vérification (RH, Immo, Finance).</p>
                    <a href="https://calendly.com/verifdoc/demo" style="background-color:#2563EB; color:white; padding:12px 24px; text-decoration:none; border-radius:5px; font-weight:bold; display: inline-block;">Réserver mon diagnostic offert</a>
                </div>
                <p>À très bientôt,</p>
                <p><strong>L'équipe VerifDoc</strong></p>
            </body>
        </html>
        """
        return self._send_email(to_email, subject, body_text, body_html)

    def notify_admin_new_lead(self, lead_email: str):
        subject = "🚀 NOUVEAU LEAD VERIFDOC"
        body_text = f"Un nouvel utilisateur s'est inscrit : {lead_email}. Appelle-le pour les 10 clients !"
        return self._send_email(SMTP_FROM_EMAIL, subject, body_text)

    def send_password_reset_email(self, to_email: str, reset_token: str):
        subject = "Réinitialisation de votre mot de passe VerifDoc"
        link = f"https://verifdoc.io/reset-password?token={reset_token}"
        
        body_text = f"""
        Bonjour,
        
        Une demande de réinitialisation de mot de passe a été effectuée pour votre compte.
        Cliquez ici pour changer votre mot de passe : {link}
        
        Si ce n'est pas vous, ignorez cet email.
        """
        
        body_html = f"""
        <html>
            <body>
                <h3>Bonjour 👋</h3>
                <p>Nous avons reçu une demande de réinitialisation de mot de passe.</p>
                <p>Cliquez ci-dessous pour le changer :</p>
                <a href="{link}" style="background-color:#EF4444; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">Réinitialiser mon mot de passe</a>
                <br><br>
                <p><strong>⚠️ Avis de sécurité :</strong> Si vous n'avez rien demandé, ignorez simplement cet email. Votre compte reste sécurisé.</p>
            </body>
        </html>
        """
        return self._send_email(to_email, subject, body_text, body_html)

email_service = EmailService()
