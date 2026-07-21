@echo off
REM Seed Database Script for SNGDB (Windows)
REM Usage: seed.bat or double-click

setlocal enabledelayedexpansion

echo.
echo =====================================================
echo  ^>^>^>  SieuNhanGear Database Seeding  ^<^<^<
echo =====================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo [X] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [*] Prerequisites check...
echo.

REM Check if demo_data.json exists
if not exist "..\frontend\demo_data.json" (
    echo [X] Error: demo_data.json not found at ..\frontend\demo_data.json
    pause
    exit /b 1
)

echo [OK] demo_data.json found
echo.
echo [*] Current directory: %cd%
echo [*] Node.js version:
node --version
echo.

REM Run the seed script
echo [>>>] Starting database seeding...
echo.

node seed.js

echo.
echo =====================================================
echo     ^>^>^>  Seeding completed!  ^<^<^<
echo =====================================================
echo.
pause
