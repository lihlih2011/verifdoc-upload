from fastapi import APIRouter, Depends, HTTPException, Path
from fastapi.security import OAuth2PasswordBearer
from pathlib import Path as PathLib

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard Purge"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme)):
    return {
        "user_id": "user_42",
        "organization_id": "org_7",
        "subscription": "business",
        "sector": "finance",
    }

@router.delete("/purge/{document_id}")
async def purge_document(document_id: str = Path(...), user: dict = Depends(get_current_user)):
    if user["subscription"] != "enterprise":
        raise HTTPException(status_code=403, detail="Seuls les comptes Enterprise peuvent purger des données.")

    base = PathLib("results") / user["organization_id"] / user["subscription"] / user["sector"] / user["user_id"] / document_id
    if not base.exists():
        raise HTTPException(status_code=404, detail="Document introuvable")

    for p in base.rglob("*"):
        p.unlink()
    return {"msg": f"Document {document_id} supprimé définitivement"}
