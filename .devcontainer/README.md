# Dev Container Configuration

## ⚠️ Importante: Cómo usar el Dev Container correctamente

### ❌ NO hagas esto:
- Seleccionar el contenedor directamente desde "Other Containers" en la extensión de Dev Containers
- Esto NO usa el archivo `devcontainer.json` y por lo tanto:
  - No ejecuta `postCreateCommand` (npm install)
  - No levanta el backend automáticamente
  - No configura el workspaceFolder correctamente
  - No instala las extensiones configuradas

### ✅ Haz esto en su lugar:

1. **Cierra cualquier contenedor que esté corriendo manualmente:**
   ```bash
   docker-compose -f docker-compose-local.yml down
   ```

2. **Abre la paleta de comandos en Cursor/VS Code:**
   - Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P` en Mac)

3. **Ejecuta el comando:**
   ```
   Dev Containers: Reopen in Container
   ```

4. **O desde la barra de comandos inferior:**
   - Haz clic en el ícono de "Remote" (esquina inferior izquierda)
   - Selecciona "Reopen in Container"

## ¿Qué hace el devcontainer.json?

Cuando usas "Reopen in Container", el archivo `.devcontainer/devcontainer.json`:

1. ✅ **Levanta ambos servicios**: Frontend y Backend automáticamente
2. ✅ **Ejecuta npm install**: Instala dependencias en el contenedor frontend
3. ✅ **Configura el workspace**: Se conecta a `/app` (donde está el código del frontend)
4. ✅ **Instala extensiones**: Prettier, ESLint, TypeScript, etc.
5. ✅ **Configura TypeScript**: Usa el TypeScript del contenedor
6. ✅ **Monta el backend**: Acceso al código del backend en `/workspace/backend`

## Estructura de directorios en el contenedor

Cuando estás dentro del devcontainer:

```
/app                    # Código del frontend (workspace principal)
/workspace              # Raíz del proyecto completo
/workspace/backend      # Código del backend (montado adicionalmente)
```

## Puertos disponibles

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:3000`
- **Swagger API Docs**: `http://localhost:3000/api/docs`

## Solución de problemas

### El backend no se levanta
- Asegúrate de usar "Reopen in Container", no seleccionar el contenedor directamente
- Verifica que el archivo `docker-compose-local.yml` esté en la raíz del proyecto

### npm install no se ejecuta
- El `postCreateCommand` solo se ejecuta cuando usas "Reopen in Container"
- Si necesitas reinstalar dependencias manualmente:
  ```bash
  npm install
  ```

### No puedo ver el código del backend
- El backend está montado en `/workspace/backend`
- Abre esa carpeta desde el explorador de archivos en VS Code/Cursor

### El workspaceFolder no es /app
- Esto solo funciona cuando usas "Reopen in Container"
- Si te conectas directamente al contenedor, VS Code usará la carpeta por defecto

### El hot reload del backend no funciona
- El hot reload del backend usa `nodemon` con polling cuando detecta que está en Docker
- Esto es necesario porque Docker no notifica cambios en archivos montados correctamente
- **Solución:**
  1. **Reconstruye el contenedor del backend** (necesario la primera vez para instalar nodemon):
     ```bash
     docker-compose -f docker-compose-local.yml build backend
     docker-compose -f docker-compose-local.yml up -d backend
     ```
  2. Verifica que las variables de entorno estén configuradas en `docker-compose-local.yml`:
     ```yaml
     environment:
       - CHOKIDAR_USEPOLLING=true
       - CHOKIDAR_INTERVAL=1000
     ```
  3. Verifica los logs para ver si está usando nodemon:
     ```bash
     docker-compose -f docker-compose-local.yml logs -f backend
     ```
     Deberías ver: `🐳 Docker detected: Using nodemon with polling for hot-reload...`
  4. Si aún no funciona, verifica que el script `start-dev.sh` esté en `backend/start-dev.sh` y tenga permisos de ejecución
  5. Prueba hacer un cambio en cualquier archivo `.ts` del backend y deberías ver en los logs:
     ```
     [nodemon] restarting due to changes...
     [nodemon] starting `nest start`
     ```


