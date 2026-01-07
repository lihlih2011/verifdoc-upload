import PyInstaller.__main__
import os
import shutil

# 1. CLEANUP
if os.path.exists("dist"): shutil.rmtree("dist")
if os.path.exists("build"): shutil.rmtree("build")

# 2. DEFINE PATHS
base_dir = os.getcwd()
frontend_dist = os.path.join(base_dir, "frontend", "dist")
models_dir = os.path.join(base_dir, "core", "models")
templates_dir = os.path.join(base_dir, "templates")
static_dir = os.path.join(base_dir, "static")

# 3. CONFIGURE PYINSTALLER
# --add-data "SOURCE;DEST" (Windows uses ;)
datas = [
    (f"{templates_dir};templates"),
    (f"{static_dir};static"),
    (f"{frontend_dist};frontend/dist"),
    (f"{models_dir};core/models"),
    # Add hidden imports config file?
]

# 4. RUN BUILD
print("[*] Building VerifDoc.exe ...")
PyInstaller.__main__.run([
    'main.py',
    '--name=VerifDoc_SaaS',
    '--onedir', # Directory based (easier to debug than --onefile)
    '--windowed', # No console window (optional, maybe keep console for debug logs?) -> Let's keep console for now
    '--icon=static/favicon.ico', # Assuming favicon exists
    '--add-data', f'{templates_dir};templates',
    '--add-data', f'{static_dir};static',
    '--add-data', f'{frontend_dist};frontend/dist',
    '--add-data', f'{models_dir};core/models',
    # Hidden imports for FastAPI/Uvicorn
    '--hidden-import=uvicorn.logging',
    '--hidden-import=uvicorn.loops',
    '--hidden-import=uvicorn.loops.auto',
    '--hidden-import=uvicorn.protocols',
    '--hidden-import=uvicorn.protocols.http',
    '--hidden-import=uvicorn.protocols.http.auto',
    '--hidden-import=uvicorn.lifespan',
    '--hidden-import=uvicorn.lifespan.on',
    '--hidden-import=engineio.async_drivers.aiohttp',
    '--hidden-import=sklearn.utils._typedefs', # Common issue with sklearn if used
    '--hidden-import=tensorflow', 
    '--collect-all=tensorflow', # Important to collect all TF dlls
    '--clean',
    '-y'
])

print("[+] Build Complete! Check dist/VerifDoc_SaaS folders.")
