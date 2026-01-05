from sqlalchemy.orm import Session
from sqlalchemy import desc
from backend.app.models import CreditTransaction

class TransactionType:
    DEPOSIT = "deposit"
    USAGE = "usage"

class CreditSystem:
    def __init__(self, db: Session):
        self.db = db


    def get_balance(self, organization_id: int) -> int:
        """Récupère le solde actuel en sommant toutes les transactions."""
        from sqlalchemy.sql import func
        result = self.db.query(func.sum(CreditTransaction.amount)).filter(
            CreditTransaction.organization_id == organization_id
        ).scalar()
        return result if result else 0

    def consume_credit(self, organization_id: int, user_id: int, cost: int = 1, description: str = "Analyse VDS") -> bool:
        """
        Débite des crédits.
        Retourne True si succès, False si solde insuffisant.
        """
        current_balance = self.get_balance(organization_id)
        
        if current_balance < cost:
            return False # Pas assez de crédits
            
        tx = CreditTransaction(
            organization_id=organization_id,
            user_id=user_id,
            amount=-cost,
            transaction_type=TransactionType.USAGE,
            description=description
        )
        
        self.db.add(tx)
        self.db.commit()
        self.db.refresh(tx)
        return True

    def add_credit(self, organization_id: int, amount: int, user_id: int = 1, description: str = "Recharge"):
        """Crédite le compte."""
        
        tx = CreditTransaction(
            organization_id=organization_id,
            user_id=user_id,
            amount=amount,
            transaction_type=TransactionType.DEPOSIT,
            description=description
        )
        self.db.add(tx)
        self.db.commit()
        return self.get_balance(organization_id)
