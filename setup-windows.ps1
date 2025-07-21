# Windows Setup Script for Construction Share Client
# This script helps set up the Windows environment for client deployment

param(
    [switch]$InstallOpenSSH,
    [switch]$InstallPuTTY,
    [switch]$InstallSSHPass,
    [switch]$SetupSSH,
    [switch]$TestConnection,
    [switch]$CreateProductionEnv,
    [switch]$Help,
    [string]$Server = "payly",
    [string]$Username = ""
)

# Load configuration
$ConfigPath = Join-Path $PSScriptRoot "deploy-config.ps1"
if (Test-Path $ConfigPath) {
    . $ConfigPath
} else {
    Write-Error "Configuration file not found: $ConfigPath"
    exit 1
}

# Functions
function Show-Help {
    Write-Host "Windows Setup Script for Construction Share Client" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor White
    Write-Host "  .\setup-windows.ps1 -InstallOpenSSH  - Install OpenSSH for Windows"
    Write-Host "  .\setup-windows.ps1 -InstallPuTTY    - Download and install PuTTY"
    Write-Host "  .\setup-windows.ps1 -InstallSSHPass  - Install sshpass for password auth"
    Write-Host "  .\setup-windows.ps1 -SetupSSH        - Set up SSH key authentication"
    Write-Host "  .\setup-windows.ps1 -TestConnection  - Test SSH connection to server"
    Write-Host "  .\setup-windows.ps1 -CreateProductionEnv - Create production environment file"
    Write-Host "  .\setup-windows.ps1 -Help            - Show this help"
    Write-Host ""
    Write-Host "Parameters:" -ForegroundColor White
    Write-Host "  -Server <name>       - Server name for SSH setup (default: payly)"
    Write-Host "  -Username <name>     - Username for SSH setup"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor White
    Write-Host "  .\setup-windows.ps1 -InstallOpenSSH"
    Write-Host "  .\setup-windows.ps1 -InstallSSHPass"
    Write-Host "  .\setup-windows.ps1 -CreateProductionEnv"
    Write-Host "  .\setup-windows.ps1 -TestConnection -Server myserver"
}

function Install-OpenSSH {
    Write-Host "Installing OpenSSH for Windows..." -ForegroundColor Yellow
    
    # Check if running as administrator
    if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
        Write-Error "❌ This operation requires administrator privileges."
        Write-Host "Please run PowerShell as Administrator and try again." -ForegroundColor Yellow
        exit 1
    }
    
    try {
        # Install OpenSSH Client using winget
        Write-Host "Installing OpenSSH Client..." -ForegroundColor Yellow
        winget install OpenSSH.Client
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ OpenSSH Client installed successfully" -ForegroundColor Green
        } else {
            Write-Host "Trying alternative installation method..." -ForegroundColor Yellow
            
            # Alternative: Install using Add-WindowsCapability
            Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ OpenSSH Client installed successfully" -ForegroundColor Green
            } else {
                Write-Error "❌ Failed to install OpenSSH Client"
                exit 1
            }
        }
        
        # Start and set SSH service to automatic
        Write-Host "Configuring SSH service..." -ForegroundColor Yellow
        Start-Service ssh-agent
        Set-Service -Name ssh-agent -StartupType Automatic
        
        Write-Host "✓ OpenSSH setup completed" -ForegroundColor Green
        Write-Host "You may need to restart your terminal or computer." -ForegroundColor Yellow
        
    } catch {
        Write-Error "❌ Error installing OpenSSH: $($_.Exception.Message)"
        exit 1
    }
}

function Install-PuTTY {
    Write-Host "Installing PuTTY..." -ForegroundColor Yellow
    
    try {
        # Try winget first
        Write-Host "Installing PuTTY using winget..." -ForegroundColor Yellow
        winget install PuTTY.PuTTY
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ PuTTY installed successfully" -ForegroundColor Green
        } else {
            Write-Host "winget installation failed. Please install manually:" -ForegroundColor Yellow
            Write-Host "1. Download from: https://www.putty.org/" -ForegroundColor Yellow
            Write-Host "2. Install and add to PATH" -ForegroundColor Yellow
            Write-Host "3. Restart your terminal" -ForegroundColor Yellow
        }
        
    } catch {
        Write-Error "❌ Error installing PuTTY: $($_.Exception.Message)"
        Write-Host "Please install PuTTY manually from https://www.putty.org/" -ForegroundColor Yellow
    }
}

function Install-sshpass {
    Write-Host "Installing sshpass..." -ForegroundColor Yellow
    
    try {
        # Try winget first
        Write-Host "Installing sshpass using winget..." -ForegroundColor Yellow
        winget install sshpass
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ sshpass installed successfully" -ForegroundColor Green
        } else {
            Write-Host "winget installation failed. Please install manually:" -ForegroundColor Yellow
            Write-Host "1. Download from: https://github.com/kevinburke/sshpass/releases" -ForegroundColor Yellow
            Write-Host "2. Place sshpass.exe in PATH" -ForegroundColor Yellow
            Write-Host "3. Restart your terminal" -ForegroundColor Yellow
        }
        
    } catch {
        Write-Error "❌ Error installing sshpass: $($_.Exception.Message)"
        Write-Host "Please install sshpass manually from https://github.com/kevinburke/sshpass/releases" -ForegroundColor Yellow
    }
}

function Setup-SSHKey {
    Write-Host "Setting up SSH key authentication..." -ForegroundColor Yellow
    
    if (-not $Username) {
        $Username = Read-Host "Enter your username on the remote server"
    }
    
    $sshDir = "$env:USERPROFILE\.ssh"
    $keyFile = "$sshDir\id_rsa"
    
    # Create .ssh directory if it doesn't exist
    if (-not (Test-Path $sshDir)) {
        New-Item -ItemType Directory -Path $sshDir | Out-Null
        Write-Host "Created SSH directory: $sshDir" -ForegroundColor Green
    }
    
    # Generate SSH key if it doesn't exist
    if (-not (Test-Path $keyFile)) {
        Write-Host "Generating SSH key pair..." -ForegroundColor Yellow
        ssh-keygen -t rsa -b 4096 -f $keyFile -N '""'
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ SSH key generated successfully" -ForegroundColor Green
        } else {
            Write-Error "❌ Failed to generate SSH key"
            exit 1
        }
    } else {
        Write-Host "SSH key already exists: $keyFile" -ForegroundColor Yellow
    }
    
    # Copy public key to server
    Write-Host "Copying public key to server..." -ForegroundColor Yellow
    $pubKey = Get-Content "$keyFile.pub"
    
    Write-Host "Please run the following command on your server:" -ForegroundColor Cyan
    Write-Host "mkdir -p ~/.ssh && echo '$pubKey' >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys" -ForegroundColor White
    
    Write-Host "✓ SSH key setup completed" -ForegroundColor Green
}

function Test-SSHConnection {
    Write-Host "Testing SSH connection to $SSH_HOST..." -ForegroundColor Yellow
    
    try {
        # Test SSH connection
        ssh -o ConnectTimeout=10 -o BatchMode=yes "$SSH_USER@$SSH_HOST" "echo 'SSH connection successful'"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ SSH connection successful" -ForegroundColor Green
        } else {
            Write-Error "❌ SSH connection failed"
            Write-Host "Please check:" -ForegroundColor Yellow
            Write-Host "1. Server is reachable" -ForegroundColor Yellow
            Write-Host "2. SSH key is properly configured" -ForegroundColor Yellow
            Write-Host "3. SSH service is running on the server" -ForegroundColor Yellow
            exit 1
        }
        
    } catch {
        Write-Error "❌ SSH connection failed: $($_.Exception.Message)"
        exit 1
    }
}

function Create-ProductionEnv {
    Write-Host "Creating production environment file..." -ForegroundColor Yellow
    
    $localEnvFile = Join-Path $PSScriptRoot $CLIENT_ENV_FILE
    $productionEnvFile = Join-Path $PSScriptRoot $CLIENT_ENV_PRODUCTION
    
    # Check if .env.local exists
    if (-not (Test-Path $localEnvFile)) {
        Write-Error "❌ .env.local file not found"
        Write-Host "Please create .env.local file first." -ForegroundColor Yellow
        exit 1
    }
    
    # Check if .env.production already exists
    if (Test-Path $productionEnvFile) {
        Write-Host "⚠ .env.production already exists. Overwriting..." -ForegroundColor Yellow
    }
    
    # Read .env.local content
    $content = Get-Content $localEnvFile -Raw
    
    # Process the content to create production version
    $productionContent = @"
# Production Environment Configuration
# This file contains production-specific environment variables
# Generated from .env.local on $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

"@
    
    # Split content into lines and process each line
    $lines = $content -split "`n"
    foreach ($line in $lines) {
        $trimmedLine = $line.Trim()
        
        # Skip empty lines
        if ([string]::IsNullOrWhiteSpace($trimmedLine)) {
            $productionContent += "`n"
            continue
        }
        
        # Skip comments that are not environment variables
        if ($trimmedLine.StartsWith("#") -and -not $trimmedLine.Contains("=")) {
            $productionContent += $line + "`n"
            continue
        }
        
        # Handle environment variables
        if ($trimmedLine.Contains("=")) {
            # Check if this is a production line (commented)
            if ($trimmedLine.StartsWith("#")) {
                # Uncomment production line
                $uncommentedLine = $trimmedLine.Substring(1).Trim()
                $productionContent += $uncommentedLine + "`n"
                Write-Host "✓ Uncommented: $uncommentedLine" -ForegroundColor Green
            } else {
                # Comment out development line
                $productionContent += "# " + $trimmedLine + "`n"
                Write-Host "✓ Commented: $trimmedLine" -ForegroundColor Yellow
            }
        } else {
            # Keep other lines as is
            $productionContent += $line + "`n"
        }
    }
    
    # Write production environment file
    try {
        $productionContent | Out-File -FilePath $productionEnvFile -Encoding UTF8
        Write-Host "✓ Production environment file created: $productionEnvFile" -ForegroundColor Green
        
        # Show the content
        Write-Host ""
        Write-Host "Production environment file content:" -ForegroundColor Cyan
        Write-Host "----------------------------------------" -ForegroundColor Gray
        Get-Content $productionEnvFile | ForEach-Object {
            if ($_.StartsWith("#")) {
                Write-Host $_ -ForegroundColor Gray
            } else {
                Write-Host $_ -ForegroundColor White
            }
        }
        Write-Host "----------------------------------------" -ForegroundColor Gray
        
    } catch {
        Write-Error "❌ Failed to create production environment file: $($_.Exception.Message)"
        exit 1
    }
}

function Check-Prerequisites {
    Write-Host "Checking current setup..." -ForegroundColor Yellow
    
    # Check Node.js
    try {
        $nodeVersion = node --version
        Write-Host "✓ Node.js: $nodeVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ Node.js not found" -ForegroundColor Red
    }
    
    # Check SSH
    try {
        $sshVersion = ssh -V 2>&1
        Write-Host "✓ OpenSSH: $sshVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ OpenSSH not found" -ForegroundColor Red
    }
    
    # Check SCP
    try {
        $scpVersion = scp -V 2>&1
        Write-Host "✓ SCP: $scpVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ SCP not found" -ForegroundColor Red
    }
    
    # Check sshpass
    try {
        $sshpassVersion = sshpass -V 2>&1
        Write-Host "✓ sshpass: $sshpassVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ sshpass not found (required for password auth)" -ForegroundColor Red
    }
}

# Main execution
if ($Help) {
    Show-Help
    exit 0
}

Write-Host "=== Windows Setup for Construction Share Client ===" -ForegroundColor Cyan

# Check current setup
Check-Prerequisites

# Execute based on parameters
if ($InstallOpenSSH) {
    Install-OpenSSH
}
elseif ($InstallPuTTY) {
    Install-PuTTY
}
elseif ($InstallSSHPass) {
    Install-sshpass
}
elseif ($SetupSSH) {
    Setup-SSHKey
}
elseif ($TestConnection) {
    Test-SSHConnection
}
elseif ($CreateProductionEnv) {
    Create-ProductionEnv
}
else {
    # Default: Show help
    Show-Help
}

Write-Host "=== Setup completed! ===" -ForegroundColor Green 