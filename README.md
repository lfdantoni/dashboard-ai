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
├── package.json       # Root package.json with npm workspaces
├── Dockerfile.frontend # Frontend Dockerfile (independent deployment)
├── Dockerfile.backend  # Backend Dockerfile (independent deployment)
├── docker-compose.yml  # Docker Compose for both services
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Docker (optional, for containerized deployment)

### Installation

Install all dependencies from the root:

```cmd
npm install
```

This will install dependencies for both frontend and backend using npm workspaces.

### Development

#### Run Both Services

From the root directory:

```cmd
# Run both frontend and backend
npm run dev

# Or run individually
npm run dev:frontend  # Frontend only
npm run dev:backend   # Backend only
```

#### Run Services Individually

**Backend:**
```cmd
cd backend
npm run start:dev
```

**Frontend:**
```cmd
cd frontend
npm run dev
```

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

### Deploy Both Services Together

```cmd
# Build and run both services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Deploy Frontend Independently

```cmd
# Build frontend image (no build args needed - uses runtime env vars)
docker build -f Dockerfile.frontend -t dashboard-ai-frontend .

# Run frontend container with runtime environment variable
docker run -p 5173:5173 \
  -e VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID \
  dashboard-ai-frontend
```

**Note:** The frontend now supports **runtime environment variables** via `runtime-config.js` injection. This means you can change `VITE_GOOGLE_CLIENT_ID` without rebuilding the Docker image!

### Deploy Backend Independently

```cmd
# Build backend image
docker build -f Dockerfile.backend -t dashboard-ai-backend .

# Run backend container
docker run -p 3000:3000 \
  -e GOOGLE_CLIENT_ID=YOUR_CLIENT_ID \
  -e ALLOWED_ORIGINS=http://localhost:5173,https://your-domain.com \
  dashboard-ai-backend
```

### Environment Variables for Docker

Create a `.env` file in the root directory for docker-compose:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
ALLOWED_ORIGINS=http://localhost:5173,https://your-domain.com
```

Then run:
```cmd
docker-compose --env-file .env up --build
```

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
