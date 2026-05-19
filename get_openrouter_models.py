"""
🛠️ Получение списка доступных моделей OpenRouter
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
print("🔍 СПИСОК ДОСТУПНЫХ МОДЕЛЕЙ OPENROUTER")
print("=" * 60)

try:
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/models",
        headers={
            "Authorization": f"Bearer {openrouter_key}"
        }
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        result = json.loads(resp.read().decode("utf-8"))
        
        print("\n📋 Бесплатные модели:")
        for model in result.get("data", []):
            name = model.get("id", "")
            pricing = model.get("pricing", {})
            prompt_price = float(pricing.get("prompt", "0"))
            completion_price = float(pricing.get("completion", "0"))
            
            if prompt_price == 0 and completion_price == 0:
                print(f"   ✅ {name}")
        
        print("\n📋 Дешевые модели (до $0.001):")
        for model in result.get("data", []):
            name = model.get("id", "")
            pricing = model.get("pricing", {})
            prompt_price = float(pricing.get("prompt", "0"))
            completion_price = float(pricing.get("completion", "0"))
            
            if 0 < prompt_price < 0.001 and 0 < completion_price < 0.001:
                print(f"   💰 {name} (prompt: ${prompt_price}, completion: ${completion_price})")

except Exception as e:
    print(f"❌ Ошибка: {e}")

print("\n" + "=" * 60)
