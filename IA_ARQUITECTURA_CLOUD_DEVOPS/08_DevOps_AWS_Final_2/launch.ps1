Write-Host "Starting setup..."

# Start DB
Write-Host "Starting Database..."
try {
    docker-compose up -d
    if ($LASTEXITCODE -ne 0) {
        throw "docker-compose failed"
    }
} catch {
    Write-Host "Failed to start docker-compose. Please ensure Docker is installed and running." -ForegroundColor Red
    Write-Host "If you don't have Docker, please install it or provide a running PostgreSQL instance and update backend/.env" -ForegroundColor Yellow
    exit 1
}

# Wait for DB to be ready (naive wait)
Write-Host "Waiting for Database to initialize..."
Start-Sleep -Seconds 10

# Seed Backend
Write-Host "Seeding Database..."
Push-Location backend
try {
    npm run seed
} catch {
    Write-Host "Seeding failed. Proceeding anyway..." -ForegroundColor Yellow
}
Pop-Location

# Start Backend (in new window)
Write-Host "Starting Backend in a new window..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run start:dev"

# Start Frontend
Write-Host "Starting Frontend..."
Push-Location frontend
npm start
Pop-Location
