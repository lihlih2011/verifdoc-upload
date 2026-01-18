# VerifDoc Chatbot AI Service

This directory contains a standalone Node.js microservice for the VerifDoc AI Chatbot, powered by Google Gemini Pro.

## Prerequisites
- Node.js (v18+)
- Google Cloud Vertex AI or Google AI Studio API Key

## Setup
1. Create a `.env` file in this directory based on `.env.example`.
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server
```bash
npm start
```
The server runs on http://localhost:3001 by default.

## API Usage
**POST /chat**
```json
{
  "message": "Analyze this mismatch...",
  "context": "rh" 
}
```

## Frontend Integration
Open `public/index.html` in your browser to test the widget.
For production integration, copy the HTML/CSS/JS from `index.html` into a React component or embed via iframe.
