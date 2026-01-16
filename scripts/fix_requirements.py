import os

req_path = r"c:\Users\chaou\Desktop\VerifDoc Beta\backend\requirements.txt"

# Default requirements if file is unreadable
requirements = [
    "fastapi",
    "uvicorn",
    "sqlalchemy",
    "pydantic",
    "python-multipart",
    "python-jose[cryptography]",
    "passlib[bcrypt]",
    "pillow",
    "python-dotenv",
    "slowapi",
    "numpy",
    "opencv-python-headless",
    "scikit-image",
    "pytesseract",
    "pdf2image",
    "pymupdf",
    "requests",
    "celery[redis]",
    "redis",
    "torch",
    "transformers",
    "matplotlib"
]

try:
    # Try to read existing with generic error handling
    if os.path.exists(req_path):
        try:
            with open(req_path, 'r', encoding='utf-16') as f:
                content = f.read()
        except:
            with open(req_path, 'r', encoding='utf-8') as f:
                content = f.read()
        
        existing_reqs = [line.strip() for line in content.splitlines() if line.strip()]
        # Merge
        for req in requirements:
            if not any(req.split('[')[0] in r for r in existing_reqs): # Simple soft check
                existing_reqs.append(req)
        requirements = existing_reqs

except Exception as e:
    print(f"Could not read existing requirements, using defaults. Error: {e}")

# Write back in UTF-8
with open(req_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(requirements))

print("Requirements updated and fixed to UTF-8.")
