from typing import Optional, Dict, Any
import logging
import os

logger = logging.getLogger(__name__)

class CRMAdapter:
    """
    Adapter pattern for CRM integrations (HubSpot, Brevo, Salesforce).
    Currently defaults to 'LogCRM' which logs leads locally until an API key is provided.
    """
    
    def __init__(self):
        self.provider = os.getenv("CRM_PROVIDER", "LOG").upper()
        self.api_key = os.getenv("CRM_API_KEY", "")
        
    async def create_lead(self, email: str, first_name: str = "", source: str = "VerifDoc Demo"):
        """
        Creates a new lead in the CRM.
        """
        if self.provider == "HUBSPOT":
            return await self._create_lead_hubspot(email, first_name, source)
        elif self.provider == "BREVO":
            return await self._create_lead_brevo(email, first_name, source)
        else:
            return await self._create_lead_log(email, first_name, source)

    async def _create_lead_log(self, email: str, first_name: str, source: str):
        """
        Fallback: Logs the lead to a file/console so no data is lost during dev.
        """
        logger.info(f"[CRM] NEW LEAD DETECTED: {email} | Source: {source} | Name: {first_name}")
        # In a real scenario, we might append to a CSV here
        return {"status": "stored_locally", "id": "local_123"}

    async def _create_lead_hubspot(self, email: str, first_name: str, source: str):
        # Placeholder for HubSpot Logic
        # import httpx
        # url = "https://api.hubapi.com/crm/v3/objects/contacts"
        # headers = {"Authorization": f"Bearer {self.api_key}"}
        # ...
        logger.info(f"[CRM] Would send {email} to HubSpot")
        return {"status": "mock_sent_hubspot"}

    async def _create_lead_brevo(self, email: str, first_name: str, source: str):
        # Placeholder for Brevo Logic
        logger.info(f"[CRM] Would send {email} to Brevo")
        return {"status": "mock_sent_brevo"}

# Global Instance
crm_client = CRMAdapter()
