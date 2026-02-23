@echo off
echo ========================================
echo   Семейный фотоальбом - Быстрый старт
echo ========================================
echo.

echo Проверка установки Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ОШИБКА: Node.js не установлен!
    echo Скачайте Node.js с https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js установлен!
echo.

echo Установка зависимостей...
call npm install

if errorlevel 1 (
    echo ОШИБКА при установке зависимостей!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Установка завершена успешно!
echo ========================================
echo.
echo Запуск сервера разработки...
echo.

call npm run dev

pause
