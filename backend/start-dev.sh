#!/bin/sh

# Script de inicio para desarrollo con soporte de hot-reload en Docker
# Detecta si está en Docker y usa nodemon con polling si es necesario

# Verificar si node_modules existe, si no, restaurar desde backup
if [ -z "$(ls -A /app/node_modules 2>/dev/null)" ] || [ ! -d "/app/node_modules/@nestjs" ]; then
  echo 'Restoring node_modules from backup...'
  cp -r /tmp/node_modules_backup/* /app/node_modules/
fi

# Verificar si package-lock.json existe
if [ ! -f /app/package-lock.json ] || [ ! -s /app/package-lock.json ]; then
  echo 'Restoring package-lock.json from backup...'
  cp /tmp/package-lock.json.backup /app/package-lock.json 2>/dev/null || true
fi

# Si CHOKIDAR_USEPOLLING está configurado (Docker), usar nodemon con polling
if [ "$CHOKIDAR_USEPOLLING" = "true" ]; then
  echo '🐳 Docker detected: Using nodemon with polling for hot-reload...'
  
  # Instalar nodemon si no existe
  if [ ! -d "/app/node_modules/nodemon" ]; then
    echo 'Installing nodemon...'
    npm install nodemon --save-dev
  fi
  
  # Usar nodemon con polling habilitado
  # Usar npx para encontrar nodemon en node_modules/.bin
  exec npx nodemon --watch src --ext ts --exec "nest start" --legacy-watch --polling-interval 1000
else
  # Modo normal (no Docker)
  echo '💻 Local development: Using nest watch mode...'
  exec npm run start:dev
fi
