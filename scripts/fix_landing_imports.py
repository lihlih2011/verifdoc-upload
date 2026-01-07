import os

# Define the directory containing the landing page components
landing_dir = r"C:\Users\chaou\Desktop\VerifDoc Beta\frontend\src\components\landing"

# Replacements map
replacements = {
    '@/components/': './',
    '@/public/': '/',
    'from "next/image"': 'from "../ui/Image"',
    "from 'next/image'": "from '../ui/Image'",
    'from "next/link"': 'from "react-router-dom"',
    "from 'next/link'": "from 'react-router-dom'",
    'import Link from "next/link"': 'import { Link } from "react-router-dom"',
    "import Link from 'next/link'": "import { Link } from 'react-router-dom'"
}

def fix_imports():
    if not os.path.exists(landing_dir):
        print(f"Directory not found: {landing_dir}")
        return

    for filename in os.listdir(landing_dir):
        if filename.endswith(".tsx") or filename.endswith(".ts"):
            filepath = os.path.join(landing_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
            
            # Special case for Link component usage if needed, but usually generic replacement works for simple cases
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed: {filename}")
            else:
                print(f"No changes: {filename}")

if __name__ == "__main__":
    fix_imports()
