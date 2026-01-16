from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from io import BytesIO
from fpdf import FPDF
from backend.api.auth_api import check_admin
from backend.app.models import User

router = APIRouter(prefix="/admin/report", tags=["admin"])

@router.get("/monthly")
def monthly_report(admin: User = Depends(check_admin)):
    """Génère un PDF de rapport mensuel."""
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Rapport Mensuel VerifDoc", ln=1, align="C")
    
    pdf.ln(10)
    pdf.set_font("Arial", size=10)
    pdf.cell(200, 10, txt="Ce rapport presente les statistiques cles du mois.", ln=1)
    
    # Placeholder KPI
    pdf.cell(200, 10, txt="- Nouveaux utilisateurs: +15%", ln=1)
    pdf.cell(200, 10, txt="- Volume d'analyses: 15,420", ln=1)
    pdf.cell(200, 10, txt="- Taux de succes: 98.5%", ln=1)

    pdf_bytes = pdf.output(dest="S").encode("latin1")
    return StreamingResponse(
        BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=monthly_report.pdf"},
    )
