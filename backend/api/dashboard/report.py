from fastapi import APIRouter, Depends, HTTPException, Path
from fastapi.security import OAuth2PasswordBearer
from pathlib import Path as PathLib
import json, mimetypes
from fastapi.responses import FileResponse

from backend.app.schemas.report import ReportMetadata
from backend.app.utils.result_path import generate_result_path
from backend.app.utils.access_control import has_permission

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard Report"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    # Placeholder pour la logique user réelle
    return {
        "user_id": "user_42",
        "organization_id": "org_7",
        "subscription": "business",
        "sector": "finance",
    }

@router.get("/report/{document_id}/{result_type}")
async def get_report(
    document_id: str = Path(..., description="UUID du document"),
    result_type: str = Path(..., description="verdict | heatmap | metadata"),
    user: dict = Depends(get_current_user),
):
    perm_needed = f"view_{result_type}"
    if not has_permission(user["subscription"], perm_needed):
        raise HTTPException(status_code=403, detail="Accès refusé")

    file_path = generate_result_path(
        organization_id=user["organization_id"],
        user_id=user["user_id"],
        document_id=document_id,
        result_type=result_type,
        subscription=user["subscription"],
        sector=user["sector"],
        extension="json" if result_type != "heatmap" else "png",
    )

    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="Fichier non trouvé")

    mime = mimetypes.guess_type(str(file_path))[0] or "application/octet-stream"
    return FileResponse(str(file_path), media_type=mime, filename=file_path.name)
