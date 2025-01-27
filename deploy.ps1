$BUILD_DIR = "dist"
$REMOTE_SERVER = "payly"
$REMOTE_PATH = "/var/www/payly"
$NGINX_SERVICE = "nginx"

# Functions (equivalent to Makefile targets)

function Build {
  Write-Host "Building the React app..."
  npm run build
}

function Deploy {
  Write-Host "Copying files to $REMOTE_SERVER..."
  # Use plink (from PuTTY suite) or ssh.exe (from OpenSSH for Windows) for scp/ssh
  # Example using plink (you'll need to install PuTTY and add it to your PATH)
  & "putty.exe" -scp -r "$BUILD_DIR\*" "$REMOTE_SERVER:$REMOTE_PATH/dist"
    if ($LASTEXITCODE -ne 0) {
        Write-Error "SCP failed with exit code $($LASTEXITCODE)"
        return
    }

  Write-Host "Restarting Nginx on $REMOTE_SERVER..."
  # Example using plink
  & "plink.exe" "$REMOTE_SERVER" "sudo systemctl restart $NGINX_SERVICE"
    if ($LASTEXITCODE -ne 0) {
        Write-Error "SSH failed with exit code $($LASTEXITCODE)"
        return
    }

  Write-Host "Deployment complete."
}

function Clean {
  Write-Host "Cleaning the build directory..."
  Remove-Item -Path $BUILD_DIR -Recurse -Force -ErrorAction SilentlyContinue
}

function Help {
  Write-Host "Usage:"
  Write-Host "  .\deploy.ps1 -Build     - Build the React app"
  Write-Host "  .\deploy.ps1 -Deploy    - Deploy to remote server and restart Nginx"
  Write-Host "  .\deploy.ps1 -Clean     - Clean the build directory"
    Write-Host "  .\deploy.ps1           - Build and Deploy"
}

# Main execution logic (mimicking Makefile's default target and dependencies)
param(
    [switch]$Build,
    [switch]$Deploy,
    [switch]$Clean,
    [switch]$Help
)

if ($Help) {
    Help
}
elseif ($Clean) {
    Clean
}
elseif ($Deploy) {
    Build
    Deploy
}
elseif ($Build){
    Build
}
else { # Default action if no parameters are provided
    Build
    Deploy
}