
# -------------------------------------------------------------
# VERIFDOC PRO TRAINING - STABLE EDITION (Google Drive)
# -------------------------------------------------------------
# 1. Connect Google Drive (Auto-Popup).
# 2. The script will look for 'verifdoc_multiclass_pack.zip' in your Drive root.
# 3. Model will be saved directly to Drive (No loss if crash).
# -------------------------------------------------------------

import os
import zipfile
import shutil
from google.colab import drive
import tensorflow as tf
from tensorflow.keras import layers, models, applications
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# --- 1. CONNECT DRIVE & SETUP ---
print("[*] Mounting Google Drive...")
drive.mount('/content/drive')

# PATHS
DRIVE_ROOT = "/content/drive/MyDrive"
ZIP_NAME = "verifdoc_multiclass_pack.zip"
ZIP_PATH_IN_DRIVE = os.path.join(DRIVE_ROOT, ZIP_NAME)
LOCAL_DATA_DIR = "/content/verifdoc_data"
TRAIN_DIR = "/content/train_dataset"

# CHECK ZIP (SMART SEARCH)
if not os.path.exists(ZIP_PATH_IN_DRIVE):
    print(f"⚠️ Fichier exact non trouvé. Recherche intelligente dans votre Drive...")
    from glob import glob
    candidates = glob(os.path.join(DRIVE_ROOT, "*verifdoc*.zip"))
    
    if candidates:
        ZIP_PATH_IN_DRIVE = candidates[0] # Pick the first match
        print(f"✅ TROUVÉ ! Utilisation de : {os.path.basename(ZIP_PATH_IN_DRIVE)}")
    else:
        print(f"❌ ERREUR FATALE: Aucun fichier ZIP ressemblant à 'verifdoc...' trouvé à la racine.")
        print(f"📂 Contenu trouvé à la racine de votre Drive :")
        print(os.listdir(DRIVE_ROOT)[:10]) # Show first 10 files to help debug
        raise FileNotFoundError("Zip missing in Drive")

# UNZIP (Fresh Start)
if os.path.exists(LOCAL_DATA_DIR): shutil.rmtree(LOCAL_DATA_DIR)
if os.path.exists(TRAIN_DIR): shutil.rmtree(TRAIN_DIR)
os.makedirs(LOCAL_DATA_DIR)

print(f"[*] Copying & Unzipping from Drive (Stability Mode)...")
# Copy locally first to avoid Drive Timeout during unzip
shutil.copy(ZIP_PATH_IN_DRIVE, "/content/temp_pack.zip")
with zipfile.ZipFile("/content/temp_pack.zip", 'r') as zip_ref:
    zip_ref.extractall(LOCAL_DATA_DIR)

# --- 2. PREPARE DATASET ---
os.makedirs(os.path.join(TRAIN_DIR, "AUTHENTIC"), exist_ok=True)
os.makedirs(os.path.join(TRAIN_DIR, "FAKE"), exist_ok=True)

print("[*] Organizing Data...")
count_auth = 0
count_fake = 0

for root, dirs, files in os.walk(LOCAL_DATA_DIR):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg', '.png')):
            src = os.path.join(root, file)
            # LOGIC: Check folder name
            if "AUTHENTIC" in root:
                shutil.copy(src, os.path.join(TRAIN_DIR, "AUTHENTIC", f"{count_auth}.jpg"))
                count_auth += 1
            elif "FAKE" in root or "TAMPERED" in root or "copymove" in file:
                shutil.copy(src, os.path.join(TRAIN_DIR, "FAKE", f"{count_fake}.jpg"))
                count_fake += 1

print(f"✅ Data Ready: {count_auth} Real / {count_fake} Fake")
if count_auth == 0 or count_fake == 0:
    raise ValueError("❌ Dataset Empty! Check your Zip content.")

# --- 3. TRAINING (LIGHT MODE) ---
BATCH_SIZE = 16 # Low batch size to prevent RAM Crash
IMG_SIZE = (224, 224)

datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.1,
    zoom_range=0.1,
    horizontal_flip=True,
    brightness_range=[0.8, 1.2],
    fill_mode='nearest',
    validation_split=0.2
)

train_gen = datagen.flow_from_directory(
    TRAIN_DIR, target_size=IMG_SIZE, batch_size=BATCH_SIZE, class_mode='binary', subset='training'
)
val_gen = datagen.flow_from_directory(
    TRAIN_DIR, target_size=IMG_SIZE, batch_size=BATCH_SIZE, class_mode='binary', subset='validation'
)

# MODEL
base = applications.MobileNetV2(input_shape=IMG_SIZE+(3,), include_top=False, weights='imagenet')
base.trainable = False
model = models.Sequential([
    base,
    layers.GlobalAveragePooling2D(),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

print("[*] Training Started...")
model.fit(train_gen, epochs=8, validation_data=val_gen)

# --- 4. SECURE SAVE TO DRIVE ---
SAVE_PATH = os.path.join(DRIVE_ROOT, "verifdoc_forensic_model_v2.h5")
model.save(SAVE_PATH)
print(f"🎉 SUCCÈS ! Modèle sauvegardé directement sur votre Drive : {SAVE_PATH}")

