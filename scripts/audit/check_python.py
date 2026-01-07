import sys
print(f"Python Works! Version: {sys.version}")
import sqlite3
print("SQLite3 Works!")
try:
    import sqlalchemy
    print(f"SQLAlchemy Works! Version: {sqlalchemy.__version__}")
except ImportError:
    print("SQLAlchemy MISSING")
except Exception as e:
    print(f"SQLAlchemy BROKEN: {e}")
