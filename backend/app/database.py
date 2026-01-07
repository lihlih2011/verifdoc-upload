from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from backend.app.config import settings
import os

# Use SQLite for simplicity, can be changed to PostgreSQL/MySQL later
# Gestion dynamique de la base de données (SQLite Local vs PostgreSQL Prod)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./verifdoc.db")

# Ajustement pour Render : L'URL de base commence parfois par postgres:// au lieu de postgresql://
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Configuration de l'Engine
if "sqlite" in SQLALCHEMY_DATABASE_URL:
    # Mode Local (SQLite)
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    # Mode Production (PostgreSQL)
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()