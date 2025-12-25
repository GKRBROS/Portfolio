# Admin Setup Script
# Run this script to set up your admin credentials

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Portfolio Admin Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local file found" -ForegroundColor Green
    Write-Host ""
    Write-Host "Current configuration:" -ForegroundColor Yellow
    Get-Content ".env.local" | Where-Object { $_ -notmatch "^#" -and $_ -ne "" }
    Write-Host ""
    
    $overwrite = Read-Host "Do you want to update the credentials? (y/n)"
    if ($overwrite -ne "y") {
        Write-Host "Setup cancelled." -ForegroundColor Yellow
        exit
    }
}

Write-Host ""
Write-Host "Enter your admin credentials:" -ForegroundColor Cyan
Write-Host ""

# Get username
$username = Read-Host "Admin Username"
if ([string]::IsNullOrWhiteSpace($username)) {
    $username = "admin"
    Write-Host "Using default username: admin" -ForegroundColor Yellow
}

# Get password
$password = Read-Host "Admin Password" -AsSecureString
$passwordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

if ([string]::IsNullOrWhiteSpace($passwordPlain)) {
    Write-Host "Error: Password cannot be empty!" -ForegroundColor Red
    exit 1
}

# Generate NEXTAUTH_SECRET
Write-Host ""
Write-Host "Generating secure NEXTAUTH_SECRET..." -ForegroundColor Cyan
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$secret = [Convert]::ToBase64String($bytes)

# Create .env.local content
$envContent = @"
# Admin Credentials - Keep this file secure and never commit to git
ADMIN_USERNAME=$username
ADMIN_PASSWORD=$passwordPlain

# NextAuth Configuration
NEXTAUTH_SECRET=$secret
NEXTAUTH_URL=http://localhost:3000
"@

# Write to file
$envContent | Out-File -FilePath ".env.local" -Encoding utf8 -Force

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your admin credentials:" -ForegroundColor Cyan
Write-Host "  Username: $username" -ForegroundColor White
Write-Host "  Password: $passwordPlain" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: Keep these credentials safe!" -ForegroundColor Yellow
Write-Host "⚠️  The .env.local file is excluded from git" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run: npm install" -ForegroundColor White
Write-Host "  2. Run: npm run dev" -ForegroundColor White
Write-Host "  3. Visit: http://localhost:3000/admin/login" -ForegroundColor White
Write-Host ""
