@echo off
echo ========================================
echo   Проверка установки Node.js
echo ========================================
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js НЕ УСТАНОВЛЕН
    echo.
    echo Пожалуйста, установите Node.js:
    echo 1. Перейдите на https://nodejs.org/
    echo 2. Скачайте LTS версию
    echo 3. Установите и перезапустите компьютер
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Node.js УСТАНОВЛЕН
    node --version
    echo.
)

npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ NPM НЕ УСТАНОВЛЕН
    echo.
    pause
    exit /b 1
) else (
    echo ✅ NPM УСТАНОВЛЕН
    npm --version
    echo.
)

echo ========================================
echo   Все готово для запуска!
echo ========================================
echo.
echo Теперь выполните:
echo   npm install
echo   npm run dev
echo.
pause
