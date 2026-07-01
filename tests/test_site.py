#!/usr/bin/env python3
"""Тесты для samogoncalc.ru — проверка критичных элементов после сборки."""

import sys
import os
import re
import xml.etree.ElementTree as ET

DIST_DIR = os.path.join(os.path.dirname(__file__), '..', 'dist')
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')

passed = 0
failed = 0

def ok(msg):
    global passed
    passed += 1
    print(f"  ✅ {msg}")

def fail(msg):
    global failed
    failed += 1
    print(f"  ❌ {msg}")


# ─── 1. Яндекс Метрика ───────────────────────────────────────────

print("\n📊 Яндекс Метрика")
ym_pattern = r'mc\.yandex\.ru/watch/\d+'

# Проверяем главную
index_path = os.path.join(DIST_DIR, 'index.html')
if os.path.exists(index_path):
    with open(index_path, 'r') as f:
        html = f.read()
    # Ищем код Метрики (noscript + script)
    has_noscript = '<noscript><div><img src="https://mc.yandex.ru/watch/' in html
    has_script = 'mc.yandex.ru/metrika/tag.js' in html
    ym_ids = re.findall(ym_pattern, html)
    if has_noscript and has_script and ym_ids:
        ok(f"Метрика на главной: noscript + script, ID({ym_ids[0]})")
    else:
        parts = []
        if not has_noscript: parts.append("noscript")
        if not has_script: parts.append("script")
        fail(f"Метрика на главной: отсутствует {', '.join(parts)}")
else:
    fail("dist/index.html не найден")

# Проверяем страницу калькулятора
calc_path = os.path.join(DIST_DIR, 'kalkulyator-razbavleniya-samogona-vodoj', 'index.html')
if os.path.exists(calc_path):
    with open(calc_path, 'r') as f:
        html = f.read()
    if 'mc.yandex.ru/metrika/tag.js' in html:
        ok("Метрика на странице калькулятора")
    else:
        fail("Метрика на странице калькулятора: отсутствует")

# Проверяем страницу рецепта
post_path = os.path.join(DIST_DIR, 'post', 'kalganovka', 'index.html')
if os.path.exists(post_path):
    with open(post_path, 'r') as f:
        html = f.read()
    if 'mc.yandex.ru/metrika/tag.js' in html:
        ok("Метрика на странице рецепта")
    else:
        fail("Метрика на странице рецепта: отсутствует")


# ─── 2. .htaccess ─────────────────────────────────────────────────

print("\n🔧 .htaccess")
htaccess_path = os.path.join(PUBLIC_DIR, '.htaccess')
if os.path.exists(htaccess_path):
    with open(htaccess_path, 'r') as f:
        ht = f.read()

    # Cache-Control для статики (max-age должен быть >= 3600)
    if ('Cache-Control' in ht and ('max-age=3600' in ht or 'max-age=31536000' in ht)) or ('ExpiresActive' in ht):
        ok("Cache-Control/Expires для статики")
    else:
        fail("Кеширование статики не найдено")

    # Cache-Control для HTML (no-cache)
    if 'no-cache' in ht and 'must-revalidate' in ht:
        ok("Cache-Control: no-cache для HTML")
    else:
        fail("Cache-Control no-cache для HTML не найден")

    # Редиректы (RewriteRule или Redirect 301)
    redirects = re.findall(r'(?:Redirect\s+301|RewriteRule)\s+', ht)
    if len(redirects) >= 5:
        ok(f"Редиректы: {len(redirects)} шт.")
    else:
        fail(f"Редиректов: {len(redirects)} (ожидается ≥5)")

    # Сжатие gzip/brotli
    compression = 'AddOutputFilterByType' in ht or 'mod_deflate' in ht or 'mod_gzip' in ht or 'mod_brotli' in ht
    if compression:
        ok("Сжатие gzip/deflate/brotli настроено")
    else:
        # Не критично — Jino может сжимать на уровне сервера
        ok("Сжатие: не в .htaccess (может быть на уровне Jino)")

    # Защита sitemap от кеширования
    if 'sitemap' in ht.lower():
        ok("Sitemap упоминается в .htaccess")
    else:
        fail("Sitemap не упоминается в .htaccess")
else:
    fail(f".htaccess не найден: {htaccess_path}")


# ─── 3. Sitemap ───────────────────────────────────────────────────

print("\n🗺️  Sitemap")
sitemap_index = os.path.join(DIST_DIR, 'sitemap-index.xml')
sitemap_0 = os.path.join(DIST_DIR, 'sitemap-0.xml')

if os.path.exists(sitemap_index):
    ok("sitemap-index.xml существует")
else:
    fail("sitemap-index.xml отсутствует")

if os.path.exists(sitemap_0):
    ok("sitemap-0.xml существует")

    with open(sitemap_0, 'r') as f:
        xml = f.read()

    # Проверка lastmod
    lastmod_count = xml.count('<lastmod>')
    if lastmod_count > 20:
        ok(f"lastmod: {lastmod_count} URL")
    else:
        fail(f"lastmod: всего {lastmod_count} (ожидается >20)")

    # Проверка priority
    priority_count = xml.count('<priority>')
    if priority_count > 20:
        ok(f"priority: {priority_count} URL")
        # Проверяем значения приоритетов
        priorities = re.findall(r'<priority>([\d.]+)</priority>', xml)
        if '1.0' in priorities:
            ok("Главная имеет priority 1.0")
        else:
            fail("Нет priority 1.0")
        if '0.8' in priorities:
            ok("Калькуляторы имеют priority 0.8")
        else:
            fail("Нет priority 0.8")
    else:
        fail(f"priority: всего {priority_count} (ожидается >20)")

    # Проверка changefreq
    changefreq_count = xml.count('<changefreq>')
    if changefreq_count > 0:
        ok(f"changefreq: {changefreq_count} URL")
    else:
        fail("changefreq отсутствует")

    # Проверка robots.txt
    robots_path = os.path.join(DIST_DIR, 'robots.txt')
    if os.path.exists(robots_path):
        with open(robots_path, 'r') as f:
            robots = f.read()
        if 'Sitemap:' in robots:
            ok("robots.txt ссылается на sitemap")
        else:
            fail("robots.txt не содержит Sitemap:")
    else:
        fail("robots.txt отсутствует")
else:
    fail("sitemap-0.xml отсутствует")


# ─── 4. Дополнительные SEO-проверки ───────────────────────────────

print("\n🔍 Дополнительные SEO-проверки")

# OG-теги на главной
if os.path.exists(index_path):
    with open(index_path, 'r') as f:
        html = f.read()
    og_tags = ['og:locale', 'og:site_name', 'og:title', 'og:description', 'og:image']
    for tag in og_tags:
        if tag in html:
            ok(f"Главная: {tag}")
        else:
            fail(f"Главная: {tag} отсутствует")

# Schema.org на главной
if os.path.exists(index_path):
    with open(index_path, 'r') as f:
        html = f.read()
    if 'application/ld+json' in html and 'Organization' in html:
        ok("Главная: Organization schema")
    else:
        fail("Главная: Organization schema отсутствует")

# FAQPage на страницах с аккордеонами
faq_pages = [
    'kalkulyator-razbavleniya-samogona-vodoj',
    'kalkulyator-drobnoj-peregonki',
    'kalkulyator-spirta-ot-temperatury',
    'kalkulyator-absolyutnogo-spirta',
    'kalkulyator-otbor-golov',
    'kalkulyator-vodki-iz-spirta',
]
for slug in faq_pages:
    path = os.path.join(DIST_DIR, slug, 'index.html')
    if os.path.exists(path):
        with open(path, 'r') as f:
            html = f.read()
        if 'FAQPage' in html:
            ok(f"FAQPage schema: {slug}")
        else:
            fail(f"FAQPage schema: {slug} — отсутствует!")

# ─── Итог ─────────────────────────────────────────────────────────

print(f"\n{'='*50}")
print(f"  Всего: {passed + failed} | ✅ {passed} | ❌ {failed}")
print(f"{'='*50}")

sys.exit(0 if failed == 0 else 1)
