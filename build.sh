#!/usr/bin/env bash
# Genera build/{firefox,chrome}/ (para cargar sin empaquetar) y los ZIP en dist/
set -euo pipefail
cd "$(dirname "$0")"
version=$(python3 -c 'import json;print(json.load(open("manifest.firefox.json"))["version"])')
rm -rf build && mkdir -p build dist
for browser in firefox chrome; do
    cp -r src "build/$browser"
    cp "manifest.$browser.json" "build/$browser/manifest.json"
    rm -f "dist/yt-limpio-$version-$browser.zip"
    (cd "build/$browser" && zip -qr "../../dist/yt-limpio-$version-$browser.zip" .)
done
ls -la dist
