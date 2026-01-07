import sys
import os

print(f"Python executable: {sys.executable}")
print(f"CWD: {os.getcwd()}")

try:
    import fpdf
    print(f"FPDF version: {fpdf.__version__}")
except ImportError:
    print("CRITICAL: fpdf module not found. Run 'pip install fpdf2'.")

try:
    from backend.engine.report_generator import ReportGenerator
    print("ReportGenerator imported successfully.")
except Exception as e:
    print(f"CRITICAL: Failed to import ReportGenerator: {e}")
    sys.exit(1)

# Test Generation
data = {
    "document_id": "TEST_AUTO_001",
    "filename": "debug_test.pdf",
    "user_id": "user_DEBUG",
    "sector": "finance",
    "verdict": "verdict_valid",
    "confidence": 0.99,
    "message": "Test Message",
    "created_at": "2025-12-30T20:00:00Z"
}

try:
    gen = ReportGenerator()
    path, bytes_content = gen.generate_report(data)
    print(f"SUCCESS: PDF generated at {path}")
    print(f"PDF Size: {len(bytes_content)} bytes")
except Exception as e:
    print(f"CRITICAL: PDF Generation failed: {e}")
