import os
import json
import subprocess
import sys

def check_frontend():
    print("--- 🎨 Frontend Health Check ---")
    frontend_dir = os.path.join(os.getcwd(), "frontend")
    if not os.path.exists(frontend_dir):
        print("❌ Error: 'frontend' directory not found.")
        return

    # Check package.json
    try:
        with open(os.path.join(frontend_dir, "package.json"), "r", encoding="utf-8") as f:
            data = json.load(f)
            print(f"✅ package.json found. Version: {data.get('version')}")
    except Exception as e:
        print(f"❌ Error reading package.json: {e}")

    # Check for node_modules
    if os.path.exists(os.path.join(frontend_dir, "node_modules")):
        print("✅ node_modules found.")
    else:
        print("❌ node_modules missing. Run 'npm install' in frontend directory.")

def check_translations():
    print("\n--- 🌐 Translation Sync Check ---")
    locales_dir = os.path.join(os.getcwd(), "frontend", "src", "locales")
    if not os.path.exists(locales_dir):
        print("❌ Error: 'locales' directory not found.")
        return

    try:
        with open(os.path.join(locales_dir, "en.json"), "r", encoding="utf-8") as f:
            en = json.load(f)
        with open(os.path.join(locales_dir, "fr.json"), "r", encoding="utf-8") as f:
            fr = json.load(f)

        en_keys = set(flatten_json(en).keys())
        fr_keys = set(flatten_json(fr).keys())

        missing_in_fr = en_keys - fr_keys
        missing_in_en = fr_keys - en_keys

        if not missing_in_fr and not missing_in_en:
            print("✅ All translation keys are synchronized.")
        else:
            if missing_in_fr:
                print(f"⚠️ Missing keys in fr.json: {list(missing_in_fr)[:5]}...")
            if missing_in_en:
                print(f"⚠️ Missing keys in en.json: {list(missing_in_en)[:5]}...")
    except Exception as e:
        print(f"❌ Error during translation check: {e}")

def flatten_json(y):
    out = {}
    def flatten(x, name=''):
        if type(x) is dict:
            for a in x:
                flatten(x[a], name + a + '.')
        else:
            out[name[:-1]] = x
    flatten(y)
    return out

def check_backend():
    print("\n--- 🧠 Backend Health Check ---")
    requirements = os.path.join(os.getcwd(), "requirements.txt")
    if not os.path.exists(requirements):
        print("❌ Error: requirements.txt not found.")
        return

    print("✅ requirements.txt found.")
    # Check if we can import key libraries
    libraries = ["fastapi", "sqlalchemy", "pydantic", "reportlab"]
    for lib in libraries:
        try:
            __import__(lib)
            print(f"✅ {lib} is installed.")
        except ImportError:
            print(f"❌ {lib} is NOT installed.")

if __name__ == "__main__":
    print("🏥 VERIFDOC PROJECT HEALTH CHECK")
    print("================================")
    check_frontend()
    check_translations()
    check_backend()
    print("\n================================")
    print("👉 Next Step: Run 'npm run dev' in frontend/ to start the UI.")
