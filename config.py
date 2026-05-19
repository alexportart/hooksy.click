"""
Конфигурация для проекта Hooksy.click
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Загрузка переменных окружения
load_dotenv()

# Пути
BASE_DIR = Path(__file__).parent

# Бесплатные AI API (GenAPI + OpenRouter + Groq + Gemini)
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openrouter/free")
GENAPI_API_KEY = os.getenv("GENAPI_API_KEY", "")
GENAPI_MODEL = os.getenv("GENAPI_MODEL", "YandexGPT")

# Какой AI провайдер использовать приоритетно: "genapi", "openrouter", "groq" или "gemini"
AI_PROVIDER = os.getenv("AI_PROVIDER", "openrouter")

# Настройки сервера
SERVER_HOST = os.getenv("SERVER_HOST", "0.0.0.0")
SERVER_PORT = int(os.getenv("SERVER_PORT", "5000"))