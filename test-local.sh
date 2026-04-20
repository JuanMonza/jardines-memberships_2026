#!/bin/bash

# Script de Testing Local - Jardines del Renacer

echo "🧪 Testing del Sistema de Membresías"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Verificar Node.js
echo "Verificando Node.js..."
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js instalado:${NC} $(node --version)"
else
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi

# 2. Verificar npm
echo ""
echo "Verificando npm..."
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✅ npm instalado:${NC} $(npm --version)"
else
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi

# 3. Verificar .env.local
echo ""
echo "Verificando .env.local..."
if [ -f .env.local ]; then
    echo -e "${GREEN}✅ Archivo .env.local existe${NC}"
    
    # Verificar variables requeridas
    REQUIRED_VARS=("SUPABASE_URL" "SUPABASE_ANON_KEY" "JWT_SECRET" "EMAIL_USER")
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^$var=" .env.local; then
            echo -e "  ${GREEN}✓${NC} $var configurada"
        else
            echo -e "  ${RED}✗${NC} $var NO configurada"
        fi
    done
else
    echo -e "${YELLOW}⚠️  .env.local no existe${NC}"
    echo "Creando desde .env.local.example..."
    cp .env.local.example .env.local
    echo -e "${YELLOW}⚠️  Debes editar .env.local con tus credenciales${NC}"
fi

# 4. Verificar dependencias
echo ""
echo "Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules existe${NC}"
else
    echo -e "${YELLOW}⚠️  Instalando dependencias...${NC}"
    npm install
fi

# 5. Verificar estructura de carpetas
echo ""
echo "Verificando estructura del proyecto..."
FOLDERS=("api" "src" "admin" "public" "database")
for folder in "${FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        echo -e "  ${GREEN}✓${NC} $folder/"
    else
        echo -e "  ${RED}✗${NC} $folder/ FALTA"
    fi
done

# 6. Resumen
echo ""
echo "======================================================"
echo "🎯 RESUMEN DEL TESTING"
echo "======================================================"
echo ""
echo "El sistema está listo para iniciar con:"
echo ""
echo -e "${GREEN}npm run dev${NC}"
echo ""
echo "Accede a:"
echo "  📝 Frontend: http://localhost:3000/public/index.html"
echo "  🔐 Admin: http://localhost:3000/admin/login.html"
echo "  ⚙️  API: http://localhost:3000/api/health"
echo ""
echo "======================================================"
