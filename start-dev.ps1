# Hooksy.click — запуск API + UI (два окна)
$root = $PSScriptRoot
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root'; python server.py"
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root'; npm run dev"
Write-Host "Hooksy.click: UI http://localhost:5173  |  API http://localhost:5000"
