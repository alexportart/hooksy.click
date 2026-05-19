"""
🛠️ Тест разных моделей OpenRouter
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
openrouter_key = env.get("OPENROUTER_API_KEY", "")

print("=" * 60)
print("🔍 ТЕСТ РАЗНЫХ МОДЕЛЕЙ OPENROUTER")
print("=" * 60)

# Бесплатные модели для тестирования
models = [
    "meta-llama/llama-3.1-8b-instruct:free",
    "meta-llama/llama-3.2-3b-instruct:free",
    "google/gemma-2-9b-it:free",
    "mistralai/mistral-7b-instruct:free",
    "huggingfaceh4/zephyr-7b-beta:free",
]

for model in models:
    print(f"\n📡 Тест {model}...")
    try:
        data = json.dumps({
            "model": model,
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
            print(f"   ✅ Работает! Ответ: {text}")
            print(f"   💡 Рекомендую использовать эту модель в .env")
            break
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"   ❌ HTTP {e.code}")
        if "No endpoints found" in body:
            print(f"      Модель не найдена или недоступна")
        else:
            print(f"      {body[:200]}")
    except Exception as e:
        print(f"   ❌ {e}")

print("\n" + "=" * 60)
