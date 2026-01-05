from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import User, Transaction
from backend.api.auth_api import get_current_user

router = APIRouter(prefix="/billing", tags=["billing"])

@router.get("/balance")
def get_balance(current_user: User = Depends(get_current_user)):
    return {
        "email": current_user.email,
        "credits": current_user.credits_balance,
        "is_active": current_user.is_active
    }

@router.post("/purchase-pack")
def purchase_pack(pack_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Purchase a specific credit pack.
    PACKS:
    - starter: 149€ -> 150 Credits
    - pro: 249€ -> 500 Credits
    - business: 499€ -> 1500 Credits
    """
    packs = {
        "starter": {"credits": 150, "price": 149},
        "pro": {"credits": 500, "price": 249},
        "business": {"credits": 3000, "price": 899}
    }
    
    if pack_id not in packs:
        raise HTTPException(status_code=400, detail="Invalid Pack ID")
        
    pack = packs[pack_id]
    
    # Update Balance
    current_user.credits_balance += pack["credits"]
    
    # Log Transaction
    txn = Transaction(
        user_id=current_user.id,
        amount=pack["credits"],
        transaction_type="DEPOSIT",
        description=f"Purchase: {pack_id.capitalize()} Pack ({pack['price']}€)"
    )
    db.add(txn)
    db.commit()
    
    return {"message": "Purchase successful", "new_balance": current_user.credits_balance, "added": pack["credits"]}

@router.post("/simulate-deposit")
def simulate_stripe_payment(amount: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Mock endpoint for Stripe Payment. Adds credits.
    """
    # 1. Update User Balance
    current_user.credits_balance += amount
    
    # 2. Log Transaction
    txn = Transaction(
        user_id=current_user.id,
        amount=amount,
        transaction_type="DEPOSIT",
        description="Stripe Payment (Simulated)"
    )
    db.add(txn)
    db.commit()
    
    return {"message": "Payment successful", "new_balance": current_user.credits_balance}

@router.get("/history")
def get_transaction_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    history = db.query(Transaction).filter(Transaction.user_id == current_user.id).order_by(Transaction.timestamp.desc()).limit(50).all()
    return history
