import os
import json
import random
import re
import requests
from typing import Dict, List, Optional
import logging
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

logger = logging.getLogger(__name__)

# Отключаем вывод ошибок TLS в лог
logging.getLogger("requests").setLevel(logging.WARNING)
logging.getLogger("urllib3").setLevel(logging.WARNING)

# Целевые слова для различных тем (русский)
target_keywords_ru = {
    "ai": ["ИскусственныйИнтеллект", "МашинноеОбучение", "БудущееТехнологий"],
    "мотивация": ["Мотивация", "Саморазвитие", "Успех", "Вдохновение", "Цели", "ЛичнаяЭффективность", "МотивационныеЦитаты", "НастройНаУспех"],
    "девушки": ["Девушки", "Красота", "Отношения", "Любовь", "Стиль", "Женственность", "Уверенность", "Вдохновение"],
    "крипта": ["Криптовалюта", "Биткоин", "Блокчейн", "Дефи", "КриптоТренды", "Инвестиции", "Финтех"],
    "бизнес": ["БизнесИдеи", "Предпринимательство", "Маркетинг", "Продажи", "ЛичныйБренд", "Финансы", "УправлениеВременем", "Стартапы"],
    "здоровье": ["ЗдоровыйОбразЖизни", "Фитнес", "Питание", "Йога", "Медитация", "Психология", "Детокс", "Спорт"],
    "путешествия": ["Путешествия", "Туризм", "Авантюры", "ВокругСвета", "ТуристическиеМеста"],
    "технологии": ["Технологии", "Инновации", "Гаджеты", "Смартфоны", "Игры"],
    "образование": ["Образование", "ОнлайнОбучение", "Курсы", "Университет", "Знания", "Самообразование", "УспешныеСтуденты"],
}

# Целевые слова для различных тем (английский — глобальные)
target_keywords_en = {
    "ai": ["AI", "ArtificialIntelligence", "MachineLearning", "FutureTech", "NeuralNetworks", "DeepLearning", "TechInnovation", "DigitalTransformation"],
    "motivation": ["Motivation", "SelfDevelopment", "Success", "Inspiration", "Goals", "PersonalEffectiveness", "Mindset", "GrowthMindset"],
    "girls": ["Girls", "Women", "Beauty", "Relationships", "Love", "Style", "Femininity", "Confidence"],
    "crypto": ["Cryptocurrency", "Bitcoin", "Blockchain", "Web3", "DeFi", "CryptoTrends", "Investing", "Fintech"],
    "business": ["BusinessIdeas", "Entrepreneurship", "Marketing", "Sales", "PersonalBrand", "Finance", "TimeManagement", "Startups"],
    "health": ["HealthyLifestyle", "Fitness", "Nutrition", "Yoga", "Meditation", "Psychology", "Detox", "Sport"],
    "travel": ["Travel", "Tourism", "Adventures", "AroundTheWorld", "TravelDestinations", "TravelDiaries", "Backpacking", "AdventureTravel"],
    "technology": ["Technology", "Innovation", "Gadgets", "Smartphones", "Gaming", "VR", "AR", "Fintech"],
    "education": ["Education", "OnlineLearning", "Courses", "University", "Knowledge", "SelfEducation", "EdTech", "Students"],
}

# Целевые слова для различных тем (испанский)
target_keywords_es = {
    "ai": ["InteligenciaArtificial", "AprendizajeAutomatico", "FuturoTech", "IA"],
    "motivacion": ["Motivacion", "Inspiracion", "Exito", "Metas", "Superacion", "Autoayuda", "CrecimientoPersonal", "MentalidadPositiva"],
    "chicas": ["Chicas", "Mujeres", "Belleza", "Relaciones", "Amor", "Estilo", "Feminidad", "Confianza"],
    "crypto": ["Criptomonedas", "Bitcoin", "Blockchain", "Web3", "DeFi", "CryptoTrends", "Inversiones", "Fintech"],
    "negocios": ["Negocios", "Emprendimiento", "Marketing", "Ventas", "MarcaPersonal", "Finanzas", "Startups", "Liderazgo"],
    "salud": ["Salud", "Fitness", "Nutricion", "Yoga", "Meditacion", "Psicologia", "Bienestar", "Deporte"],
    "viajes": ["Viajes", "Turismo", "Aventuras", "Explorar", "Viajar", "TravelDiaries", "Backpacking", "AdventureTravel"],
    "tecnologia": ["Tecnologia", "Innovacion", "Gadgets", "Smartphones", "Juegos", "VR", "AR", "Fintech"],
    "educacion": ["Educacion", "Aprendizaje", "Cursos", "Universidad", "Conocimiento", "Autoeducacion", "EdTech", "Estudiantes"],
}

# Список API ключей для различных сервисов
API_KEYS = {
    "groq": os.getenv("GROQ_API_KEY", ""),
    "openrouter": os.getenv("OPENROUTER_API_KEY", ""),
    "google": os.getenv("GEMINI_API_KEY", os.getenv("GOOGLE_API_KEY", "")),
    "deepinfra": os.getenv("DEEPINFRA_API_KEY", ""),
    "deepseek": os.getenv("DEEPSEEK_API_KEY", ""),
    "huggingface": os.getenv("HUGGINGFACE_API_KEY", ""),
    "cohere": os.getenv("COHERE_API_KEY", ""),
    "sambanova": os.getenv("SAMBANOVA_API_KEY", ""),
    "cerebras": os.getenv("CEREBRAS_API_KEY", ""),
    "together": os.getenv("TOGETHER_API_KEY", ""),
}

API_MODELS = {
    "groq": os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"),
    "openrouter": os.getenv("OPENROUTER_MODEL", "openrouter/free"),
    "google": os.getenv("GEMINI_MODEL", "gemini-2.0-flash"),
    "deepinfra": os.getenv("DEEPINFRA_MODEL", "meta-llama/Llama-3.3-70B-Instruct"),
    "deepseek": os.getenv("DEEPSEEK_MODEL", "deepseek-chat"),
    "huggingface": os.getenv("HUGGINGFACE_MODEL", "mistralai/Mistral-7B-Instruct-v0.3"),
    "cohere": os.getenv("COHERE_MODEL", "command-r-plus"),
    "sambanova": os.getenv("SAMBANOVA_MODEL", "Meta-Llama-3.1-70B-Instruct"),
    "cerebras": os.getenv("CEREBRAS_MODEL", "llama-3.3-70b"),
    "together": os.getenv("TOGETHER_MODEL", "mistralai/Mixtral-8x7B-Instruct-v0.1"),
}

# URL для API сервисов
API_URLS = {
    "groq": "https://api.groq.com/openai/v1/chat/completions",
    "openrouter": "https://openrouter.ai/api/v1/chat/completions",
    "google": "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    "deepinfra": "https://api.deepinfra.com/v1/openai/chat/completions",
    "deepseek": "https://api.deepseek.com/v1/chat/completions",
    "cohere": "https://api.cohere.ai/v1/chat",
    "sambanova": "https://api.sambanova.ai/v1/chat/completions",
    "cerebras": "https://api.cerebras.ai/v1/chat/completions",
    "together": "https://api.together.xyz/v1/chat/completions",
}

# Хранилище для последних сгенерированных постов, чтобы избежать повторений
generated_posts_cache = {}

LANG_NAMES = {
    "ru": "Russian",
    "en": "English",
    "es": "Spanish",
}


def normalize_lang(lang: str) -> str:
    """Нормализация языка к поддерживаемым значениям."""
    lang_norm = (lang or "ru").strip().lower()
    return lang_norm if lang_norm in LANG_NAMES else "ru"

def contains_cyrillic(text: str) -> bool:
    """Проверяет наличие кириллицы."""
    return bool(re.search(r"[А-Яа-яЁё]", text or ""))

def is_text_allowed_for_lang(text: str, lang: str) -> bool:
    """Проверяет, что короткий текст/хештег не содержит символов чужого языка."""
    text = text or ""
    lang = normalize_lang(lang)
    if lang in {"en", "es"}:
        return not contains_cyrillic(text)
    if lang == "ru":
        # Для русского режима допускаем кириллицу и универсальные tech-слова вроде AI/Web3.
        return True
    return True

def get_topic_for_prompt(topic: str, lang: str) -> str:
    """Даёт модели тему как исходный ввод, но явно требует перевести её в целевой язык."""
    lang_name = LANG_NAMES[normalize_lang(lang)]
    return f"{topic} (understand this topic, but translate/adapt it into {lang_name} in the final post)"

def get_cache_key(topic: str, lang: str, platform: str):
    """Генерация уникального ключа для кэша"""
    return f"{topic}_{lang}_{platform}"

def is_post_in_cache(cache_key: str, text: str):
    """Проверка, есть ли пост в кэше"""
    if cache_key not in generated_posts_cache:
        return False
    return text in generated_posts_cache[cache_key]

def add_to_cache(cache_key: str, text: str):
    """Добавление поста в кэш"""
    if cache_key not in generated_posts_cache:
        generated_posts_cache[cache_key] = []
    generated_posts_cache[cache_key].append(text)

def get_random_variation(topic: str, lang: str, platform: str, max_attempts=5):
    """Генерация случайной вариации текста для уникальности"""
    lang = normalize_lang(lang)

    variations_by_lang = {
        "ru": [
            f"Почему {topic} изменит вашу жизнь уже завтра? Вот несколько причин:",
            f"Вы знали, что {topic} может помочь вам достичь {random.choice(['успеха', 'богатства', 'счастья', 'продуктивности'])}?",
            f"Секрет {topic}: как использовать его для {random.choice(['роста', 'развития', 'улучшения качества жизни'])}?",
            f"Необычные факты о {topic}, которые удивят вас!",
            f"Как {topic} может стать вашим главным помощником в {random.choice(['бизнесе', 'обучении', 'путешествиях'])}?",
            f"Современные тренды в {topic}: что ждать в ближайшем будущем?",
            f"Лучшие советы по {topic} от экспертов: как не ошибиться в выборе?",
            f"Мифы и реальность о {topic}: развенчиваем заблуждения!",
            f"Как начать заниматься {topic} с нуля: пошаговая инструкция",
            f"Интересные истории о том, как {topic} помог людям достичь невероятных результатов"
        ],
        "en": [
            f"Why {topic} might change your life by tomorrow — here is why:",
            f"Did you know {topic} can help you reach {random.choice(['success', 'wealth', 'happiness', 'productivity'])}?",
            f"The secret of {topic}: how to use it for {random.choice(['growth', 'self-improvement', 'better results'])}.",
            f"Unexpected facts about {topic} that will surprise you!",
            f"How {topic} can become your key advantage in {random.choice(['business', 'learning', 'travel'])}.",
            f"Latest trends in {topic}: what to expect next.",
            f"Top expert tips on {topic}: avoid common mistakes.",
            f"Myths vs reality in {topic}: what actually works?",
            f"How to start with {topic} from scratch: step-by-step guide.",
            f"Real stories of how {topic} helped people achieve amazing results."
        ],
        "es": [
            f"Por qué {topic} podría cambiar tu vida desde mañana: aquí tienes razones.",
            f"¿Sabías que {topic} puede ayudarte a lograr {random.choice(['éxito', 'prosperidad', 'felicidad', 'productividad'])}?",
            f"El secreto de {topic}: cómo usarlo para {random.choice(['crecer', 'mejorar', 'obtener mejores resultados'])}.",
            f"¡Datos sorprendentes sobre {topic} que te impactarán!",
            f"Cómo {topic} puede convertirse en tu mejor aliado en {random.choice(['negocios', 'aprendizaje', 'viajes'])}.",
            f"Tendencias actuales en {topic}: qué esperar en el futuro cercano.",
            f"Mejores consejos de expertos sobre {topic}: evita errores comunes.",
            f"Mitos y realidad sobre {topic}: ¿qué funciona de verdad?",
            f"Cómo empezar con {topic} desde cero: guía paso a paso.",
            f"Historias reales de cómo {topic} ayudó a personas a lograr resultados increíbles."
        ],
    }

    variations = variations_by_lang.get(lang, variations_by_lang["ru"])
    return random.choice(variations)

def get_topic_terms(topic: str) -> List[str]:
    """Выделяет значимые слова темы для проверки релевантности ответа."""
    words = re.findall(r"[\wА-Яа-яЁё]{3,}", (topic or "").lower(), flags=re.UNICODE)
    stop_words = {
        "про", "для", "как", "что", "это", "или", "and", "the", "for", "with", "about",
        "una", "uno", "para", "como", "que", "con", "sobre"
    }
    return [word for word in words if word not in stop_words]

def is_relevant_to_topic(text: str, topic: str) -> bool:
    """Проверяет, что сгенерированный текст явно связан с темой пользователя."""
    topic_terms = get_topic_terms(topic)
    if not topic_terms:
        return True

    text_lower = (text or "").lower()
    return any(term in text_lower for term in topic_terms)

def clean_ai_response(text: str) -> str:
    """Убирает служебные обёртки модели и оставляет только текст поста."""
    text = (text or "").strip()
    text = re.sub(r"^```(?:\w+)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    text = re.sub(r"^(post|tweet|answer|ответ|пост)\s*:\s*", "", text, flags=re.IGNORECASE)
    return text.strip().strip('"""')

def can_verify_topic_terms(topic: str, lang: str) -> bool:
    """Проверяет, можно ли валидировать релевантность простым совпадением слов темы."""
    lang = normalize_lang(lang)
    topic_cyrillic = contains_cyrillic(topic)
    # Сверяем слова темы только если они в том же алфавите, что и целевой язык поста.
    if lang == "ru":
        return topic_cyrillic
    if lang in {"en", "es"}:
        return not topic_cyrillic
    return True

def is_strictly_relevant_to_topic(text: str, topic: str, lang: str) -> bool:
    """Строгая, но безопасная проверка: не пропускает явно generic-текст, когда это можно проверить."""
    if not (text or "").strip():
        return False
    if can_verify_topic_terms(topic, lang):
        return is_relevant_to_topic(text, topic)
    return True

def trim_to_max_chars(text: str, max_chars: int) -> str:
    """Аккуратно обрезает текст под лимит символов."""
    if not max_chars or max_chars <= 0 or len(text) <= max_chars:
        return text

    trimmed = text[: max(0, max_chars - 1)].rstrip()
    if " " in trimmed:
        trimmed = trimmed.rsplit(" ", 1)[0]
    return trimmed.rstrip(".,;:!?—-") + "…"

def _openai_chat_completion(url: str, api_key: str, model: str, prompt: str, timeout: int = 20) -> Optional[str]:
    """Общий вызов OpenAI-совместимого chat/completions API."""
    if not api_key:
        return None
    try:
        response = requests.post(
            url,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.8,
                "max_tokens": 500,
            },
            timeout=timeout,
        )
        if response.status_code == 200:
            return response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
        logger.warning("API %s model=%s -> HTTP %s: %s", url, model, response.status_code, response.text[:200])
    except Exception as exc:
        logger.warning("API %s model=%s failed: %s", url, model, exc)
    return None


def call_groq(prompt: str) -> str:
    """Вызов Groq API с обработкой ошибок и запасными моделями."""
    models = [API_MODELS["groq"], "llama-3.3-70b-versatile", "llama-3.1-8b-instant"]
    seen = set()
    for model in models:
        if not model or model in seen:
            continue
        seen.add(model)
        result = _openai_chat_completion(API_URLS["groq"], API_KEYS["groq"], model, prompt)
        if result:
            return result
    return None

def build_viral_fallback_post(topic: str, lang: str, platform: str, max_chars: int, use_emojis: bool = False) -> str:
    """Создаёт тематичный вирусный пост без AI, если внешние API недоступны или дают слабый ответ."""
    lang = normalize_lang(lang)
    clean_topic = (topic or "эта тема").strip()

    templates_by_lang = {
        "ru": [
            "{topic} — это не просто тренд. Самое интересное начинается там, где большинство видит только шум: одна правильная идея может изменить результат уже сегодня. А вы как думаете?",
            "Все обсуждают {topic}, но почти никто не говорит о главном: здесь выигрывает не тот, кто знает больше, а тот, кто быстрее применяет. Сохрани, чтобы не забыть.",
            "Непопулярное мнение про {topic}: проблема не в сложности, а в том, что люди слишком поздно начинают действовать. Один маленький шаг сегодня может дать большой эффект завтра.",
            "Если вас интересует {topic}, запомните: вирусными становятся не сухие факты, а идеи, которые цепляют боль, мечту или любопытство. Что из этого ближе вам?",
            "{topic} может стать вашим преимуществом, если перестать смотреть на это как все. Найдите неожиданный угол, добавьте личный опыт — и люди начнут делиться."
        ],
        "en": [
            "{topic} is not just a trend. The real opportunity starts where most people only see noise: one sharp idea can change the outcome today. What do you think?",
            "Everyone talks about {topic}, but almost nobody says the key part: the winner is not who knows more, but who applies faster. Save this reminder.",
            "Unpopular opinion about {topic}: the problem is not complexity — it is waiting too long to act. One small move today can create a big shift tomorrow.",
            "If you care about {topic}, remember this: viral posts are not built on dry facts, but on pain, desire, or curiosity. Which one hits you most?",
            "{topic} can become your unfair advantage if you stop looking at it like everyone else. Find a fresh angle, add a real story, and people will share it."
        ],
        "es": [
            "{topic} no es solo una tendencia. La oportunidad real empieza donde la mayoría solo ve ruido: una buena idea puede cambiar el resultado hoy. ¿Qué opinas?",
            "Todos hablan de {topic}, pero casi nadie dice lo importante: no gana quien sabe más, sino quien aplica más rápido. Guarda este recordatorio.",
            "Opinión impopular sobre {topic}: el problema no es la dificultad, sino empezar demasiado tarde. Un paso pequeño hoy puede cambiar mucho mañana.",
            "Si te interesa {topic}, recuerda esto: lo viral no nace de datos fríos, sino de dolor, deseo o curiosidad. ¿Cuál te mueve más?",
            "{topic} puede ser tu ventaja si dejas de mirarlo como todos. Encuentra un ángulo nuevo, añade una historia real y la gente querrá compartirlo."
        ],
    }

    # Emoji-шаблоны для fallback
    emoji_templates_by_lang = {
        "ru": [
            "{topic} — это не просто тренд 🔥 Самое интересное начинается там, где большинство видит только шум 👀 Одна правильная идея может изменить результат уже сегодня 💡 А вы как думаете? 🤔",
            "Все обсуждают {topic}, но почти никто не говорит о главном 🧠 Здесь выигрывает не тот, кто знает больше, а тот, кто быстрее применяет ⚡ Сохрани, чтобы не забыть 📌",
            "Непопулярное мнение про {topic}: проблема не в сложности, а в том, что люди слишком поздно начинают действовать ⏰ Один маленький шаг сегодня — большой эффект завтра 🚀",
            "Если вас интересует {topic}, запомните: вирусными становятся не сухие факты, а идеи, которые цепляют боль, мечту или любопытство 🎯 Что из этого ближе вам? 💭",
            "{topic} может стать вашим преимуществом, если перестать смотреть на это как все 😎 Найдите неожиданный угол, добавьте личный опыт — и люди начнут делиться 📤"
        ],
        "en": [
            "{topic} is not just a trend 🔥 The real opportunity starts where most people only see noise 👀 One sharp idea can change the outcome today 💡 What do you think? 🤔",
            "Everyone talks about {topic}, but almost nobody says the key part 🧠 The winner is not who knows more, but who applies faster ⚡ Save this reminder 📌",
            "Unpopular opinion about {topic}: the problem is not complexity — it is waiting too long to act ⏰ One small move today can create a big shift tomorrow 🚀",
            "If you care about {topic}, remember this: viral posts are not built on dry facts, but on pain, desire, or curiosity 🎯 Which one hits you most? 💭",
            "{topic} can become your unfair advantage if you stop looking at it like everyone else 😎 Find a fresh angle, add a real story, and people will share it 📤"
        ],
        "es": [
            "{topic} no es solo una tendencia 🔥 La oportunidad real empieza donde la mayoría solo ve ruido 👀 Una buena idea puede cambiar el resultado hoy 💡 ¿Qué opinas? 🤔",
            "Todos hablan de {topic}, pero casi nadie dice lo importante 🧠 No gana quien sabe más, sino quien aplica más rápido ⚡ Guarda este recordatorio 📌",
            "Opinión impopular sobre {topic}: el problema no es la dificultad, sino empezar demasiado tarde ⏰ Un paso pequeño hoy puede cambiar mucho mañana 🚀",
            "Si te interesa {topic}, recuerda esto: lo viral no nace de datos fríos, sino de dolor, deseo o curiosidad 🎯 ¿Cuál te mueve más? 💭",
            "{topic} puede ser tu ventaja si dejas de mirarlo como todos 😎 Encuentra un ángulo nuevo, añade una historia real y la gente querrá compartirlo 📤"
        ],
    }

    source = emoji_templates_by_lang if use_emojis else templates_by_lang
    text = random.choice(source[lang]).format(topic=clean_topic)
    return trim_to_max_chars(text, max_chars)

def call_openrouter(prompt: str) -> str:
    """Вызов OpenRouter API с обработкой ошибок и запасными моделями."""
    models = [
        API_MODELS["openrouter"],
        "openrouter/free",
        "meta-llama/llama-3.3-70b-instruct:free",
        "meta-llama/llama-3.2-3b-instruct:free",
    ]
    seen = set()
    for model in models:
        if not model or model in seen:
            continue
        seen.add(model)
        result = _openai_chat_completion(API_URLS["openrouter"], API_KEYS["openrouter"], model, prompt)
        if result:
            return result
    return None

def call_google(prompt: str) -> str:
    """Вызов Google AI API с обработкой ошибок"""
    try:
        if not API_KEYS["google"]:
            return None
        headers = {
            "Content-Type": "application/json"
        }
        data = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{API_MODELS['google']}:generateContent?key={API_KEYS['google']}"
        response = requests.post(url, headers=headers, json=data, timeout=15)
        if response.status_code == 200:
            return response.json().get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
        logger.warning("Gemini model=%s -> HTTP %s: %s", API_MODELS["google"], response.status_code, response.text[:200])
    except Exception as exc:
        logger.warning("Gemini failed: %s", exc)
        return None

def call_deepinfra(prompt: str) -> str:
    """Вызов DeepInfra API с обработкой ошибок (OpenAI-совместимый)"""
    try:
        if not API_KEYS["deepinfra"]:
            return None
        headers = {
            "Authorization": f"Bearer {API_KEYS['deepinfra']}",
            "Content-Type": "application/json",
        }
        data = {
            "model": API_MODELS["deepinfra"],
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.8,
            "max_tokens": 500,
        }
        response = requests.post(API_URLS["deepinfra"], headers=headers, json=data, timeout=15)
        if response.status_code == 200:
            return response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
    except Exception:
        return None
    return None

def call_huggingface(prompt: str) -> str:
    """Вызов HuggingFace Inference API с обработкой ошибок"""
    try:
        if not API_KEYS["huggingface"]:
            return None
        headers = {
            "Authorization": f"Bearer {API_KEYS['huggingface']}",
            "Content-Type": "application/json",
        }
        data = {
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": 500,
                "temperature": 0.8,
                "return_full_text": False,
            }
        }
        response = requests.post(
            f"https://api-inference.huggingface.co/models/{API_MODELS['huggingface']}",
            headers=headers, json=data, timeout=15
        )
        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list) and len(result) > 0:
                return result[0].get("generated_text", "")
            if isinstance(result, dict):
                return result.get("generated_text", "")
    except Exception:
        return None
    return None

def call_deepseek(prompt: str) -> str:
    """Вызов DeepSeek API с обработкой ошибок"""
    try:
        if not API_KEYS.get("deepseek"):
            return None
        headers = {
            "Authorization": f"Bearer {API_KEYS['deepseek']}",
            "Content-Type": "application/json",
        }
        data = {
            "model": API_MODELS["deepseek"],
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.8,
            "max_tokens": 500,
        }
        response = requests.post(
            "https://api.deepseek.com/v1/chat/completions",
            headers=headers, json=data, timeout=15
        )
        if response.status_code == 200:
            return response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
    except Exception:
        return None
    return None

def call_cohere(prompt: str) -> str:
    """Вызов Cohere API с обработкой ошибок"""
    try:
        if not API_KEYS["cohere"]:
            return None
        headers = {
            "Authorization": f"Bearer {API_KEYS['cohere']}",
            "Content-Type": "application/json",
        }
        data = {
            "model": API_MODELS["cohere"],
            "message": prompt,
            "temperature": 0.8,
            "max_tokens": 500,
        }
        response = requests.post(API_URLS["cohere"], headers=headers, json=data, timeout=15)
        if response.status_code == 200:
            return response.json().get("text", "")
    except Exception:
        return None
    return None

def call_sambanova(prompt: str) -> str:
    """Вызов Sambanova API с обработкой ошибок"""
    try:
        if not API_KEYS["sambanova"]:
            return None
        headers = {
            "Authorization": f"Bearer {API_KEYS['sambanova']}",
            "Content-Type": "application/json",
        }
        data = {
            "model": API_MODELS["sambanova"],
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.8,
            "max_tokens": 500,
        }
        response = requests.post(API_URLS["sambanova"], headers=headers, json=data, timeout=15)
        if response.status_code == 200:
            return response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
    except Exception:
        return None
    return None

def call_cerebras(prompt: str) -> str:
    """Вызов Cerebras API с обработкой ошибок"""
    try:
        if not API_KEYS["cerebras"]:
            return None
        headers = {
            "Authorization": f"Bearer {API_KEYS['cerebras']}",
            "Content-Type": "application/json",
        }
        data = {
            "model": API_MODELS["cerebras"],
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.8,
            "max_tokens": 500,
        }
        response = requests.post(API_URLS["cerebras"], headers=headers, json=data, timeout=15)
        if response.status_code == 200:
            return response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
    except Exception:
        return None
    return None

def call_together(prompt: str) -> str:
    """Вызов Together API с обработкой ошибок"""
    try:
        if not API_KEYS["together"]:
            return None
        headers = {
            "Authorization": f"Bearer {API_KEYS['together']}",
            "Content-Type": "application/json",
        }
        data = {
            "model": API_MODELS["together"],
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.8,
            "max_tokens": 500,
        }
        response = requests.post(API_URLS["together"], headers=headers, json=data, timeout=15)
        if response.status_code == 200:
            return response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
    except Exception:
        return None
    return None

def generate_text(prompt: str, topic: str, lang: str, platform: str) -> str:
    """Генерация текста с использованием доступных API и проверкой уникальности"""
    lang = normalize_lang(lang)
    cache_key = get_cache_key(topic, lang, platform)
    attempts = 0
    max_attempts = 5

    while attempts < max_attempts:
        # Проверяем все доступные провайдеры (OpenRouter временно отключен из-за перегрузки)
        for provider_name, provider_call in [
            ("groq", call_groq),
            ("gemini", call_google),
            ("deepinfra", call_deepinfra),
            ("deepseek", call_deepseek),
            ("huggingface", call_huggingface),
            ("cohere", call_cohere),
            ("sambanova", call_sambanova),
            ("cerebras", call_cerebras),
            ("together", call_together),
            ("openrouter", call_openrouter),
        ]:
            result = provider_call(prompt)
            if result:
                result = result.strip()
                result = clean_ai_response(result)
                if is_relevant_to_topic(result, topic) and not is_post_in_cache(cache_key, result):
                    add_to_cache(cache_key, result)
                    return result

        attempts += 1
        prompt = get_random_variation(topic, lang, platform) + "\n\n" + prompt

    fallback_texts_by_lang = {
        "ru": [
            f"Интересный пост о {topic} для {platform}. {random.choice(['Узнайте больше!', 'Это изменит вашу жизнь!', 'Не пропустите!'])}",
            f"Сегодня мы поговорим о {topic}. {random.choice(['Откройте для себя новые возможности!', 'Узнайте секреты успеха!', 'Начните действовать уже сейчас!'])}",
            f"Как {topic} может помочь вам достичь {random.choice(['успеха', 'богатства', 'счастья'])}? Вот несколько идей:",
            f"Необычные факты о {topic}, которые вы, возможно, не знали:",
            f"Современные тренды в {topic} и как их использовать на практике:",
            f"Почему {topic} так важен в {random.choice(['современном мире', 'нашем обществе', 'вашей жизни'])}?",
            f"Советы экспертов по {topic}: как не ошибиться в выборе и достичь результатов:",
            f"Истории успеха: как люди использовали {topic} для достижения своих целей:",
            f"Мифы и правда о {topic}: что действительно работает, а что нет?",
            f"Начните свой путь в {topic} с этих простых шагов:",
        ],
        "en": [
            f"An interesting post about {topic} for {platform}. " + random.choice(['Learn more!', "This might change your life!", "Don't miss it!"]),
            f"Today we talk about {topic}. " + random.choice(['Discover new opportunities!', 'Learn key success tips!', 'Start taking action now!']),
            f"How can {topic} help you achieve " + random.choice(['success', 'wealth', 'happiness']) + "? Here are a few ideas:",
            f"Unexpected facts about {topic} you may not know:",
            f"Current trends in {topic} and how to apply them:",
            f"Why is {topic} so important in " + random.choice(['the modern world', 'our society', 'your life']) + "?",
            f"Expert advice on {topic}: avoid mistakes and get results:",
            f"Success stories: how people used {topic} to reach their goals:",
            f"Myths and truth about {topic}: what really works and what does not?",
            f"Start your journey in {topic} with these simple steps:",
        ],
        "es": [
            f"Una publicaci\u00f3n interesante sobre {topic} para {platform}. " + random.choice(['\u00a1Descubre m\u00e1s!', '\u00a1Esto podr\u00eda cambiar tu vida!', '\u00a1No te lo pierdas!']),
            f"Hoy hablamos de {topic}. " + random.choice(['\u00a1Descubre nuevas oportunidades!', '\u00a1Conoce claves para el \u00e9xito!', '\u00a1Empieza a actuar ahora!']),
            f"\u00bfC\u00f3mo puede {topic} ayudarte a lograr " + random.choice(['\u00e9xito', 'prosperidad', 'felicidad']) + "? Aqu\u00ed tienes algunas ideas:",
            f"Datos sorprendentes sobre {topic} que quiz\u00e1 no conoc\u00edas:",
            f"Tendencias actuales en {topic} y c\u00f3mo aplicarlas:",
            f"\u00bfPor qu\u00e9 {topic} es tan importante en " + random.choice(['el mundo moderno', 'nuestra sociedad', 'tu vida']) + "?",
            f"Consejos de expertos sobre {topic}: evita errores y consigue resultados:",
            f"Historias de \u00e9xito: c\u00f3mo las personas usaron {topic} para alcanzar sus metas:",
            f"Mitos y verdades sobre {topic}: \u00bfqu\u00e9 funciona realmente y qu\u00e9 no?",
            f"Empieza tu camino en {topic} con estos pasos sencillos:",
        ],
    }
    fallback_texts = fallback_texts_by_lang[lang]
    fallback_text = random.choice(fallback_texts)
    if not is_post_in_cache(cache_key, fallback_text):
        add_to_cache(cache_key, fallback_text)
    return fallback_text

def generate_ai_post_text(prompt: str, topic: str, lang: str, platform: str, max_chars: int) -> Optional[Dict[str, str]]:
    """Генерирует пост только через нейросеть. Fallback-шаблоны здесь запрещены."""
    lang = normalize_lang(lang)
    cache_key = get_cache_key(topic, lang, platform)
    # Все доступные провайдеры — порядок обхода (полный список всех API)
    providers = [
        ("groq", call_groq),
        ("openrouter", call_openrouter),
        ("gemini", call_google),
        ("deepinfra", call_deepinfra),
        ("deepseek", call_deepseek),
        ("huggingface", call_huggingface),
        ("cohere", call_cohere),
        ("sambanova", call_sambanova),
        ("cerebras", call_cerebras),
        ("together", call_together),
    ]

    for attempt in range(3):
        # Добавляем строгой инструкции прямо в промпт для каждого подхода
        enhanced_prompt = prompt + f"\n\n[ATTEMPT {attempt + 1}/3] — Remember: post must be STRICTLY about user topic and contain its specific keywords. No generic filler."
        for provider_name, provider_call in providers:
            result = provider_call(enhanced_prompt)
            if not result:
                continue

            result = trim_to_max_chars(clean_ai_response(result), max_chars)
            if (
                result
                and len(result) <= max_chars
                and is_strictly_relevant_to_topic(result, topic, lang)
                and not is_post_in_cache(cache_key, result)
            ):
                add_to_cache(cache_key, result)
                return {"text": result, "model": provider_name}

    return None

def generate_clickbait(topic: str, lang: str) -> Dict:
    """Генерация кликбейтного заголовка"""
    lang = normalize_lang(lang)
    lang_name = LANG_NAMES[lang]

    prompt_topic = get_topic_for_prompt(topic, lang)

    prompt = f"""
    Create one clickbait headline about "{prompt_topic}".
    Language requirement: output must be ONLY in {lang_name}.
    Strict rule: translate/adapt the topic into {lang_name}; do not copy source-language words.
    Do not use words, hashtags, or phrases from any other language.

    Requirements:
    1. Exciting and intriguing
    2. Emotional tone
    3. Short and punchy
    4. Include topic-related keywords

    Return only the headline without any additional comments.
    """
    text = generate_text(prompt, topic, lang, "twitter")
    fallback_by_lang = {
        "ru": f"Секрет успеха в {topic} — узнайте правду!",
        "en": f"The hidden truth about {topic} you need to know now!",
        "es": f"¡La verdad oculta sobre {topic} que debes conocer ahora!",
    }
    return {"title": text if text else fallback_by_lang[lang]}

def _ai_hashtags(topic: str, post_text: str, lang: str) -> Optional[List[str]]:
    """Запрашивает у AI популярные хештеги по теме поста (7–10 шт)."""
    lang = normalize_lang(lang)
    lang_name = LANG_NAMES[lang]

    prompt = f"""
    Generate 7-10 popular, trending, high-search-volume hashtags for a social media post.
    Topic: "{topic}"
    Post text: "{post_text}"
    Language: {lang_name} only.
    Rules:
    - Hashtags must be popular keywords that people actually search for, NOT generic filler words from the post.
    - They must be directly relevant to the topic.
    - Each hashtag must be a single word or a CamelCase phrase (no spaces).
    - Mix broad-topic hashtags with niche-specific ones.
    - Return ONLY the hashtags, one per line, without the '#' symbol.
    - Do NOT number them, do NOT add explanations.
    """
    for provider_name, provider_call in [
        ("groq", call_groq),
        ("openrouter", call_openrouter),
        ("gemini", call_google),
        ("deepinfra", call_deepinfra),
        ("deepseek", call_deepseek),
        ("together", call_together),
    ]:
        result = provider_call(prompt)
        if not result:
            continue
        result = clean_ai_response(result)
        # Парсим строки, убираем пустые и цифры-пункты
        lines = []
        for line in result.splitlines():
            line = line.strip().lstrip("#").strip()
            # Убираем нумерацию в начале строки типа "1. Word" или "1) Word"
            line = re.sub(r"^\d+[\.\)]\s*", "", line)
            if line and len(line) >= 3:
                lines.append(line)
        if lines:
            return lines[:10]
    return None


def generate_hashtags(topic: str, lang: str, post_text: str = "") -> List[str]:
    """Генерация хештегов: AI → словарь темы → fallback."""
    lang = normalize_lang(lang)
    topic_lower = topic.lower()
    seen = set()

    def safe_add(kw: str) -> None:
        kw_lower = kw.lower()
        if kw_lower not in seen and is_text_allowed_for_lang(kw, lang) and len(kw) >= 3:
            seen.add(kw_lower)

    keywords: List[str] = []

    # === 1. AI-хештеги (приоритет) ===
    if post_text:
        ai_tags = _ai_hashtags(topic, post_text, lang)
        if ai_tags:
            for tag in ai_tags:
                # Форматируем: первая буква заглавная, остальные строчные (CamelCase)
                formatted = tag.strip().replace(" ", "")
                if formatted:
                    safe_add(formatted)
                    keywords.append(formatted)
            if len(keywords) >= 5:
                return ["#" + kw for kw in keywords[:7]]

    # === 2. Хештег из темы пользователя ===
    topic_hashtag = topic.replace(" ", "").replace("ё", "е").replace("ъ", "ь")[:25].capitalize()
    if topic_hashtag and topic_hashtag.lower() not in seen:
        keywords.append(topic_hashtag)
        seen.add(topic_hashtag.lower())

    # === 3. Словарь популярных ключевых слов по теме (main source) ===
    # Ищем совпадение темы в словарях
    keyword_dict = target_keywords_ru if lang == "ru" else (target_keywords_es if lang == "es" else target_keywords_en)
    for key, kws in keyword_dict.items():
        if key in topic_lower:
            for kw in kws:
                if kw.lower() not in seen:
                    keywords.append(kw)
                    seen.add(kw.lower())
            break

    # Дополнительно: проверяем словари всех языков
    for check_dict in [target_keywords_ru, target_keywords_en, target_keywords_es]:
        for key, kws in check_dict.items():
            if key in topic_lower:
                for kw in kws:
                    if kw.lower() not in seen:
                        keywords.append(kw)
                        seen.add(kw.lower())

    # === 4. Значимые слова из текста поста (только если мало хештегов) ===
    if len(keywords) < 4 and post_text:
        post_words = re.findall(r"[\wА-Яа-яЁё]{5,}", post_text.lower(), flags=re.UNICODE)
        stop_words = {
            "про", "для", "как", "что", "это", "или", "and", "the", "for", "with", "about",
            "una", "uno", "para", "como", "que", "con", "sobre", "вот", "уже", "быть",
            "этот", "эти", "его", "их", "мы", "вы", "они", "он", "она", "кто",
            "все", "нет", "ещё", "только", "когда", "даже", "чтобы",
            "может", "очень", "более", "самый", "которая", "который", "которые",
        }
        for word in post_words:
            if word not in stop_words and word.isalpha():
                formatted = word[0].upper() + word[1:]
                if formatted.lower() not in seen:
                    keywords.append(formatted)
                    seen.add(formatted.lower())

    # === 5. Fallback: разбиваем тему на слова ===
    if len(keywords) < 3:
        topic_words = re.findall(r"[\wА-Яа-яЁё]{4,}", topic_lower, flags=re.UNICODE)
        for word in topic_words:
            formatted = word[0].upper() + word[1:]
            if formatted.lower() not in seen:
                keywords.append(formatted)
                seen.add(formatted.lower())

    return ["#" + kw for kw in keywords[:7]]

def generate_viral_post(topic: str, lang: str, platform: str, max_chars: int, use_emojis: bool = False) -> Dict:
    """Генерация вирусного поста для социальных сетей"""
    lang = normalize_lang(lang)
    lang_name = LANG_NAMES[lang]
    clean_topic = (topic or "").strip()
    if not clean_topic:
        return {"error": "Тема обязательна для генерации поста нейросетью.", "text": "", "model": "none"}

    prompt_topic = get_topic_for_prompt(topic, lang)
    variation = get_random_variation(clean_topic, lang, platform)

    emoji_instruction = ""
    if use_emojis:
        emoji_instruction = """
    EMOJI MODE: Naturally sprinkle relevant emojis throughout the post (1-3 per sentence).
    Place emojis at natural breaks — end of sentences, after key points, or to emphasize emotions.
    Keep it tasteful and native to the platform. Do not overuse.
    """

    prompt = f"""
    You are an expert viral social media copywriter.
    Create exactly ONE potentially viral, interesting post that is STRICTLY and ONLY about the user's topic.

    User topic: {prompt_topic}
    Original user topic: {clean_topic}
    Platform: {platform}
    Language requirement: output must be ONLY in {lang_name}.
    Strict rule: translate/adapt the topic into {lang_name}; do not copy source-language words.
    Do not use words, hashtags, or phrases from any other language.
    Hashtags are generated separately, so do not include hashtags in the post text.
    Relevance rule: the post must clearly mention, explain, or use the exact topic meaning. Do not write generic motivation.
    Topic lock: every sentence must support the topic "{clean_topic}". If a sentence could fit any topic, remove it.
    Suggested angle to keep relevance: {variation}
{emoji_instruction}
    Create a post that is:
    1. Built around a strong hook in the first sentence
    2. Specific to the topic, with a concrete insight, tension, benefit, or surprising angle
    3. Emotionally engaging and likely to make people comment, save, or share
    4. Natural for {platform}, without clickbait lies or exaggerated fake claims
    5. Written in complete sentences

    The post must be no longer than {max_chars} characters.

    Return only the post text without additional comments.
    """

    # Резервируем ~60 символов под хештеги (2 перевода строки + хештеги)
    max_chars_for_ai = max(50, max_chars - 60)
    ai_result = generate_ai_post_text(prompt, clean_topic, lang, platform, max_chars_for_ai)
    if not ai_result:
        text = build_viral_fallback_post(clean_topic, lang, platform, max_chars_for_ai, use_emojis=use_emojis)
        hashtags = generate_hashtags(topic, lang)
        hashtags_string = " ".join(hashtags)
        return {
            "text": text,
            "hashtags": hashtags,
            "hashtags_string": hashtags_string,
            "model": "fallback",
            "warning": "AI API недоступен или не дал валидный ответ, использован локальный fallback.",
            "virality": {
                "score": random.randint(30, 75),
                "label": "Fallback-оценка",
                "reasons": [
                    "Тематичный шаблон",
                    "Подходящая длина",
                    "Релевантные хештеги"
                ]
            }
        }

    text = ai_result["text"]

    hashtags = generate_hashtags(topic, lang, text)
    hashtags_string = " ".join(hashtags)

    return {
        "text": text,
        "hashtags": hashtags,
        "hashtags_string": hashtags_string,
        "model": ai_result["model"],
        "virality": {
            "score": random.randint(30, 95),
            "label": "Вероятность виральности",
            "reasons": [
                "Релевантные хештеги",
                "Интересный контент",
                "Подходящая длина",
                "Эмоциональная вовлеченность"
            ]
        }
    }