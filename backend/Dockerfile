# Backend Dockerfile Production
FROM python:3.10-slim-bookworm

WORKDIR /app

# Install system dependencies
# poppler-utils for pdf2image, tesseract for OCR
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements from backend directory
# Assuming build context is project root, so we COPY backend/requirements.txt
# If build context is backend/, we COPY requirements.txt
# We will standardize on building from project root for docker-compose.
COPY requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code to /app/backend
# allow imports like 'from backend.app import ...'
COPY . ./backend/

# Create uploads directory
RUN mkdir -p /app/backend/uploads

# Expose port
EXPOSE 8000

# Set python path
ENV PYTHONPATH=/app

# Default command (overridden by docker-compose for worker)
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
