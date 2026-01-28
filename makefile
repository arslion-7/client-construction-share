# Variables
REMOTE_SERVER = payly
REMOTE_PATH = /var/www/payly/client/

# Default target
all: build

# Run in development mode
dev:
	npm run dev

# Build the client
build:
	@echo "Building client..."
	npm run build

# Deploy the client
deploy: build
	@echo "Deploying client..."
	scp -r dist/* $(REMOTE_SERVER):$(REMOTE_PATH)
	@echo "Client deployment complete."

# Deploy all (API + client) using root Makefile
deploy-all:
	$(MAKE) -C .. deploy

# Clean build artifacts
clean:
	rm -rf dist

# Help target
help:
	@echo "Usage:"
	@echo "  make dev        - Run client in development mode"
	@echo "  make build      - Build the client"
	@echo "  make deploy     - Build and deploy client"
	@echo "  make deploy-all - Deploy both API and client (uses root Makefile)"
	@echo "  make clean      - Remove build artifacts"
