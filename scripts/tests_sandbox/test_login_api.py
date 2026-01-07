import requests
import sys

def test_login():
    url = "http://localhost:8000/api/auth/token"
    # FastAPI OAuth2PasswordRequestForm expects 'username' and 'password'
    payload = {
        "username": "contact@verifdoc.io",
        "password": "admin"
    }
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    try:
        print(f"Attempting login to {url}...")
        response = requests.post(url, data=payload, headers=headers)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 200:
            print("LOGIN SUCCESSFUL! Token received.")
        else:
            print("LOGIN FAILED.")
            
    except Exception as e:
        print(f"Error connecting to API: {e}")

if __name__ == "__main__":
    test_login()
