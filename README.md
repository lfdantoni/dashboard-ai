# Dashboard AI

Full-stack project with React (frontend) and NestJS (backend) organized as a **monorepo** with independent deployment capabilities.

## 📁 Project Structure

```
dashboard-ai/
├── frontend/          # React Application with Vite
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
├── backend/           # REST API with NestJS
│   ├── src/
│   ├── package.json
│   └── nest-cli.json
│
├── package.json            # Root package.json with npm workspaces
├── Dockerfile.frontend     # Frontend Dockerfile (production deployment)
├── Dockerfile.backend      # Backend Dockerfile (production deployment)
├── Dockerfile.frontend.local # Frontend Dockerfile (local development)
├── Dockerfile.backend.local  # Backend Dockerfile (local development)
├── docker-compose.yml      # Docker Compose for production
├── docker-compose-local.yml # Docker Compose for local development
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v22 or higher)
- npm (v9 or higher)
- Docker (for containerized deployment)

### 🔐 Google OAuth Setup

To enable Google authentication:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID (Web application)
3. Add authorized JavaScript origins:
   - `http://localhost:5173` (frontend)
   - `http://localhost:3000` (backend)
4. Add authorized redirect URIs:
   - `http://localhost:5173`
5. Copy the Client ID

6. Create `.env.local` in `frontend/`:
   ```env
   VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   ```

7. Create `.env` in `backend/`:
   ```env
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   ```

**Important:** Both frontend and backend must use the **same** Google Client ID.

## 🐳 Docker Deployment

### Monorepo Structure

This project is organized as a monorepo with **independent deployment** capabilities:

- **Frontend** can be deployed independently using `Dockerfile.frontend`
- **Backend** can be deployed independently using `Dockerfile.backend`
- Both services can run together using `docker-compose.yml`

### Development with Docker (Local)

For local development with hot-reload support, use the local Dockerfiles:

```cmd
# Build and run both services with hot-reload
docker-compose -f docker-compose-local.yml up --build

# Run in detached mode
docker-compose -f docker-compose-local.yml up -d

# Stop containers
docker-compose -f docker-compose-local.yml down

# View logs
docker-compose -f docker-compose-local.yml logs -f

# View logs for specific service
docker-compose -f docker-compose-local.yml logs -f frontend
docker-compose -f docker-compose-local.yml logs -f backend
```

**Features:**
- ✅ Hot-reload enabled for both frontend and backend
- ✅ Source code mounted as volumes for instant updates
- ✅ Development environment variables (`NODE_ENV=development`)
- ✅ Isolated `node_modules` using named volumes

**Files Used:**
- `Dockerfile.frontend.local` - Frontend development Dockerfile
- `Dockerfile.backend.local` - Backend development Dockerfile
- `docker-compose-local.yml` - Docker Compose configuration for local development

**Note:** Changes to your source code will automatically trigger reloads in both services without rebuilding containers.

#### Installing npm Packages with Docker

**⚠️ Important:** When developing with Docker, always install npm packages **inside the Docker container** to ensure compatibility with the production environment (Linux). This guarantees that the package versions and native binaries match what will be used in production.

**Install packages in the frontend container:**
```cmd
docker exec -it dashboard-ai-frontend npm install <package-name> --save
# Example: docker exec -it dashboard-ai-frontend npm install uuid4 --save
```

**Install packages in the backend container:**
```cmd
docker exec -it dashboard-ai-backend npm install <package-name> --save
# Example: docker exec -it dashboard-ai-backend npm install uuid4 --save
```

**How it works:**
- The `package.json` and `package-lock.json` files are mounted from your host, so changes made inside the container are automatically synced to your local files.
- The `node_modules` directory uses a named volume (Linux binaries), ensuring compatibility with production.
- After installing a package, the changes will appear in your local `package.json` and `package-lock.json` files automatically.

**Why use Docker for package installation?**
- ✅ Ensures Linux-compatible binaries (matches production environment)
- ✅ Avoids Windows/Linux compatibility issues with native dependencies
- ✅ Guarantees consistent package resolution across environments
- ✅ Prevents issues with optional dependencies (like `@rollup/rollup-linux-x64-gnu`)

**Alternative (not recommended for production):** Installing packages locally with `npm install` may work, but can cause issues when deploying to production if native binaries differ between Windows and Linux.

#### Environment Variables for Docker

Create a `.env` file in the root directory for docker-compose (production):

```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
ALLOWED_ORIGINS=http://localhost:5173,https://your-domain.com
```

Then run:
```cmd
# For production
docker-compose --env-file .env up --build

# For local development
docker-compose -f docker-compose-local.yml --env-file .env up --build
```

**Docker Files Overview:**

| File | Purpose | Use Case |
|------|---------|----------|
| `Dockerfile.frontend` | Production build with static files | Production deployment |
| `Dockerfile.backend` | Production build with compiled code | Production deployment |
| `Dockerfile.frontend.local` | Development with hot-reload | Local development |
| `Dockerfile.backend.local` | Development with hot-reload | Local development |
| `docker-compose.yml` | Production services | Production deployment |
| `docker-compose-local.yml` | Development services with volumes | Local development |

## 🔧 Available Scripts

### Root (Monorepo)

- `npm install` - Install all dependencies for frontend and backend
- `npm run dev` - Run both frontend and backend in development mode
- `npm run dev:frontend` - Run only frontend
- `npm run dev:backend` - Run only backend
- `npm run build` - Build both frontend and backend
- `npm run build:frontend` - Build only frontend
- `npm run build:backend` - Build only backend
- `npm run lint` - Lint both frontend and backend

### Backend

```cmd
cd backend
npm run start          # Production mode
npm run start:dev      # Development mode (with hot-reload)
npm run build          # Compile TypeScript
npm run test           # Run tests
npm run lint           # Lint code
```

### Frontend

```cmd
cd frontend
npm run dev            # Development server
npm run build          # Production build
npm run preview        # Preview production build
npm run lint           # Lint code
```

## 📍 API Endpoints

All API endpoints use the `/api/v1` prefix:

- `GET /api/v1` - Welcome message
- `GET /api/v1/health` - Service health check
- `GET /api/v1/dashboard-info` - Protected endpoint (requires Google token)

**📚 API Documentation:**
- Swagger UI: `http://localhost:3000/api/docs`
- API JSON: `http://localhost:3000/api/docs-json`

## 🌐 CORS Configuration

The backend CORS is configured via environment variable `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=http://localhost:5173,https://your-domain.com
```

If not set, it defaults to `http://localhost:5173`.

## 📝 Technologies Used

### Backend
- NestJS
- TypeScript
- Express
- Swagger/OpenAPI
- Google Auth Library

### Frontend
- React 18
- TypeScript
- Vite
- Axios
- Tailwind CSS
- React Router

## 🔗 Frontend-Backend Communication

The frontend communicates with the backend through:
1. **Vite Proxy** (configured in `vite.config.ts`) for `/api/*` routes in development
2. **CORS** enabled in the backend for production
3. **Environment-based API URL** configuration

## 🚢 Deployment to EasyPanel / Production

### Frontend Deployment

1. Use `Dockerfile.frontend`
2. Set build argument: `VITE_GOOGLE_CLIENT_ID`
3. Configure domain to point to port `5173`

### Backend Deployment

1. Use `Dockerfile.backend`
2. Set environment variables:
   - `GOOGLE_CLIENT_ID`
   - `ALLOWED_ORIGINS` (comma-separated list of allowed origins)
   - `NODE_ENV=production`
3. Configure domain to point to port `3000`
4. Ensure health check endpoint: `/api/v1/health`

### EasyPanel Configuration

**For Frontend:**
- Dockerfile: `Dockerfile.frontend`
- Environment Variables (Runtime): `VITE_GOOGLE_CLIENT_ID=your_client_id`
- Port: `5173`
- **Note:** Frontend uses runtime configuration injection, so you can set `VITE_GOOGLE_CLIENT_ID` as an environment variable without rebuilding!

**For Backend:**
- Dockerfile: `Dockerfile.backend`
- Environment Variables:
  - `GOOGLE_CLIENT_ID=your_client_id`
  - `ALLOWED_ORIGINS=https://your-frontend-domain.com`
  - `NODE_ENV=production`
- Port: `3000`
- Health Check: `/api/v1/health`

**Domain Configuration:**
- Frontend domain should point to: `http://container-name:5173`
- Backend API domain should point to: `http://container-name:3000` (without `/api` path, as the backend already includes it)

## 📦 Next Steps

- [x] Monorepo structure with independent deployment
- [ ] Add database (PostgreSQL, MongoDB, etc.)
- [ ] Implement JWT authentication
- [ ] Add more endpoints and features
- [ ] Add comprehensive tests
- [ ] Configure CI/CD pipelines

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT
