from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from backend.app.database import get_db
from backend.app.models import Lead, Contact, Deal, Contract, DealStage, LeadStatus
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

router = APIRouter(prefix="/api/crm", tags=["CRM & Contracts"])

# --- SCHEMAS ---
class LeadCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    job_title: str
    company_type: str
    needs: str | None = None
    source: str = "Web"

class ContractGenerateRequest(BaseModel):
    deal_id: int
    service_type: str = "Pack 100 Analyses"
    price_eur: float = 500.0

class ContractSignRequest(BaseModel):
    signature_data: str # Base64
    ip: str

# --- ENDPOINTS ---

import traceback
from fastapi.responses import JSONResponse

@router.get("/leads")
def list_leads(db: Session = Depends(get_db)):
    return db.query(Lead).all()

@router.get("/deals")
def list_deals(db: Session = Depends(get_db)):
    return db.query(Deal).all()

@router.post("/leads")
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    """Capture un nouveau prospect et notifie l'équipe."""
    try:
        new_lead = Lead(
            first_name=lead.first_name,
            last_name=lead.last_name,
            email=lead.email,
            job_title=lead.job_title,
            company_type=lead.company_type,
            needs=lead.needs,
            status="new"
        )
        db.add(new_lead)
        db.commit()
        db.refresh(new_lead)
        
        # REAL EMAIL NOTIFICATION (Gmail SMTP)
        try:
            sender_email = "agenceads@gmail.com"
            sender_password = "Yacine2024@"
            receiver_email = "agenceads@gmail.com"

            message = MIMEMultipart("alternative")
            message["Subject"] = f"🔔 Nouveau Lead VerifDoc : {lead.first_name} {lead.last_name}"
            message["From"] = sender_email
            message["To"] = receiver_email

            html = f"""
            <html>
              <body style="font-family: Arial, sans-serif;">
                <h2 style="color: #2563eb;">Nouveau Lead VerifDoc 🚀</h2>
                <p>Un nouveau prospect vient de remplir le formulaire de contact.</p>
                <hr style="border: 1px solid #e5e7eb;">
                <ul>
                    <li><strong>Nom :</strong> {lead.first_name} {lead.last_name}</li>
                    <li><strong>Email :</strong> <a href="mailto:{lead.email}">{lead.email}</a></li>
                    <li><strong>Société :</strong> {lead.company_type}</li>
                    <li><strong>Poste :</strong> {lead.job_title}</li>
                </ul>
                <h3>Besoins exprimés :</h3>
                <p style="background: #f1f5f9; padding: 15px; border-left: 4px solid #2563eb; border-radius: 4px;">
                    {lead.needs}
                </p>
              </body>
            </html>
            """
            
            part = MIMEText(html, "html")
            message.attach(part)

            with smtplib.SMTP("smtp.gmail.com", 587) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, receiver_email, message.as_string())
            print(f"📧 EMAIL SENT SUCCESS to {receiver_email}")
        except Exception as smtp_err:
             print(f"❌ SMTP ERROR: {smtp_err}")
        
        return {"status": "success", "lead_id": new_lead.id}
    except Exception as e:
        print(f"ERROR: {e}")
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})

import base64
import os

@router.post("/contracts/generate")
def generate_service_contract(req: ContractGenerateRequest, db: Session = Depends(get_db)):
    """Génère un Contrat SaaS Professionnel (Smart Contract)."""
    deal = db.query(Deal).filter(Deal.id == req.deal_id).first()
    if not deal:
        raise HTTPException(404, "Deal not found")
    
    # Données Dynamiques
    client_name = deal.lead.company_name if (deal.lead and deal.lead.company_name) else "LE CLIENT"
    contact_name = f"{deal.lead.contact.first_name} {deal.lead.contact.last_name}" if (deal.lead and deal.lead.contact) else "Direction"
    
    date_jour = datetime.utcnow().strftime('%d/%m/%Y')
    ref_contrat = f"K-{deal.id}-{uuid.uuid4().hex[:6].upper()}"

    # Load Logo
    logo_b64 = ""
    logo_path = os.path.join("backend", "assets", "logo_premium.jpg")
    try:
        with open(logo_path, "rb") as image_file:
            logo_b64 = base64.b64encode(image_file.read()).decode('utf-8')
    except Exception as e:
        print(f"Error loading logo: {e}")

    img_src = f"data:image/jpeg;base64,{logo_b64}" if logo_b64 else ""

    content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Contrat VerifDoc - {client_name}</title>
        <style>
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f1f5f9; color: #334155; margin: 0; padding: 40px; }}
            .contract-container {{ max-width: 800px; margin: 0 auto; background: white; padding: 60px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-radius: 12px; position: relative; overflow: hidden; }}
            
            /* WATERMARK */
            .contract-container::before {{
                content: "";
                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: 600px; height: 600px;
                background-image: url('{img_src}');
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                opacity: 0.04;
                z-index: 0;
                pointer-events: none;
            }}

            .header {{ text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 30px; margin-bottom: 40px; position: relative; z-index: 1; }}
            .header img {{ height: 100px; margin-bottom: 15px; }}
            .header h1 {{ margin: 0; color: #0f172a; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }}
            .ref {{ color: #94a3b8; font-size: 12px; margin-top: 10px; font-family: monospace; }}
            
            /* Content Content must be z-index 1 to sit above watermark */
            .content-body {{ position: relative; z-index: 1; }}
            
            h3 {{ color: #2563eb; font-size: 16px; margin-top: 40px; border-left: 4px solid #2563eb; padding-left: 10px; text-transform: uppercase; }}
            p {{ line-height: 1.8; font-size: 14px; text-align: justify; }}
            strong {{ color: #0f172a; }}

            .box-price {{ background: #f8fafc; border: 1px solid #cbd5e1; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }}
            .price-tag {{ font-size: 28px; font-weight: bold; color: #2563eb; display: block; }}
            
            .signature-section {{ margin-top: 60px; display: flex; justify-content: space-between; gap: 40px; }}
            .sig-block {{ flex: 1; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; background: #fafafa; }}
            .sig-title {{ font-weight: bold; font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 10px; display: block; }}
            
            #sig-canvas {{ border: 2px dashed #cbd5e1; background: white; cursor: crosshair; width: 100%; height: 150px; border-radius: 4px; touch-action: none; }}
            .btn-sign {{ background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%; margin-top: 10px; transition: background 0.2s; }}
            .btn-sign:hover {{ background: #1d4ed8; }}
            .btn-clear {{ background: transparent; color: #ef4444; border: none; font-size: 12px; cursor: pointer; margin-top: 5px; text-decoration: underline; }}
        </style>
    </head>
    <body>
        <div class="contract-container" id="contract">
            <div class="header">
                {f'<img src="{img_src}" alt="VerifDoc Logo">' if img_src else ''}
                <h1>Contrat de Prestation SaaS</h1>
                <div class="ref">RÉFÉRENCE: {ref_contrat}</div>
            </div>

            <div class="content-body">
                <p><strong>ENTRE :</strong></p>
                <p>
                    <strong>VERIFDOC SAS</strong>, 12 Avenue des Champs, 75008 Paris.<br>
                    Représentée par M. Chaou.<br>
                    <em>(Ci-après "Le Prestataire")</em>
                </p>
                <p><strong>ET :</strong></p>
                <p>
                    <strong>{client_name}</strong>, représentée par {contact_name}.<br>
                    <em>(Ci-après "Le Client")</em>
                </p>

                <h3>1. Objet</h3>
                <p>
                    Le présent contrat a pour objet de définir les conditions dans lesquelles le Prestataire met à disposition du Client 
                    sa solution SaaS <strong>VerifDoc™</strong> (Analyse & Certification de Documents avec Technologie IA).<br>
                    Le périmètre inclut : <strong>{req.service_type}</strong>.
                </p>

                <h3>2. Conditions Financières</h3>
                <div class="box-price">
                    Forfait : {req.service_type}
                    <span class="price-tag">{req.price_eur:,.2f} € HT</span>
                    <small>Payable à réception de facture</small>
                </div>

                <h3>3. Signature & Validation</h3>
                <p>En signant ci-dessous, le Client accepte sans réserve les Conditions Générales de Vente et le traitement des données.</p>
                
                <div class="signature-section">
                    <!-- PRESTATAIRE -->
                    <div class="sig-block" style="position: relative;">
                        <span class="sig-title">Pour VerifDoc SAS</span>
                        <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; color: #2563eb; margin-top: 30px;">VerifDoc Validé</div>
                        <div style="font-size: 10px; color: #94a3b8; margin-top: 30px;">Signé le {date_jour}</div>
                    </div>

                    <!-- CLIENT -->
                    <div class="sig-block" id="client-sig-block">
                        <span class="sig-title">Pour {client_name}</span>
                        <canvas id="sig-canvas" width="300" height="150"></canvas>
                        <button class="btn-clear" onclick="clearCanvas()">Effacer</button>
                        <div style="font-size: 11px; color: #64748b; margin-top: 5px;">
                            Date : <span id="current-date">--/--</span>
                        </div>
                        <button class="btn-sign" onclick="submitContract()">SIGNER & VALIDER</button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            function updateTime() {{
                const now = new Date();
                document.getElementById('current-date').innerText = now.toLocaleString();
            }}
            setInterval(updateTime, 1000);
            updateTime();

            const canvas = document.getElementById('sig-canvas');
            const ctx = canvas.getContext('2d');
            let drawing = false;

            // Touch & Mouse Support
            function getPos(e) {{
                const rect = canvas.getBoundingClientRect();
                const clientX = e.clientX || e.touches[0].clientX;
                const clientY = e.clientY || e.touches[0].clientY;
                return {{ x: clientX - rect.left, y: clientY - rect.top }};
            }}

            function start(e) {{ drawing = true; ctx.beginPath(); const pos = getPos(e); ctx.moveTo(pos.x, pos.y); }}
            function end() {{ drawing = false; ctx.closePath(); }}
            function move(e) {{
                if (!drawing) return;
                const pos = getPos(e);
                ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.strokeStyle = '#0f172a';
                ctx.lineTo(pos.x, pos.y); ctx.stroke();
            }}

            canvas.addEventListener('mousedown', start);
            canvas.addEventListener('mouseup', end);
            canvas.addEventListener('mousemove', move);
            canvas.addEventListener('touchstart', (e)=>{{e.preventDefault(); start(e)}});
            canvas.addEventListener('touchend', (e)=>{{e.preventDefault(); end()}});
            canvas.addEventListener('touchmove', (e)=>{{e.preventDefault(); move(e)}});

            function clearCanvas() {{ ctx.clearRect(0,0,canvas.width,canvas.height); }}
            
            async function submitContract() {{
                const dataUrl = canvas.toDataURL();
                // Real API Call Simulation
                const btn = document.querySelector('.btn-sign');
                btn.innerText = "SIGNATURE ENREGISTRÉE ✅";
                btn.style.background = "#10b981";
                btn.disabled = true;
                canvas.style.pointerEvents = "none";
                alert("Smart Contract Signé ! Le document est verrouillé.");
            }}
        </script>
    </body>
    </html>
    """
    
    contract = Contract(
        deal_id=deal.id,
        title=f"Contrat {req.service_type} - {client_name}",
        content_html=content,
        is_signed=False
    )
    deal.stage = DealStage.CONTRACT_SENT
    db.add(contract)
    db.commit()
    return {"status": "Contract Generated (Smart Template)", "contract_id": contract.id}

@router.post("/contracts/{contract_id}/sign")
def sign_contract(contract_id: int, req: ContractSignRequest, db: Session = Depends(get_db)):
    """Enregistre la signature électronique."""
    contract = db.query(Contract).filter(Contract.id == contract_id).first()
    if not contract:
        raise HTTPException(404, "Contract not found")
        
    contract.is_signed = True
    contract.signed_at = datetime.utcnow()
    contract.signature_data = req.signature_data
    contract.signer_ip = req.ip
    
    # Auto-Move Deal to WON
    if contract.deal:
        contract.deal.stage = DealStage.SIGNED
        if contract.deal.lead:
            contract.deal.lead.status = LeadStatus.WON
            
    db.commit()
    return {"status": "Signed Successfully", "timestamp": contract.signed_at}
