# backend/app/utils/email_service.py
import logging

logger = logging.getLogger(__name__)

class EmailService:
    @staticmethod
    def send_verification_email(to_email: str, verify_token: str):
        """
        Envoie un email de vérification de compte.
        """
        subject = "VerifDoc - Confirmation de votre compte professionnel"
        link = f"https://verifdoc.io/verify-email?token={verify_token}"
        
        body = f"""
        OBJET: {subject}
        ------------------------------------------------------------
        Bonjour,

        Bienvenue chez VerifDoc, la référence en analyse documentaire forensique par IA.

        Nous sommes ravis de vous compter parmi nos utilisateurs. Pour garantir la sécurité de votre espace et activer l'ensemble de vos fonctionnalités, veuillez confirmer votre adresse email professionnelle en cliquant sur le lien ci-dessous :

        👉 {link}

        Ce lien est valable pour une durée de 24 heures.

        Si vous n'avez pas créé de compte VerifDoc, vous pouvez ignorer cet email en toute sécurité.

        Cordialement,
        L'équipe Sécurité VerifDoc
        ------------------------------------------------------------
        """
        
        # SIMULATION ENVOI
        print(f"\n📨 [MOCK EMAIL] To: {to_email}\n{body}\n")
        logger.info(f"Verification email sent to {to_email}")
        return True

    @staticmethod
    def send_password_reset_email(to_email: str, reset_token: str):
        """
        Envoie un email de réinitialisation de mot de passe (Traduit de l'anglais).
        """
        subject = "Action requise : Réinitialisation de votre mot de passe VerifDoc"
        link = f"https://verifdoc.io/reset-password?token={reset_token}"
        
        body = f"""
        OBJET: {subject}
        ------------------------------------------------------------
        Bonjour CEO ! 👋

        Nous avons reçu une demande pour réinitialiser le mot de passe de votre compte.
        Si c'est bien vous, vous pouvez changer votre mot de passe facilement en cliquant sur le lien ci-dessous :

        👉 {link}

        ⚠️ Avis de sécurité
        Si vous n'êtes pas à l'origine de cette demande, pas d'inquiétude ! Ignorez simplement cet email, et votre mot de passe restera inchangé. Rappelez-vous, votre mot de passe ne sera modifié que si vous suivez le lien ci-dessus et en créez un nouveau.

        À bientôt,
        L'équipe VerifDoc
        ------------------------------------------------------------
        """
        
        # SIMULATION ENVOI
        print(f"\n📨 [MOCK EMAIL] To: {to_email}\n{body}\n")
        logger.info(f"Password reset email sent to {to_email}")
        return True

email_service = EmailService()
