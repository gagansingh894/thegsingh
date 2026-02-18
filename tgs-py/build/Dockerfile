# Base image
FROM python:3.12-slim

# Env vars
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency files first (optional: pyproject.toml for Poetry)
COPY ../pyproject.toml ../requirements.txt* ./ 

# Install dependencies (choose one: pip or poetry)
RUN pip install --upgrade pip
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

# Copy the backend code
COPY ../main.py ../api ../services ../domain ../storage ./ 

# Expose FastAPI port
EXPOSE 8000

# Run Uvicorn
# main:app because main.py is at /app/main.py
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]