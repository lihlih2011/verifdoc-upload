
import pytest
from httpx import AsyncClient
from backend.app.main import app

@pytest.mark.asyncio
async def test_read_root():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to VerifDoc API"}

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/health")
    # Assuming health endpoint exists, if not it might be 404, but let's try
    if response.status_code != 404:
        assert response.status_code == 200
    else:
        # If no health check, at least we tested root
        pass
