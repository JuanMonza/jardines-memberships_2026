@echo off
chcp 65001 > nul
setlocal

:: Script de Testing Local para Windows - Jardines del Renacer

echo.
echo 🧪 Testing del Sistema de Membresías (Windows)
echo.

:: 1. Verificar Node.js
echo Verificando Node.js...
node --version > nul 2>&1
if %errorlevel% equ 0 (
    for /f "delims=" %%i in ('node --version') do echo   [OK] Node.js instalado: %%i
) else (
    echo   [ERROR] Node.js no está instalado. Por favor, instálalo desde nodejs.org
    goto end
)

:: 2. Verificar npm
echo.
echo Verificando npm...
call npm --version > nul 2>&1
if %errorlevel% equ 0 (
    for /f "delims=" %%i in ('call npm --version 2^>nul') do echo   [OK] npm instalado: %%i
) else (
    echo   [ERROR] npm no está instalado. Viene con Node.js, algo podría estar mal.
    goto end
)

:: 3. Verificar .env.local
echo.
echo Verificando .env.local...
if not exist .env.local (
    echo   [AVISO] .env.local no existe. Creando desde .env.local.example...
    copy .env.local.example .env.local > nul
    echo   [IMPORTANTE] Debes editar el archivo .env.local con tus credenciales.
) else (
    echo   [OK] El archivo .env.local existe.
)

echo   Verificando variables de entorno requeridas...
set "ALL_VARS_FOUND=true"
for %%v in (SUPABASE_URL SUPABASE_ANON_KEY JWT_SECRET EMAIL_USER EMAIL_PASS) do (
    findstr /B /C:"%%v=" .env.local > nul
    if errorlevel 1 (
        echo     - [FALTA] La variable %%v NO está configurada en .env.local
        set "ALL_VARS_FOUND=false"
    ) else (
        echo     - [OK] Variable %%v encontrada.
    )
)

:: 4. Verificar dependencias
echo.
echo Verificando dependencias (node_modules)...
if exist node_modules (
    echo   [OK] La carpeta node_modules existe.
) else (
    echo   [AVISO] La carpeta node_modules no existe.
    echo   Ejecutando 'npm install' para instalar las dependencias. Esto puede tardar un momento...
    call npm install
)

:: 5. Resumen
echo.
echo ======================================================================
echo  RESUMEN DEL TESTING
echo ======================================================================
echo.
if "%ALL_VARS_FOUND%"=="false" (
    echo [ERROR] Faltan una o más variables de entorno en tu archivo .env.local.
    echo Por favor, edita el archivo y anade las credenciales que faltan.
) else (
    echo [OK] Tu entorno parece estar configurado correctamente.
)
echo.
echo El sistema está listo para iniciar con el comando:
echo.
echo   npm run dev
echo.
echo Accede a:
echo   - Búsqueda Pública: http://localhost:3000/public/index.html
echo   - Panel de Admin:   http://localhost:3000/admin/login.html
echo   - API Health Check: http://localhost:3000/api/health
echo.
echo ======================================================================

:end
echo.
if /i "%~1" neq "--no-pause" pause
endlocal