# Variables
BUILD_DIR = dist
REMOTE_SERVER = payly
REMOTE_PATH = /var/www/payly
NGINX_SERVICE = nginx

# Default target
all: build deploy

# Build the React app
build:
	# npm install
	npm run build

# Deploy to remote server
deploy: build
	@echo "Copying files to $(REMOTE_SERVER)..."
	scp -r $(BUILD_DIR)/* $(REMOTE_SERVER):$(REMOTE_PATH)/client
	@echo "Restarting Nginx on $(REMOTE_SERVER)..."
	ssh $(REMOTE_SERVER) "sudo systemctl restart $(NGINX_SERVICE)"
	@echo "Deployment complete."

# Clean the build directory
clean:
	rm -rf $(BUILD_DIR)

# Help target
help:
	@echo "Usage:"
	@echo "  make build   - Build the React app"
	@echo "  make deploy  - Deploy to remote server and restart Nginx"
	@echo "  make clean   - Clean the build directory"
