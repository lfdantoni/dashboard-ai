# Multi-stage Dockerfile for Frontend and Backend

# Stage 1: Build Frontend
FROM node:22.13.1-alpine AS frontend-build
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:22.13.1-alpine AS backend-build
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./
RUN npm ci

# Copy backend source and build
COPY backend/ ./
RUN npm run build

# Stage 3: Production
FROM node:22.13.1-alpine AS production
WORKDIR /app

# Install serve to host frontend static files
RUN npm install -g serve pm2

# Copy backend build and dependencies
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/package*.json ./backend/

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'cd /app/backend && node dist/main.js &' >> /app/start.sh && \
    echo 'serve -s /app/frontend/dist -l 5173' >> /app/start.sh && \
    chmod +x /app/start.sh

# Expose ports
EXPOSE 3000 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start both services
CMD ["/bin/sh", "/app/start.sh"]
