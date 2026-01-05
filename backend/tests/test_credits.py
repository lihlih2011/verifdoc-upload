from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.database import Base # Assumes Base is defined in your main database.py
from backend.app.models import CreditTransaction
from backend.app.services.credit_service import CreditSystem
import os

# Setup temporary DB for testing
TEST_DB = "sqlite:///./test_credits.db"
engine = create_engine(TEST_DB, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def test_credit_flow():
    print("--- TESTING CREDIT SYSTEM ---")
    
    # 1. Create Tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    ps = CreditSystem(db)
    org_id = 999 
    
    try:
        # 2. Check Initial Balance
        bal = ps.get_balance(org_id)
        print(f"1. Initial Balance: {bal}")
        assert bal == 0, "Initial balance should be 0"
        
        # 3. Try to consume (Should Fail)
        success = ps.consume_credit(org_id, 1, 1) # user=1
        print(f"2. Consumption w/o credit: {'SUCCESS' if success else 'FAILED (Expected)'}")
        assert success == False, "Should fail with 0 credits"
        
        # 4. Add Credits
        new_bal = ps.add_credit(org_id, 10, 1, "Achat Pack Starter")
        print(f"3. Added 10 credits. New Balance: {new_bal}")
        assert new_bal == 10, "Balance should be 10"
        
        # 5. Consume Again (Should Success)
        success = ps.consume_credit(org_id, 1, 1, "Analyse ID_123")
        print(f"4. Consumption w/ credit: {'SUCCESS' if success else 'FAILED'}")
        assert success == True, "Should succeed"
        
        final_bal = ps.get_balance(org_id)
        print(f"5. Final Balance: {final_bal}")
        assert final_bal == 9, "Balance should be 9"
        
        print("✅ CREDIT SYSTEM TEST PASSED")
        
    except Exception as e:
        print(f"❌ TEST FAILED: {e}")
    finally:
        db.close()
        # Cleanup
        if os.path.exists("test_credits.db"):
            os.remove("test_credits.db")

if __name__ == "__main__":
    test_credit_flow()
