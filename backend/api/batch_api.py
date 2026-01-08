from fastapi import APIRouter, UploadFile, File, Depends, BackgroundTasks
from typing import List
import pandas as pd
import io
from datetime import datetime
from backend.api.vision_api import analyze_document 
# Note: In a real architecture, we would refactor the analysis logic out of the route handler 
# into a service function to call it cleanly. For now, we simulate the structure.

router = APIRouter(prefix="/api/batch", tags=["Batch Processing"])

@router.post("/upload")
async def batch_upload(
    files: List[UploadFile] = File(...),
    # current_user = Depends(get_current_user) # Omis pour demo
):
    """
    TRAITEMENT PAR VOLUME (BATCH)
    1. Reçoit X fichiers.
    2. Analyse chaque fichier.
    3. Génère un RAPPORT DE SYNTHÈSE (Global).
    4. Permet l'accès aux RAPPORTS DÉTAILLÉS (À la demande).
    """
    
    results_summary = []
    detailed_reports_links = []
    
    # 1. Analyse itérative (Pourrait être parallélisée avec Celery)
    for file in files:
        # Simulation appel analysis service
        # service_result = await analysis_service.process(file)
        
        # Pour la démo, on simule le résultat basé sur le nom
        is_suspect = "fake" in file.filename.lower() or "suspect" in file.filename.lower()
        score = 45 if is_suspect else 98
        verdict = "FRAUDE" if is_suspect else "VALIDE"
        
        results_summary.append({
            "Fichier": file.filename,
            "Verdict": verdict,
            "Score_IA": f"{score}/100",
            "Anomalies": "Incohérence Pixels" if is_suspect else "Aucune",
            "Date": datetime.now().strftime("%Y-%m-%d %H:%M")
        })
        
        detailed_reports_links.append(f"/api/report/detail/{file.filename}")

    # 2. Génération Rapport Synthèse (Excel/CSV pour le Manager)
    df = pd.DataFrame(results_summary)
    stream = io.StringIO()
    df.to_csv(stream, index=False)
    csv_content = stream.getvalue()
    
    return {
        "batch_id": "BATCH_" + datetime.now().strftime("%Y%m%d%H%M%S"),
        "total_documents": len(files),
        "alertes_detectees": len([r for r in results_summary if r["Verdict"] == "FRAUDE"]),
        "global_report_csv": csv_content, # En prod, on renvoie une URL de téléchargement
        "detailed_reports": detailed_reports_links,
        "message": "Analyse de volume terminée. Rapport global prêt."
    }
