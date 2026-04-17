# Script para comprimir imágenes PNG
# Requiere ImageMagick o similar

Write-Host "Información de imágenes:" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

Get-ChildItem -Path "*.png" | ForEach-Object {
    $size = [math]::Round($_.Length / 1MB, 2)
    Write-Host "$($_.Name): $size MB" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Para comprimir imágenes, necesitas:" -ForegroundColor Green
Write-Host "1. ImageMagick: https://imagemagick.org/script/download.php"
Write-Host "2. o TinyPNG: https://tinypng.com (herramienta online)"
Write-Host ""
Write-Host "Ejemplo con ImageMagick:" -ForegroundColor Cyan
Write-Host "magick convert fondo4.png -quality 85 fondo4-compressed.png"
Write-Host ""
