# -*- coding: utf-8 -*-
"""
CONCEPT : GÉNÉRATEUR AUTOMATIQUE DE FICHES DE PAIE
Rôle : Automatiser la création de documents pour le dossier 01 (Vrais) et 02 (Faux).
Auteur : Assistant Chef de Projet IA
"""

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os

def creer_fiche_de_paie(nom_fichier, donnees, output_dir="."):
    """
    Cette fonction dessine une fiche de paie au format PDF.
    Elle prend un nom de fichier et un dictionnaire de données (nom, salaire, etc.)
    """
    full_path = os.path.join(output_dir, nom_fichier)
    
    # 1. Création du canevas (la feuille blanche A4)
    c = canvas.Canvas(full_path, pagesize=A4)
    width, height = A4

    # --- ENTÊTE ENTREPRISE ---
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, height - 50, donnees['entreprise_nom'])
    
    c.setFont("Helvetica", 10)
    c.drawString(50, height - 65, donnees['entreprise_adresse'])
    c.drawString(50, height - 80, "SIRET : " + donnees['siret'])

    # --- INFORMATIONS SALARIÉ ---
    # On dessine un cadre pour le salarié (Anonymisé ou non)
    c.rect(300, height - 120, 250, 80, stroke=1, fill=0)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(310, height - 60, donnees['salarie_nom'])
    c.setFont("Helvetica", 10)
    c.drawString(310, height - 75, donnees['salarie_adresse'])

    # --- PÉRIODE ---
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(width / 2, height - 150, f"BULLETIN DE PAIE - {donnees['periode']}")

    # --- TABLEAU DES VALEURS ---
    # On définit les positions
    y_table = height - 200
    
    # Lignes du tableau
    c.line(50, y_table, 550, y_table) # Ligne du haut
    c.setFont("Helvetica-Bold", 10)
    c.drawString(60, y_table - 20, "DÉSIGNATION")
    c.drawString(350, y_table - 20, "BASE")
    c.drawString(480, y_table - 20, "MONTANT")
    c.line(50, y_table - 30, 550, y_table - 30) # Ligne sous titres

    # --- DONNÉES CHIFFRÉES ---
    c.setFont("Helvetica", 10)
    y_row = y_table - 50
    
    # Salaire de base
    c.drawString(60, y_row, "Salaire de base")
    c.drawRightString(400, y_row, f"{donnees['heures']} h")
    c.drawRightString(540, y_row, f"{donnees['salaire_brut']:.2f} €")
    
    # Cotisations (Simplifié pour l'exemple)
    y_row -= 25
    c.drawString(60, y_row, "Cotisations Sociales (Total)")
    c.drawRightString(540, y_row, f"-{donnees['cotisations']:.2f} €")

    # --- TOTAL NET ---
    y_row -= 50
    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(colors.black)
    c.rect(350, y_row - 10, 200, 30, stroke=1, fill=0)
    c.drawString(360, y_row, "NET À PAYER")
    
    # C'est ici que la fraude peut être introduite
    c.drawRightString(540, y_row, f"{donnees['salaire_net']:.2f} €")

    # --- BAS DE PAGE ---
    c.setFont("Helvetica-Oblique", 8)
    c.drawCentredString(width / 2, 50, "Ce document est un spécimen généré pour l'entraînement d'une IA.")

    # On finalise le PDF
    c.save()
    print(f"Fichier généré : {full_path}")

# --- EXEMPLE D'UTILISATION (PRODUCTION) ---
if __name__ == "__main__":
    # Ensure directory
    OUTPUT = "DATASET_REAL/GENERATED"
    if not os.path.exists(OUTPUT):
        os.makedirs(OUTPUT)

    # Exemple 1 : Une fiche de paie VRAIE (Coordonnées anonymisées par des XXX)
    data_vrai = {
        'entreprise_nom': "TECH SOLUTIONS SAS",
        'entreprise_adresse': "12 Rue de l'IA, 75001 Paris",
        'siret': "123 456 789 00012",
        'salarie_nom': "XXXXXXXX XXXXXX", # Nom anonymisé pour le dossier 01
        'salarie_adresse': "XX Avenue du Code, 93000",
        'periode': "DÉCEMBRE 2025",
        'heures': 151.67,
        'salaire_brut': 2500.00,
        'cotisations': 550.00,
        'salaire_net': 1950.00 # Calcul juste : 2500 - 550 = 1950
    }

    # Exemple 2 : Une fiche de paie FAUSSE (Erreur de calcul volontaire)
    data_faux = {
        'entreprise_nom': "TECH SOLUTIONS SAS",
        'entreprise_adresse': "12 Rue de l'IA, 75001 Paris",
        'siret': "123 456 789 00012",
        'salarie_nom': "XXXXXXXX XXXXXX",
        'salarie_adresse': "XX Avenue du Code, 93000",
        'periode': "DÉCEMBRE 2025",
        'heures': 151.67,
        'salaire_brut': 2500.00,
        'cotisations': 550.00,
        'salaire_net': 2950.00 # FRAUDE : Le net est supérieur au brut !
    }

    creer_fiche_de_paie("vrai_exemple.pdf", data_vrai, OUTPUT)
    creer_fiche_de_paie("faux_exemple.pdf", data_faux, OUTPUT)
