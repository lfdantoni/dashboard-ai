# Dashboard AI

Full-stack project with React (frontend) and NestJS (backend).

## 📁 Project Structure

```
dashboard-ai/
├── frontend/          # React Application with Vite
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
├── backend/           # REST API with NestJS
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   └── app.service.ts
│   ├── package.json
│   └── nest-cli.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation and Running

#### 1. Backend (NestJS)

1. Create a `.env` file in `backend/` with your Google Client ID:
   ```env
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   ```

2. Install and run:
   ```cmd
   cd backend
   npm install
   npm run start:dev
   ```

The backend will be available at: `http://localhost:3000`

Available endpoints (all use `/api/v1` prefix):
- `GET /api/v1` - Welcome message
- `GET /api/v1/health` - Service health check
- `GET /api/v1/dashboard-info` - Protected endpoint (requires Google token)

**📚 API Documentation:**
- Swagger UI: `http://localhost:3000/api/docs`
- API JSON: `http://localhost:3000/api/docs-json`

**Note:** All API endpoints use versioning (v1) and the global prefix `/api`.

#### 2. Frontend (React)

Open a new terminal:

```cmd
cd frontend
npm install
npm run dev
```

The frontend will be available at: `http://localhost:5173`

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

### 🔐 Google Login (Frontend)

Enable Google OAuth login on the frontend:

1. Create a `.env.local` file in `frontend/` with:
	```env
	VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
	```
2. Install dependencies:
	```cmd
	cd frontend
	npm install
	```
3. Run the dev server:
	```cmd
	npm run dev
	```

Notes:
- The app is wrapped with `GoogleOAuthProvider` using `VITE_GOOGLE_CLIENT_ID`.
- The login button component is in `src/components/GoogleLoginButton.tsx`.
- After login, user info is displayed and you can logout.

### 🐳 Docker (Recommended)

Run both frontend and backend with a single command:

```cmd
docker-compose up --build
```

Or using Docker directly:

```cmd
docker build -t dashboard-ai .
docker run -p 3000:3000 -p 5173:5173 dashboard-ai
```

Once running:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api/docs

## 🔧 Available Scripts

### Backend

- `npm run start` - Starts the server in production mode
- `npm run start:dev` - Starts the server in development mode (with hot-reload)
- `npm run build` - Compiles the project
- `npm run test` - Runs tests

### Frontend

- `npm run dev` - Starts the development server
- `npm run build` - Compiles the project for production
- `npm run preview` - Previews the production build
- `npm run lint` - Runs the linter

## 🌐 CORS Configuration

The backend is configured to accept requests from `http://localhost:5173` (frontend).
If you change the frontend port, update the configuration in `backend/src/main.ts`.

## 📝 Technologies Used

### Backend
- NestJS
- TypeScript
- Express
- Swagger/OpenAPI

### Frontend
- React 18
- TypeScript
- Vite
- Axios

## 🔗 Frontend-Backend Communication

The frontend communicates with the backend through:
1. **Vite Proxy** (configured in `vite.config.ts`) for `/api/*` routes
2. **CORS** enabled in the backend for development

## 📚 API Documentation

The project includes interactive API documentation powered by Swagger:

- **Swagger UI**: Access the interactive documentation at `http://localhost:3000/api/docs`
- **OpenAPI JSON**: Get the raw API specification at `http://localhost:3000/api/docs-json`

All endpoints are documented with:
- Request/response examples
- Parameter descriptions
- Response schemas
- Try-it-out functionality

## 🐳 Docker Deployment

The project includes Docker support for easy deployment:

### Files
- `Dockerfile` - Multi-stage build for both frontend and backend
- `docker-compose.yml` - Orchestration configuration
- `.dockerignore` - Excludes unnecessary files from the image

### Commands
```cmd
# Build and run
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

## 📦 Next Steps

- [ ] Add database (PostgreSQL, MongoDB, etc.)
- [ ] Implement authentication (JWT)
- [ ] Add more endpoints and features
- [ ] Configure environment variables
- [ ] Add tests
- [ ] Configure CI/CD

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT
