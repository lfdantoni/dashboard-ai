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
│   │   ├── config/        # Configuration files
│   │   ├── controllers/    # API controllers
│   │   ├── decorators/     # Custom decorators
│   │   ├── entities/       # DTOs and response entities
│   │   ├── guards/         # Authentication guards
│   │   ├── repositories/   # MongoDB repositories
│   │   ├── schemas/        # Mongoose schemas
│   │   └── services/       # Business logic services
│   ├── package.json
│   └── nest-cli.json
│
├── package.json            # Root package.json with npm workspaces
├── docker/                 # Docker configuration files
│   ├── dev/                # Development Docker files
│   │   ├── Dockerfile.frontend.local
│   │   ├── Dockerfile.backend.local
│   │   └── docker-compose-local.yml
│   └── prod/               # Production Docker files
│       ├── Dockerfile.frontend
│       └── Dockerfile.backend
├── .dockerignore           # Docker ignore file (excludes .git for production builds)
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

### 🗄️ MongoDB Setup

The backend uses MongoDB for data persistence. MongoDB is automatically configured when using Docker Compose.

**For local development with Docker:**
- MongoDB is automatically started as a service in `docker-compose-local.yml`
- Connection string defaults to: `mongodb://mongo:27017/dashboard-ai`
- Data is persisted in a Docker volume: `mongo-data`

**For local development without Docker:**
- Install MongoDB locally or use MongoDB Atlas
- Create `.env.local` in `backend/`:
  ```env
  MONGODB_URI=mongodb://localhost:27017/dashboard-ai
  ```

**For production:**
- Set `MONGODB_URI` environment variable in your deployment platform
- Example: `mongodb://user:password@host:27017/dashboard-ai?authSource=admin`

## 🐳 Docker Deployment

### Monorepo Structure

This project is organized as a monorepo with **independent deployment** capabilities:

- **Frontend** can be deployed independently using `docker/prod/Dockerfile.frontend`
- **Backend** can be deployed independently using `docker/prod/Dockerfile.backend`
- Both services are deployed independently in production (no shared docker-compose for production)

### Development with Docker (Local)

For local development with hot-reload support, use the local Dockerfiles:

```cmd
# Build and run both services with hot-reload
docker-compose -f docker/dev/docker-compose-local.yml up --build

# Run in detached mode
docker-compose -f docker/dev/docker-compose-local.yml up -d

# Stop containers
docker-compose -f docker/dev/docker-compose-local.yml down

# View logs
docker-compose -f docker/dev/docker-compose-local.yml logs -f

# View logs for specific service
docker-compose -f docker/dev/docker-compose-local.yml logs -f frontend
docker-compose -f docker/dev/docker-compose-local.yml logs -f backend
docker-compose -f docker/dev/docker-compose-local.yml logs -f mongo
```

**Features:**
- ✅ Hot-reload enabled for both frontend and backend
- ✅ Source code mounted as volumes for instant updates
- ✅ Development environment variables (`NODE_ENV=development`)
- ✅ Isolated `node_modules` using named volumes
- ✅ MongoDB service included with persistent data storage

**Files Used:**
- `docker/dev/Dockerfile.frontend.local` - Frontend development Dockerfile
- `docker/dev/Dockerfile.backend.local` - Backend development Dockerfile
- `docker/dev/docker-compose-local.yml` - Docker Compose configuration for local development

**Note:** Changes to your source code will automatically trigger reloads in both services without rebuilding containers.

#### Development with "Reopen in Container" (Recommended)

**🎯 Recommended approach for the best development experience**, especially to avoid TypeScript type resolution.

The project includes a Dev Container configuration (`.devcontainer/devcontainer.json`) that automatically:
- ✅ Sets up the correct TypeScript SDK path (`/app/node_modules/typescript/lib`)
- ✅ Configures ESLint for both frontend and backend
- ✅ Installs dependencies automatically
- ✅ Provides proper type resolution without path issues
- ✅ Mounts both frontend and backend code correctly

**How to use:**

1. **Open Command Palette:**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)

2. **Select "Reopen in Container":**
   ```
   Dev Containers: Reopen in Container
   ```

3. **Wait for container setup:**
   - Docker Compose will build and start both services automatically
   - Dependencies will be installed automatically
   - TypeScript will be configured correctly

4. **Start developing:**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`
   - Swagger API Docs: `http://localhost:3000/api/docs`

**What happens:**
- The Dev Container uses `docker/dev/docker-compose-local.yml` to start both services
- Your workspace folder is `/app` (frontend code)
- Backend code is accessible at `/workspace/backend`
- TypeScript uses the container's TypeScript SDK, avoiding Windows path issues
- All extensions (Prettier, ESLint, TypeScript) are pre-configured

**Benefits:**
- ✅ **No TypeScript errors** - Types are resolved correctly in the Linux environment
- ✅ **Consistent environment** - Same Linux environment as production
- ✅ **Auto-configuration** - No manual setup needed
- ✅ **Hot-reload works** - Both frontend and backend reload automatically
- ✅ **Proper node_modules** - Linux-compatible binaries from the start

**Important:** Always use "Reopen in Container" instead of manually attaching to a running container. The Dev Container configuration ensures proper setup of TypeScript, ESLint, and all development tools.

For more details, see `.devcontainer/README.md`.

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

#### Environment Variables for Docker Development

For local development with docker-compose, environment variables are loaded from:
- `frontend/.env.local` (if it exists)
- `backend/.env.local` (if it exists)

**MongoDB Connection:**
- Default connection string: `mongodb://mongo:27017/dashboard-ai` (automatically set for Docker)
- To override, set `MONGODB_URI` in `backend/.env.local`

These files are automatically loaded by `docker-compose-local.yml`. See the [Building Production Docker Images](#building-production-docker-images) section for production deployment.

**Docker Files Overview:**

| File | Purpose | Use Case |
|------|---------|----------|
| `docker/prod/Dockerfile.frontend` | Production build with static files | Production deployment |
| `docker/prod/Dockerfile.backend` | Production build with compiled code | Production deployment |
| `docker/dev/Dockerfile.frontend.local` | Development with hot-reload | Local development |
| `docker/dev/Dockerfile.backend.local` | Development with hot-reload | Local development |
| `docker/dev/docker-compose-local.yml` | Development services with volumes | Local development |
| `.dockerignore` | Excludes files from Docker builds | Production builds (excludes .git) |

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

## 🏗️ Backend Architecture

### Project Structure

The backend follows NestJS best practices with a clear separation of concerns:

- **`config/`** - Configuration files and environment variable validation
- **`controllers/`** - API route handlers (REST endpoints)
- **`decorators/`** - Custom decorators (e.g., `@CurrentUser()`)
- **`entities/`** - DTOs and response entities for Swagger documentation
- **`guards/`** - Authentication and authorization guards
- **`repositories/`** - MongoDB data access layer (Mongoose repositories)
- **`schemas/`** - Mongoose schemas (database models)
- **`services/`** - Business logic and external API integrations

### Repositories Pattern

The project uses a **Repository Pattern** for data access:

- **Location**: `backend/src/repositories/`
- **Purpose**: Encapsulate all database operations for a specific entity
- **Benefits**: 
  - Separation of concerns (business logic vs data access)
  - Easier testing (can mock repositories)
  - Reusable data access methods
  - Consistent error handling

**Example Usage:**

```typescript
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOrCreateUser(googleUser: GoogleUser) {
    return this.userRepository.findOrCreate({
      googleId: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
    });
  }
}
```

**Available Repositories:**

- **`UserRepository`** - User management operations
  - `findByGoogleId()` - Find user by Google ID
  - `findByEmail()` - Find user by email
  - `findOrCreate()` - Find or create user (useful for OAuth)
  - `updateLastLogin()` - Update last login timestamp
  - And more CRUD operations...

## 📝 Technologies Used

### Backend
- NestJS
- TypeScript
- Express
- Swagger/OpenAPI
- Google Auth Library
- MongoDB with Mongoose
- Repository Pattern

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

### Building Production Docker Images

#### Frontend Build

Build the frontend production image from the project root:

```cmd
docker build -f docker/prod/Dockerfile.frontend -t dashboard-ai-frontend:latest .
```

**Run the frontend container:**

Using environment variables directly:
```cmd
docker run -d --name dashboard-ai-frontend-prod -p 5173:5173 -e VITE_GOOGLE_CLIENT_ID=your_google_client_id dashboard-ai-frontend:latest
```

Or using an `.env` file:
```cmd
docker run -d --name dashboard-ai-frontend-prod -p 5173:5173 --env-file frontend/.env dashboard-ai-frontend:latest
```

**Note:** The frontend uses runtime configuration injection, so `VITE_GOOGLE_CLIENT_ID` can be set as an environment variable at runtime without rebuilding the image.

#### Backend Build

Build the backend production image from the project root:

```cmd
docker build -f docker/prod/Dockerfile.backend -t dashboard-ai-backend:latest .
```

**Run the backend container:**

Using environment variables directly:
```cmd
docker run -d \
  --name dashboard-ai-backend \
  -p 3000:3000 \
  -e GOOGLE_CLIENT_ID=your_google_client_id \
  -e ALLOWED_ORIGINS=http://localhost:5173,https://your-domain.com \
  -e NODE_ENV=production \
  -e MONGODB_URI=mongodb://user:password@host:27017/dashboard-ai?authSource=admin \
  dashboard-ai-backend:latest
```

Or using an `.env` file:
```cmd
docker run -d --name dashboard-ai-backend -p 3000:3000 --env-file backend/.env dashboard-ai-backend:latest
```

#### Build Options Explained

**Docker Build:**
- `-f docker/prod/Dockerfile.*` - Specifies the Dockerfile path (relative to build context)
- `-t <name>:<tag>` - Tags the image with a name and version
- `.` - Build context (root of the project, where `frontend/` and `backend/` folders are located)

**Docker Run:**
- `-d` - Run container in detached mode (background)
- `--name <name>` - Assign a name to the container
- `-p <host>:<container>` - Map port from host to container
- `-e <KEY>=<VALUE>` - Set environment variable directly
- `--env-file <file>` - Load environment variables from a file (one variable per line, format: `KEY=VALUE`)

**Example `.env` files:**

Create `frontend/.env`:
```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Create `backend/.env`:
```env
GOOGLE_CLIENT_ID=your_google_client_id
ALLOWED_ORIGINS=http://localhost:5173,https://your-domain.com
NODE_ENV=production
MONGODB_URI=mongodb://user:password@host:27017/dashboard-ai?authSource=admin
```

**Important:** 
- Always run `docker build` from the **project root directory** (where `package.json` is located), as the Dockerfiles expect `frontend/` and `backend/` folders to be in the build context.
- Docker automatically uses the `.dockerignore` file in the build context (project root), which excludes `.git` and other unnecessary files for production builds.
- The `--env-file` option reads the file path relative to where you run the command, or you can use an absolute path.

### Frontend Deployment

1. Use `docker/prod/Dockerfile.frontend`
2. Set runtime environment variable: `VITE_GOOGLE_CLIENT_ID`
3. Configure domain to point to port `5173`

### Backend Deployment

1. Use `docker/prod/Dockerfile.backend`
2. Set environment variables:
   - `GOOGLE_CLIENT_ID`
   - `ALLOWED_ORIGINS` (comma-separated list of allowed origins)
   - `NODE_ENV=production`
3. Configure domain to point to port `3000`
4. Ensure health check endpoint: `/api/v1/health`

### EasyPanel Configuration

**For Frontend:**
- Dockerfile: `docker/prod/Dockerfile.frontend`
- Environment Variables (Runtime): `VITE_GOOGLE_CLIENT_ID=your_client_id`
- Port: `5173`
- **Note:** Frontend uses runtime configuration injection, so you can set `VITE_GOOGLE_CLIENT_ID` as an environment variable without rebuilding!

**For Backend:**
- Dockerfile: `docker/prod/Dockerfile.backend`
- Environment Variables:
  - `GOOGLE_CLIENT_ID=your_client_id`
  - `ALLOWED_ORIGINS=https://your-frontend-domain.com`
  - `NODE_ENV=production`
  - `MONGODB_URI=mongodb://user:password@host:27017/dashboard-ai?authSource=admin`
- Port: `3000`
- Health Check: `/api/v1/health`

**Domain Configuration:**
- Frontend domain should point to: `http://container-name:5173`
- Backend API domain should point to: `http://container-name:3000` (without `/api` path, as the backend already includes it)

## 📦 Next Steps

- [x] Monorepo structure with independent deployment
- [x] Add database (MongoDB with Mongoose)
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
