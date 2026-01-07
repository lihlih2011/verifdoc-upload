import requests
import os

def test_api_b2b():
    url = "http://localhost:8000/api/external/analyze"
    headers = {"x-api-key": "sk_live_DEMO"}
    
    # Créer un faux PDF si besoin
    if not os.path.exists("test_b2b.pdf"):
        with open("test_b2b.pdf", "wb") as f:
            f.write(b"%PDF-1.4 ... Fake Content ...")

    files = {'file': open("test_b2b.pdf", 'rb')}
    
    print("🚀 Sending B2B Analysis Request...")
    response = requests.post(url, headers=headers, files=files)
    
    if response.status_code == 200:
        print("✅ SUCCESS B2B!")
        print(response.json())
    else:
        print(f"❌ FAIL: {response.status_code}")
        print(response.text)

if __name__ == "__main__":
    test_api_b2b()
