
# VerifDoc Testing Strategy (1500 Points)

This document outlines the strategy to reach high test coverage and stability.

## 1. Backend Testing (Python/FastAPI)
**Framework**: `pytest`
**Target**: 100% API Endpoint Coverage, 90% Core Logic Coverage.

### Categories:
*   **Authentication**:
    *   Signup (Valid, Duplicate Email, Weak Password)
    *   Login (Valid, Invalid Credentials, Locked Account)
    *   Token Validation (Expired, Invalid Structure)
*   **Document Upload**:
    *   File Type Support (PDF, JPG, PNG)
    *   Size Limits
    *   Malicious File Detection
*   **Analysis Engine**:
    *   Metadata Extraction correctness
    *   Pixel Consistency checks
    *   OCR accuracy checks
*   **Database**:
    *   CRUD operations for Users, Documents, Logs
    *   Transaction rollback on failure

## 2. Frontend Testing (React/Vite)
**Framework**: `vitest`, `react-testing-library`
**Target**: Critical User Flows.

### Categories:
*   **Pages**:
    *   LandingPageV2 (Rendering, Links, SEO tags)
    *   AuthPage (Form validation, API integration)
    *   Dashboard (Start/Stop of components, Data display)
*   **Components**:
    *   Upload Dropzone (Drag&Drop, File selection)
    *   Result Cards (Pass/Fail styling)
    *   Sidebar/Admin Layouts

## 3. End-to-End (E2E)
**Framework**: `Playwright` (Planned)
*   Full user journey: Arrive on Landing -> Signup -> Upload Doc -> View Result -> Logout.

## 4. Current Progress
*   [x] Basic Backend Test Setup
*   [x] Basic Frontend Test Setup
*   [ ] Integration of all 50+ Backend Endpoints
*   [ ] Integration of all 20+ Frontend Pages

## How to Run Tests
**Backend**:
```bash
cd backend
pip install pytest httpx pytest-asyncio
pytest
```

**Frontend**:
```bash
cd frontend
npm test
```
