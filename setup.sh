#!/bin/bash

echo "🚀 Configurando Sistema de Membresías - Jardines del Renacer"
echo ""

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# 2. Crear archivo .env.local
echo ""
echo "🔐 Creando archivo .env.local..."
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Archivo .env.local creado."
    echo "⚠️  POR FAVOR: Edita .env.local con tus credenciales de Supabase y Gmail"
else
    echo "ℹ️  .env.local ya existe"
fi

# 3. Información de próximos pasos
echo ""
echo "======================================================"
echo "✅ INSTALACIÓN COMPLETADA"
echo "======================================================"
echo ""
echo "📋 PRÓXIMOS PASOS:"
echo ""
echo "1️⃣  Configura Supabase:"
echo "    - Crea un proyecto en supabase.com"
echo "    - Obtén tus credenciales (URL, Anon Key, Service Role Key)"
echo ""
echo "2️⃣  Ejecuta migraciones SQL:"
echo "    - Abre SQL Editor en Supabase"
echo "    - Copia y ejecuta database/migrations.sql"
echo ""
echo "3️⃣  Configura Email:"
echo "    - Usa Gmail con App Password (myaccount.google.com/apppasswords)"
echo ""
echo "4️⃣  Edita .env.local:"
echo "    - nano .env.local (o tu editor preferido)"
echo "    - Rellena todas las variables de entorno"
echo ""
echo "5️⃣  Inicia servidor local:"
echo "    - npm run dev"
echo "    - Abre http://localhost:3000"
echo ""
echo "6️⃣  Despliega en Vercel:"
echo "    - git init && git add . && git commit -m 'Initial commit'"
echo "    - git push a GitHub"
echo "    - Importa repo en vercel.com/dashboard"
echo ""
echo "======================================================"
echo ""
echo "📖 Lee DEPLOYMENT_GUIDE.md para más detalles"
echo ""
