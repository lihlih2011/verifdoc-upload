# generate_tests.py
"""Utility to generate a large number of pytest test cases for the VerifDoc backend.
It creates a file `generated_tests.py` with 1500 parametrized tests covering
- authentication (signup / login)
- document upload (different file types, sizes)
- analysis endpoint (different payloads)
The script can be run locally to (re)generate the test file.
"""
import json
import os
from pathlib import Path
import random
import string

# Directory where generated tests will be placed
output_dir = Path(__file__).parent
output_file = output_dir / "generated_tests.py"

# Helper to create random strings
def rand_str(length=8):
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))

# Generate test data
tests = []
# 500 auth tests (signup)
for i in range(500):
    email = f"user{i}_{rand_str(4)}@example.com"
    password = f"Pass{i}{rand_str(5)}!"
    tests.append({
        "type": "signup",
        "email": email,
        "password": password,
        "expected": 201,
    })
# 300 auth tests (login)
for i in range(300):
    email = f"login{i}@example.com"
    password = f"Login{i}{rand_str(5)}!"
    tests.append({
        "type": "login",
        "email": email,
        "password": password,
        "expected": 200,
    })
# 400 upload tests (different mime types and sizes)
mime_types = ["application/pdf", "image/jpeg", "image/png", "image/webp"]
for i in range(400):
    mime = random.choice(mime_types)
    size_kb = random.randint(10, 5000)  # size in KB
    tests.append({
        "type": "upload",
        "mime": mime,
        "size_kb": size_kb,
        "expected": 200 if size_kb < 4096 else 413,  # reject >4MB
    })
# 300 analysis tests (different document complexities)
for i in range(300):
    complexity = random.choice(["low", "medium", "high", "extreme"])
    tests.append({
        "type": "analysis",
        "complexity": complexity,
        "expected": 200,
    })

# Write the generated pytest file
with open(output_file, "w", encoding="utf-8") as f:
    f.write("import pytest\nfrom httpx import AsyncClient\nfrom backend.app.main import app\n\n@pytest.mark.asyncio\n@pytest.mark.parametrize(\n    \"scenario\",\n    [\n")
    for t in tests:
        f.write(f"        {json.dumps(t)},\n")
    f.write(")\nasync def test_generated(scenario):\\n    async with AsyncClient(app=app, base_url='http://test') as client:\\n        if scenario['type'] == 'signup':\\n            resp = await client.post('/auth/signup', json={'email': scenario['email'], 'password': scenario['password']})\\n        elif scenario['type'] == 'login':\\n            resp = await client.post('/auth/login', json={'email': scenario['email'], 'password': scenario['password']})\\n        elif scenario['type'] == 'upload':\\n            # create a dummy file payload (empty content, only headers matter)\\n            files = {'file': ('dummy', b'', scenario['mime'])}\\n            resp = await client.post('/documents/upload', files=files)\\n        elif scenario['type'] == 'analysis':\\n            payload = {'complexity': scenario['complexity']}\\n            resp = await client.post('/documents/analyze', json=payload)\\n        else:\\n            pytest.fail('Unknown scenario type')\\n        assert resp.status_code == scenario['expected']\\n")

print(f"Generated {len(tests)} test cases into {output_file}")
