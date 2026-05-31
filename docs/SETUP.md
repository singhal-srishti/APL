# APL Setup Guide

This guide will walk you through setting up the APL Career Intelligence Platform step by step.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Clone the Repository](#clone-the-repository)
3. [Environment Setup](#environment-setup)
4. [Docker Setup (Recommended)](#docker-setup-recommended)
5. [Manual Setup](#manual-setup)
6. [Verify Installation](#verify-installation)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you start, make sure you have the following installed:

### Required Software
- **Git** ([Download](https://git-scm.com/))
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://www.python.org/))
- **Docker & Docker Compose** ([Install](https://docs.docker.com/compose/install/))

### Optional but Recommended
- **VS Code** ([Download](https://code.visualstudio.com/))
- **Postman** for API testing ([Download](https://www.postman.com/downloads/))
- **DBeaver** for database management ([Download](https://dbeaver.io/))

### Verify Installation

```bash
# Check Node.js
node --version      # Should be v18.0.0 or higher
npm --version       # Should be 8.0.0 or higher

# Check Python
python --version    # Should be 3.9 or higher

# Check Docker
docker --version
docker-compose --version

# Check Git
git --version
```

---

## Clone the Repository

```bash
# Clone the repository
git clone https://github.com/singhal-srishti/APL.git

# Navigate to the project directory
cd APL

# Verify the directory structure
ls -la
```

You should see:
```
.github/
.gitignore
.env.example
backend/
docker-compose.yml
docs/
frontend/
ml-service/
README.md
```

---

## Environment Setup

### 1. Create Environment File

```bash
# Copy the example environment file
cp .env.example .env
```

### 2. Get Required API Keys

#### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in with your account
3. Click "Create new secret key"
4. Copy the key (you can only see it once)
5. Keep it safe!

### 3. Update .env File

Edit the `.env` file and add your API keys:

```bash
# Open with your favorite editor
nano .env        # Linux/Mac
# or
code .env        # VS Code
# or
notepad .env     # Windows
```

Update these values:
```
OPENAI_API_KEY=sk-your_actual_key_here
```

Other defaults are fine for development:
```
DB_USER=apl_user
DB_PASSWORD=apl_password
DB_NAME=apl_db
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_in_production
```

---

## Docker Setup (Recommended)

### Why Docker?
- No need to install Python, PostgreSQL separately
- Everything runs in isolated containers
- Easy to manage all services at once
- Consistent development environment

### Step 1: Build Images

```bash
# Build Docker images for all services
docker-compose build
```

This may take 5-10 minutes for the first build.

### Step 2: Start Services

```bash
# Start all services in the background
docker-compose up -d

# Verify all services are running
docker-compose ps
```

You should see:
```
CONTAINER ID   IMAGE                    STATUS
abc123        apl-postgres            Up (healthy)
def456        apl-redis               Up (healthy)
ghi789        apl-backend             Up
jkl012        apl-frontend            Up
mno345        apl-ml-service          Up
```

### Step 3: Check Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend      # Backend
docker-compose logs -f frontend     # Frontend
docker-compose logs -f postgres     # Database
```

### Step 4: Wait for Services to Be Ready

The first time you run the services, they need to initialize. This includes:
- Setting up the PostgreSQL database
- Running database migrations
- Building the frontend

**Wait about 2-3 minutes** for everything to start up.

### Step 5: Initialize Database (First Time Only)

```bash
# Run database migrations
docker-compose exec backend npm run db:migrate

# Seed sample data (optional)
docker-compose exec backend npm run db:seed
```

---

## Manual Setup

If you prefer not to use Docker, follow these steps:

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp ../.env.example .env.local

# Add to .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend will start at: **http://localhost:3000**

### Backend Setup (New Terminal)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp ../.env.example .env

# Setup database
npm run db:setup

# Start development server
npm run dev
```

Backend will start at: **http://localhost:5000**

### ML Service Setup (New Terminal)

```bash
# Navigate to ml-service directory
cd ml-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start service
python app.py
```

ML Service will start at: **http://localhost:5001**

### PostgreSQL Setup (if not using Docker)

```bash
# Install PostgreSQL
# macOS with Homebrew:
brew install postgresql@15

# Linux (Ubuntu/Debian):
sudo apt-get install postgresql postgresql-contrib

# Windows:
# Download from https://www.postgresql.org/download/windows/

# Start PostgreSQL service
# macOS:
brew services start postgresql@15

# Linux:
sudo systemctl start postgresql

# Create database
createdb apl_db

# Create user
createuser apl_user -P  # Enter password: apl_password

# Grant privileges
psql -U postgres -d apl_db
# In psql:
ALTER USER apl_user WITH SUPERUSER;
GRANT ALL PRIVILEGES ON DATABASE apl_db TO apl_user;
```

---

## Verify Installation

### 1. Check All Services Are Running

#### With Docker:
```bash
docker-compose ps
```

#### Manual Setup:
```bash
# Frontend
curl http://localhost:3000

# Backend
curl http://localhost:5000/api/health

# ML Service
curl http://localhost:5001/health
```

### 2. Test the Frontend

Open your browser and navigate to: **http://localhost:3000**

You should see the APL application homepage.

### 3. Test the Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Should return:
# {"status":"healthy"}
```

### 4. Test Database Connection

```bash
# With Docker:
docker-compose exec postgres psql -U apl_user -d apl_db -c "SELECT 1"

# Without Docker:
psql -U apl_user -d apl_db -c "SELECT 1"
```

### 5. Test OpenAI Integration

```bash
# Make a test request
curl -X POST http://localhost:5000/api/test/openai \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

---

## Development Tools

### Useful VS Code Extensions

1. **ES7+ React/Redux/React-Native snippets**
2. **Prettier - Code Formatter**
3. **ESLint**
4. **Thunder Client** (API testing)
5. **Docker**
6. **REST Client**

Install them from the VS Code Extensions marketplace.

### Create .vscode/settings.json

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000
}
```

### Useful Commands

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v

# View service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart a service
docker-compose restart backend

# Execute a command in a service
docker-compose exec backend npm run db:migrate

# Rebuild a service
docker-compose build --no-cache backend
```

---

## Running Tests

### Frontend Tests

```bash
cd frontend
npm run test           # Run tests once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

### Backend Tests

```bash
cd backend
npm run test           # Run tests once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

### ML Service Tests

```bash
cd ml-service
pytest                 # Run all tests
pytest -v --cov      # With coverage
pytest tests/test_resume_analyzer.py  # Specific test
```

---

## Troubleshooting

### Port Already in Use

**Problem**: "Port 3000/5000 already in use"

**Solution**:
```bash
# Find what's using the port (Mac/Linux)
lsof -ti:3000

# Kill the process
kill -9 <PID>

# Or change port in .env or start command
PORT=3001 npm run dev
```

### Docker Build Fails

**Problem**: "Docker build failed"

**Solution**:
```bash
# Clean up Docker
docker system prune -a

# Rebuild from scratch
docker-compose build --no-cache

# Start again
docker-compose up -d
```

### Database Connection Error

**Problem**: "Cannot connect to PostgreSQL"

**Solution**:
```bash
# Check if database is running
docker-compose logs postgres

# Restart database
docker-compose restart postgres

# Wait 30 seconds and try again

# Run migrations manually
docker-compose exec backend npm run db:migrate
```

### Frontend Shows Blank Page

**Problem**: Frontend loads but shows blank page

**Solution**:
```bash
# Check browser console for errors (F12)
# Check if API_URL is correct in .env
# Verify backend is running:
curl http://localhost:5000/api/health

# Clear browser cache and reload
Ctrl+Shift+Del (or Cmd+Shift+Del)
```

### Module Not Found Error

**Problem**: "Cannot find module 'xyz'"

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Or with Docker
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### OpenAI API Key Error

**Problem**: "Invalid API key"

**Solution**:
1. Verify your API key is correct at https://platform.openai.com/api-keys
2. Make sure it's set in `.env` file
3. Make sure you have credit in your OpenAI account
4. Restart the backend service

```bash
# With Docker:
docker-compose restart backend

# Without Docker:
# Stop and start backend server again
```

---

## Getting Help

- 📖 **Documentation**: See `docs/` folder
- 🐛 **Issues**: https://github.com/singhal-srishti/APL/issues
- 💬 **Discussions**: https://github.com/singhal-srishti/APL/discussions
- 📧 **Email**: singhal.srishti@example.com

---

## Next Steps

After setup, you can:

1. **Explore the API**: Open http://localhost:5000/api/docs
2. **Test Features**: Visit http://localhost:3000
3. **Read Documentation**: Check `docs/` folder
4. **Start Development**: Create a new branch and start coding!

```bash
# Create a new feature branch
git checkout -b feature/my-amazing-feature

# Make changes and commit
git add .
git commit -m "feat: add my amazing feature"

# Push to GitHub
git push origin feature/my-amazing-feature

# Create a Pull Request on GitHub
```

---

## What's Next?

- Read the [API Documentation](./API.md)
- Explore the [Database Schema](./DATABASE.md)
- Check the [Architecture Guide](./ARCHITECTURE.md)
- Contribute to the project!

Happy coding! 🚀
