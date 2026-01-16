import os

def optimize_seo():
    index_path = 'frontend/index.html'
    if not os.path.exists(index_path):
        print(f"File {index_path} not found.")
        return

    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define SEO Meta Tags
    meta_tags = """
    <title>VerifDoc | Détection de Fraude Documentaire par IA</title>
    <meta name="description" content="VerifDoc utilise l'intelligence artificielle pour détecter les faux documents (bulletins de paie, avis d'impôts, pièces d'identité) en quelques secondes. Sécurisez vos recrutements et dossiers locataires.">
    <meta name="keywords" content="fraude documentaire, détection faux documents, intelligence artificielle, kyc, vérification bulletin de paie, avis d'imposition, securité, immobilier, rh">
    <meta property="og:title" content="VerifDoc | L'IA contre la fraude documentaire">
    <meta property="og:description" content="Protégez votre entreprise contre les faux documents avec notre analyse forensique par IA.">
    <meta property="og:image" content="/images/og-image.jpg">
    <meta name="twitter:card" content="summary_large_image">
    """

    # Simple injection before </head>
    if '</head>' in content:
        new_content = content.replace('</head>', f'{meta_tags}\n</head>')
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("SEO Meta Tags injected successfully.")
    else:
        print("Could not find </head> tag.")

if __name__ == "__main__":
    optimize_seo()
