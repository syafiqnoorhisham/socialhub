# Dockerfile
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Copy project files
COPY backend/ .
COPY frontend/ ./static/

# Run migrations and collect static files
# These will be run during the build process
RUN python manage.py collectstatic --noinput

# Set the port for the application
ENV PORT=8000

# Command to run the application
CMD gunicorn config.wsgi:application --bind 0.0.0.0:$PORT