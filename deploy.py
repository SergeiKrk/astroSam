#!/usr/bin/env python3
"""Деплой astroSam на jino.ru через FTPS + PHP-распаковщик."""

import os
import sys
import io
import zipfile
import subprocess
from ftplib import FTP_TLS

FTP_HOST = "ksv-ulru.myjino.ru"
FTP_PORT = 21
FTP_USER = "ksv-ulru_samogoncalc"
FTP_PASS = "SJ49Qs5e_7JW"

PROJECT_DIR = "/home/ai/DevWebApps/astroSam"
DIST_DIR = os.path.join(PROJECT_DIR, "dist")
ZIP_PATH = os.path.join(PROJECT_DIR, "dist.zip")

UNZIP_PHP = """<?php
// Удаляем index.html чтобы гарантировать перезапись
if (file_exists('index.html')) {
    unlink('index.html');
}

$zip = new ZipArchive;
if ($zip->open('dist.zip') === TRUE) {
    $zip->extractTo('.');
    $zip->close();
    unlink('dist.zip');
    unlink(__FILE__);
    echo 'OK';
} else {
    http_response_code(500);
    echo 'FAIL: cannot open dist.zip';
}
"""

def run(cmd, cwd=PROJECT_DIR):
    print(f"  ⚡ {cmd}")
    r = subprocess.run(cmd, shell=True, cwd=cwd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"  ❌ {r.stderr.strip()}")
        sys.exit(1)


def build():
    print("📦 Сборка...")
    run("npm run build")
    print("  ✅ OK")


def zip_dist():
    print("🗜️  dist.zip...")
    if os.path.exists(ZIP_PATH):
        os.remove(ZIP_PATH)
    with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(DIST_DIR):
            for f in files:
                fp = os.path.join(root, f)
                arcname = os.path.relpath(fp, DIST_DIR)
                zf.write(fp, arcname)
    mb = os.path.getsize(ZIP_PATH) / (1024*1024)
    print(f"  ✅ {mb:.1f} MB")


def ftp_upload():
    print("📤 FTP загрузка...")
    ftp = FTP_TLS()
    ftp.connect(FTP_HOST, FTP_PORT, timeout=60)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.prot_p()

    # Загружаем dist.zip
    size_mb = os.path.getsize(ZIP_PATH) / (1024*1024)
    print(f"  Загружаю dist.zip ({size_mb:.1f} MB)...")
    with open(ZIP_PATH, 'rb') as f:
        ftp.storbinary('STOR dist.zip', f, callback=lambda b: None)
    print("  ✅ dist.zip")

    # Загружаем распаковщик
    ftp.storbinary('STOR unzip.php', io.BytesIO(UNZIP_PHP.encode()))
    print("  ✅ unzip.php")

    ftp.quit()
    print("  ✅ FTP готово")


def main():
    print("🚀 Деплой samogoncalc.ru\n")

    if '--upload-only' in sys.argv:
        if not os.path.exists(ZIP_PATH):
            print("❌ dist.zip не найден. Сделайте сборку сначала.")
            sys.exit(1)
    else:
        build()
        zip_dist()

    ftp_upload()

    print(f"\n🔗 Открой https://samogoncalc.ru/unzip.php для распаковки")
    print(f"   (страница удалится сама после распаковки)")


if __name__ == '__main__':
    main()
