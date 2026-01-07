import requests

def test_login():
    url = "http://localhost:8000/api/auth/token"
    payload = {
        "username": "admin@verifdoc.fr",
        "password": "admin123"
    }
    try:
        response = requests.post(url, data=payload)
        if response.status_code == 200:
            print("✅ LOGIN SUCCESS: Token received!")
            print(response.json())
        else:
            print(f"❌ LOGIN FAILED: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"❌ CONNECTION ERROR: {e}")

if __name__ == "__main__":
    test_login()
