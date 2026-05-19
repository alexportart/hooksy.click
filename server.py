"""
Hooksy.click — веб-сервер
Генерирует вирусные посты для соцсетей через AI (Groq / Gemini / OpenRouter)
"""
from pathlib import Path

from flask import Flask, jsonify, request, send_file, send_from_directory
from flask_cors import CORS

from ai_provider import generate_clickbait, generate_viral_post

BASE_DIR = Path(__file__).parent
DIST_DIR = BASE_DIR / "dist"
PUBLIC_DIR = BASE_DIR / "public"
SITE_URL = "https://hooksy.click"

app = Flask(__name__)
CORS(app)


@app.route("/api/generate", methods=["POST"])
def api_generate():
    """Генерация вирусного заголовка через AI"""
    data = request.get_json(silent=True) or {}
    topic = data.get("topic", "")
    lang = data.get("lang", "ru")

    result = generate_clickbait(topic=topic, lang=lang)

    return jsonify({"success": True, **result})


@app.route("/api/generate-post", methods=["POST"])
def api_generate_post():
    """Генерация вирусного поста для соцсетей"""
    data = request.get_json(silent=True) or {}
    topic = data.get("topic", "")
    lang = data.get("lang", "ru")
    platform = data.get("platform", "twitter")
    max_chars = data.get("max_chars", 280)

    use_emojis = data.get("use_emojis", False)

    result = generate_viral_post(topic=topic, lang=lang, platform=platform, max_chars=max_chars, use_emojis=use_emojis)

    if result.get("error"):
        return jsonify({"success": False, **result}), 422

    return jsonify({"success": True, **result})


@app.route("/sitemap.xml")
def sitemap():
    """SEO sitemap для поисковых систем"""
    from flask import Response
    from datetime import date

    today = date.today().isoformat()
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{SITE_URL}/</loc>
        <lastmod>{today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>"""
    return Response(xml, mimetype="application/xml")


@app.route("/robots.txt")
def robots():
    """SEO robots.txt для поисковых систем"""
    from flask import Response

    txt = f"""User-agent: *
Allow: /
Sitemap: {SITE_URL}/sitemap.xml
"""
    return Response(txt, mimetype="text/plain")


@app.route("/api/health", methods=["GET"])
def api_health():
    """Проверка здоровья сервера"""
    return jsonify({"status": "ok", "app": "Hooksy.click"})


@app.route("/social-icons.js")
def social_icons_js():
    """Иконки соцсетей для фронтенда"""
    return send_file(BASE_DIR / "social-icons.js", mimetype="application/javascript")


def _dist_file(rel_path: str):
    path = DIST_DIR / rel_path
    return path if path.is_file() else None


@app.route("/")
def index():
    """Главная страница — production build из dist/ или Vite index.html"""
    built = _dist_file("index.html")
    if built:
        return send_file(built)
    return send_file(BASE_DIR / "index.html")


@app.route("/assets/<path:filename>")
def dist_assets(filename):
    """Статика Vite build"""
    assets_dir = DIST_DIR / "assets"
    if (assets_dir / filename).is_file():
        return send_from_directory(assets_dir, filename)
    return jsonify({"error": "not found"}), 404


@app.route("/<path:filename>")
def public_static(filename):
    """favicon, logo и прочие файлы из dist/ или public/"""
    if filename.startswith("api/"):
        return jsonify({"error": "not found"}), 404

    for folder in (DIST_DIR, PUBLIC_DIR):
        path = folder / filename
        if path.is_file():
            return send_file(path)

    built_index = _dist_file("index.html")
    if built_index and "." not in filename:
        return send_file(built_index)

    return jsonify({"error": "not found"}), 404


if __name__ == "__main__":
    from config import SERVER_HOST, SERVER_PORT

    print(f"Hooksy.click запущен на http://{SERVER_HOST}:{SERVER_PORT}")
    print(f"Открой в браузере: http://localhost:{SERVER_PORT}")
    print("Для dev UI: npm run dev (прокси /api → Flask)")
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=True)
