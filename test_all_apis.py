"""
🛠️ Диагностика всех API-ключей
"""
import json
import urllib.request
import urllib.error

def load_env(path=".env"):
    keys = {}
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, val = line.split("=", 1)
                keys[key.strip()] = val.strip().strip('"').strip("'")
    except FileNotFoundError:
        print(f"❌ Файл {path} не найден!")
    return keys

env = load_env(".env")

print("=" * 60)
print("🔍 ДИАГНОСТИКА ВСЕХ API-КЛЮЧЕЙ")
print("=" * 60)

# --- OpenRouter ---
print("\n📡 Тест OpenRouter API...")
openrouter_key = env.get("OPENROUTER_API_KEY", "")
print(f"   Ключ: {openrouter_key[:12]}...{openrouter_key[-4:]}" if openrouter_key else "   ❌ Не задан")

if openrouter_key:
    try:
        data = json.dumps({
            "model": "meta-llama/llama-3.1-8b-instruct:free",
            "messages": [{"role": "user", "content": "Say hello in exactly 3 words"}],
            "max_tokens": 15,
        }).encode("utf-8")
        req = urllib.request.Request(
            "https://openrouter.ai/api/v1/chat/completions",
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {openrouter_key}"
            },
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            text = result["choices"][0]["message"]["content"].strip()
            print(f"   ✅ OpenRouter работает! Ответ: {text}")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"   ❌ OpenRouter: HTTP {e.code}")
        print(f"      {body[:300]}")
    except Exception as e:
        print(f"   ❌ OpenRouter: {e}")
else:
    print("   ❌ Ключ не задан")

# --- DeepInfra ---
print("\n📡 Тест DeepInfra API...")
deepinfra_key = env.get("DEEPINFRA_API_KEY", "")
print(f"   Ключ: {deepinfra_key[:12]}...{deepinfra_key[-4:]}" if deepinfra_key else "   ❌ Не задан")

if deepinfra_key:
    try:
        data = json.dumps({
            "model": "meta-llama/Llama-3.3-70B-Instruct",
            "messages": [{"role": "user", "content": "Say hello in exactly 3 words"}],
            "max_tokens": 15,
        }).encode("utf-8")
        req = urllib.request.Request(
            "https://api.deepinfra.com/v1/openai/chat/completions",
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {deepinfra_key}"
            },
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            text = result["choices"][0]["message"]["content"].strip()
            print(f"   ✅ DeepInfra работает! Ответ: {text}")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"   ❌ DeepInfra: HTTP {e.code}")
        print(f"      {body[:300]}")
    except Exception as e:
        print(f"   ❌ DeepInfra: {e}")
else:
    print("   ❌ Ключ не задан")

print("\n" + "=" * 60)
