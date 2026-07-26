@echo off
setlocal EnableDelayedExpansion
title GoReview - Git Upload

cd /d "%~dp0"

echo.
echo =====================================
echo        GoReview Git Upload
echo =====================================
echo.

:: Keep upload script out of Git
echo upload.bat>.gitignore

:: Check Git repository
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ERROR: This folder is not a Git repository.
    pause
    exit /b
)

:: Show current branch
for /f %%i in ('git branch --show-current') do set BRANCH=%%i
echo Current Branch : %BRANCH%
echo.

git status
echo.

set /p msg=Enter Commit Message: 

if "%msg%"=="" (
    echo Commit message cannot be empty.
    pause
    exit /b
)

git add .

git commit -m "%msg%"

if errorlevel 1 (
    echo.
    echo Nothing to commit or commit failed.
    pause
    exit /b
)

echo.
echo Syncing with GitHub...
git pull --rebase origin %BRANCH%

if errorlevel 1 (
    echo.
    echo Pull failed. Resolve conflicts and try again.
    pause
    exit /b
)

echo.
echo Uploading...
git push origin %BRANCH%

if errorlevel 1 (
    echo.
    echo Push failed.
    pause
    exit /b
)

echo.
echo =====================================
echo      Upload Successful!
echo =====================================
echo.
pause