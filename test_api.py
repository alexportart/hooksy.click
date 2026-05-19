"""
🛠️ Диагностика API-ключей (без dotenv)
Тестирует Groq и Gemini напрямую
"""
import json
import urllib.request
import urllib.error
import re

# Читаем .env вручную
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
groq_key = env.get("GROQ_API_KEY", "")
gemini_key = env.get("GEMINI_API_KEY", "")

print("=" * 60)
print("🔍 ДИАГНОСТИКА API-КЛЮЧЕЙ")
print("=" * 60)

# --- Тест Groq ---
print("\n📡 Тест Groq API...")
print(f"   Ключ: {groq_key[:12]}...{groq_key[-4:]}" if groq_key else "   ❌ Не задан")

if groq_key.startswith("gsk_"):
    for model in ["llama3-8b-8192", "mixtral-8x7b-32768", "gemma2-9b-it"]:
        try:
            data = json.dumps({
                "model": model,
                "messages": [{"role": "user", "content": "Say hello in exactly 3 words"}],
                "max_tokens": 15,
            }).encode("utf-8")
            req = urllib.request.Request(
                "https://api.groq.com/openai/v1/chat/completions",
                data=data,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {groq_key}"
                },
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                result = json.loads(resp.read().decode("utf-8"))
                text = result["choices"][0]["message"]["content"].strip()
                print(f"   ✅ Groq ({model}) работает! Ответ: {text}")
                break
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            if "model_not_found" in body or e.code == 404:
                continue
            print(f"   ❌ Groq ({model}): HTTP {e.code}")
            print(f"      {body[:200]}")
            break
        except Exception as e:
            print(f"   ❌ Groq ({model}): {e}")
            break
    else:
        print("   ❌ Все модели Groq недоступны с этим ключом")
else:
    print("   ❌ Ключ не начинается с gsk_ (невалидный формат)")

# --- Тест Gemini ---
print("\n📡 Тест Gemini API...")
print(f"   Ключ: {gemini_key[:12]}...{gemini_key[-4:]}" if gemini_key else "   ❌ Не задан")

if gemini_key.startswith("AIza"):
    models_to_test = [
        ("gemini-2.0-flash-exp", "v1"),
        ("gemini-2.0-flash-exp", "v1beta"),
        ("gemini-1.5-flash", "v1"),
        ("gemini-1.5-flash", "v1beta"),
        ("gemini-pro", "v1"),
    ]

    found = False
    for model, api_ver in models_to_test:
        if found:
            break
        try:
            data = json.dumps({
                "contents": [{"parts": [{"text": "Say hello in exactly 3 words"}]}],
                "generationConfig": {"maxOutputTokens": 15, "temperature": 0.5}
            }).encode("utf-8")

            url = f"https://generativelanguage.googleapis.com/{api_ver}/models/{model}:generateContent?key={gemini_key}"

            req = urllib.request.Request(url, data=data,
                headers={"Content-Type": "application/json"}, method="POST")

            with urllib.request.urlopen(req, timeout=15) as resp:
                result = json.loads(resp.read().decode("utf-8"))
                text = result["candidates"][0]["content"]["parts"][0]["text"].strip()
                print(f"   ✅ Gemini ({model}, {api_ver}) работает! Ответ: {text}")
                found = True
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            if "not found" in body.lower() or "not supported" in body.lower() or e.code == 404:
                continue
            print(f"   ❌ Gemini ({model}, {api_ver}): HTTP {e.code}")
            print(f"      {body[:200]}")
            found = True  # Ключ есть, но другая проблема
        except Exception as e:
            print(f"   ❌ Gemini ({model}, {api_ver}): {e}")
            found = True

    if not found:
        print("   ❌ Все модели Gemini недоступны с этим ключом")
else:
    print("   ❌ Ключ не начинается с AIza (невалидный формат)")

print("\n" + "=" * 60)
print("💡 Результаты выше показывают, какие API работают.")
print("👉 Новый Groq ключ: https://console.groq.com/keys")
print("👉 Новый Gemini ключ: https://aistudio.google.com/apikey")
print("=" * 60)