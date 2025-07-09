
# Stage 1: Build the React frontend
FROM node:20-alpine as frontend-builder
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy all other files
COPY . .

# Build the application and ensure the output directory exists
RUN npm run build && ls -la dist

# Stage 2: Build the Python backend with supervisord
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies including supervisor
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

#update pip
RUN pip install --upgrade pip    

# Copy FastAPI backend requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create the static directory if it doesn't exist
RUN mkdir -p /app/static

# Copy the built frontend - with explicit verification
COPY --from=frontend-builder /app/dist/ /app/static/
RUN echo "Content of static directory:" && ls -la /app/static

# Copy the backend code
COPY backend /app/backend
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose the port
EXPOSE 8111

# Start supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

