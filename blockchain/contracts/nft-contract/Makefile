# NFT Contract Makefile
# Comprehensive build, deploy, and interaction toolkit

# Contract configuration
CONTRACT_NAME = nft-contract
WASM_FILE = ../../target/wasm32v1-none/release/nft_contract.wasm
NETWORK ?= testnet
RPC_URL ?= https://soroban-testnet.stellar.org

# Default accounts - Alice will be generated fresh
# ADMIN address will be specified during initialization

# Default target
default: setup-account build

# Build targets
all: setup-account clean build test

# Clean build artifacts
clean:
	cargo clean
	rm -rf target
	rm -rf ../../target/wasm32v1-none/release/nft_contract.wasm
	rm -f .wasm-hash.tmp .contract-id.tmp

# Clean everything including Alice account
clean-all: clean
	@echo "🧹 Cleaning all artifacts and accounts..."
	@stellar keys rm alice 2>/dev/null || echo "ℹ️  Alice account was not configured"
	@rm -f .contract-id
	@echo "✅ All clean! Ready for fresh setup."

# Setup Stellar CLI accounts
setup-account:
	@echo "🔧 Setting up Stellar CLI accounts..."
	@echo "Checking if Alice account exists..."
	@if stellar keys address alice >/dev/null 2>&1; then \
		echo "⚠️  Alice account already exists"; \
		echo "Public key: $$(stellar keys address alice)"; \
		echo "ℹ️  To regenerate, run: stellar keys rm alice && make setup-account"; \
	else \
		echo "🎲 Generating new Alice account..."; \
		stellar keys generate alice 2>/dev/null || true; \
		if stellar keys address alice >/dev/null 2>&1; then \
			echo "✅ Alice account generated successfully!"; \
			echo "📋 Public key: $$(stellar keys address alice)"; \
			echo "🔐 Secret key: $$(stellar keys show alice)"; \
			echo "⚠️  Save these keys! They won't be shown again."; \
		else \
			echo "❌ Failed to generate Alice account"; \
			exit 1; \
		fi; \
	fi

# Fund Alice account with testnet tokens
fund-accounts: setup-account
	@echo "💰 Funding Alice account on $(NETWORK)..."
	$(eval ALICE_ADDRESS := $(shell stellar keys address alice 2>/dev/null))
	@if [ -n "$(ALICE_ADDRESS)" ]; then \
		echo "Alice address: $(ALICE_ADDRESS)"; \
		curl -s "https://friendbot.stellar.org/?addr=$(ALICE_ADDRESS)" > /dev/null && echo "✅ Alice funded" || echo "⚠️  Alice funding failed"; \
	else \
		echo "❌ Alice account not found. Run 'make setup-account' first."; \
		exit 1; \
	fi
	@echo "✅ Alice account funded!"

# Check Alice account exists
check-balances:
	@echo "💰 Checking Alice account..."
	$(eval ALICE_ADDRESS := $(shell stellar keys address alice 2>/dev/null))
	@if [ -n "$(ALICE_ADDRESS)" ]; then \
		echo "✅ Alice address: $(ALICE_ADDRESS)"; \
		echo "ℹ️  Account should be funded from friendbot"; \
	else \
		echo "❌ Alice account not found. Run 'make setup-account' first."; \
	fi

# Get Alice address
get-alice:
	@echo "👤 Alice Account Information:"
	$(eval ALICE_ADDRESS := $(shell stellar keys address alice 2>/dev/null))
	@if [ -n "$(ALICE_ADDRESS)" ]; then \
		echo "📋 Public Key:  $(ALICE_ADDRESS)"; \
		echo "🔐 Secret Key:  $$(stellar keys show alice 2>/dev/null)"; \
		echo ""; \
		echo "💡 Usage Examples:"; \
		echo "   make initialize ADMIN=$(ALICE_ADDRESS)"; \
		echo "   make mint TO=$(ALICE_ADDRESS) TOKEN_ID=1"; \
	else \
		echo "❌ Alice account not found."; \
		echo "💡 Run 'make setup-account' to generate Alice account first."; \
	fi

# Configure network settings
setup-network:
	@echo "🌐 Setting up network configuration..."
	@stellar network add \
		--global testnet \
		--rpc-url https://soroban-testnet.stellar.org:443 \
		--network-passphrase "Test SDF Network ; September 2015" \
		2>/dev/null || echo "⚠️  Testnet network already configured"
	@echo "✅ Network configuration complete!"

# Complete setup (network + Alice account + funding)
setup: setup-network setup-account fund-accounts check-balances
	@echo "🎉 Complete setup finished!"
	$(eval ALICE_ADDRESS := $(shell stellar keys address alice 2>/dev/null))
	@echo "📋 Alice public key: $(ALICE_ADDRESS)"
	@echo "📋 Network: $(NETWORK)"
	@echo "📋 RPC URL: $(RPC_URL)"
	@echo "🚀 Ready for deployment!"

# Build the contract
build:
	@echo "🔨 Building NFT contract..."
	stellar contract build
	@echo "✅ Build complete!"
	@ls -la ../../target/wasm32v1-none/release/nft_contract.wasm

# Run tests
test: build
	@echo "🧪 Running tests..."
	cargo test

# Format code
fmt:
	@echo "🎨 Formatting code..."
	cargo fmt --all

# Check code without building
check:
	@echo "🔍 Checking code..."
	cargo check

# Lint with clippy
lint:
	@echo "🔧 Running clippy..."
	cargo clippy -- -D warnings

# Optimize WASM (optional)
optimize: build
	@echo "⚡ Optimizing WASM..."
	wasm-opt --version > /dev/null 2>&1 || (echo "❌ wasm-opt not found. Install binaryen: brew install binaryen" && exit 1)
	wasm-opt -Oz --enable-bulk-memory $(WASM_FILE) -o $(WASM_FILE)
	@echo "✅ WASM optimized!"

# Install the contract on the network
install: build
	@echo "📦 Installing contract on $(NETWORK)..."
	stellar contract upload \
		--wasm $(WASM_FILE) \
		--network $(NETWORK) \
		--source-account alice
	@echo "✅ Contract installed!"

# Deploy the contract (install + deploy)
deploy: build
	@echo "🚀 Deploying NFT contract to $(NETWORK)..."
	@echo "Installing WASM..."
	@stellar contract upload --wasm $(WASM_FILE) --network $(NETWORK) --source-account alice 2>&1 | tee .wasm-hash.tmp
	$(eval WASM_HASH := $(shell grep -o '[a-f0-9]\{64\}' .wasm-hash.tmp | tail -1))
	@if [ -z "$(WASM_HASH)" ]; then \
		echo "❌ Failed to get WASM hash from upload output"; \
		cat .wasm-hash.tmp; \
		exit 1; \
	fi
	@echo "✅ WASM Hash: $(WASM_HASH)"
	@echo "Deploying contract..."
	@stellar contract deploy --wasm-hash $(WASM_HASH) --network $(NETWORK) --source-account alice 2>&1 | tee .contract-id.tmp
	$(eval CONTRACT_ID := $(shell grep -o 'C[A-Z0-9]\{55\}' .contract-id.tmp | tail -1))
	@if [ -z "$(CONTRACT_ID)" ]; then \
		echo "⚠️  Trying alternative contract ID extraction..."; \
		$(eval CONTRACT_ID := $(shell grep 'Deployed!' -A1 .contract-id.tmp | tail -1 | grep -o 'C[A-Z0-9]*')) \
	fi
	@echo "✅ Contract deployed!"
	@echo "📋 Contract ID: $(CONTRACT_ID)"
	@if [ -z "$(CONTRACT_ID)" ]; then echo "❌ Failed to get contract ID"; cat .contract-id.tmp; exit 1; fi
	@echo "💾 Saving contract ID to .contract-id"
	@echo "$(CONTRACT_ID)" > .contract-id
	@rm -f .wasm-hash.tmp .contract-id.tmp

# Initialize the deployed contract
initialize: 
	@echo "🔧 Initializing NFT contract..."
	@if [ ! -f .contract-id ]; then echo "❌ Contract not deployed. Run 'make deploy' first."; exit 1; fi
	@if [ -z "$(ADMIN)" ]; then echo "❌ ADMIN address required. Usage: make initialize ADMIN=<address> [NAME=<name>] [SYMBOL=<symbol>]"; exit 1; fi
	$(eval CONTRACT_ID := $(shell cat .contract-id))
	$(eval NFT_NAME := $(or $(NAME),Aurora NFT Collection))
	$(eval NFT_SYMBOL := $(or $(SYMBOL),AURORA))
	@echo "Admin: $(ADMIN)"
	@echo "Name: $(NFT_NAME)"
	@echo "Symbol: $(NFT_SYMBOL)"
	stellar contract invoke \
		--id $(CONTRACT_ID) \
		--network $(NETWORK) \
		--source-account alice \
		-- initialize \
		--admin $(ADMIN) \
		--name "$(NFT_NAME)" \
		--symbol "$(NFT_SYMBOL)"
	@echo "✅ Contract initialized with admin: $(ADMIN)"

# Initialize with Alice as admin (convenience command)
initialize-with-alice:
	@echo "🔧 Initializing NFT contract with Alice as admin..."
	$(eval ALICE_ADDR := $(shell stellar keys address alice 2>/dev/null))
	@if [ -z "$(ALICE_ADDR)" ]; then \
		echo "❌ Alice account not found. Run 'make setup' first."; \
		exit 1; \
	fi
	@echo "👤 Using Alice address: $(ALICE_ADDR)"
	$(MAKE) initialize ADMIN=$(ALICE_ADDR) $(if $(NAME),NAME="$(NAME)") $(if $(SYMBOL),SYMBOL="$(SYMBOL)")

# Mint an NFT (example function)
mint:
	@echo "🎨 Minting NFT..."
	@if [ ! -f .contract-id ]; then echo "❌ Contract not deployed. Run 'make deploy' first."; exit 1; fi
	@if [ -z "$(TO)" ]; then echo "❌ TO address required. Usage: make mint TO=<address> TOKEN_ID=<id>"; exit 1; fi
	@if [ -z "$(TOKEN_ID)" ]; then echo "❌ TOKEN_ID required. Usage: make mint TO=<address> TOKEN_ID=<id>"; exit 1; fi
	$(eval CONTRACT_ID := $(shell cat .contract-id))
	stellar contract invoke \
		--id $(CONTRACT_ID) \
		--network $(NETWORK) \
		--source-account alice \
		-- mint \
		--to $(TO) \
		--token_id $(TOKEN_ID)
	@echo "✅ NFT minted to $(TO) with token ID $(TOKEN_ID)!"

# Get token owner
owner-of:
	@echo "👤 Getting token owner..."
	@if [ ! -f .contract-id ]; then echo "❌ Contract not deployed. Run 'make deploy' first."; exit 1; fi
	@if [ -z "$(TOKEN_ID)" ]; then echo "❌ TOKEN_ID required. Usage: make owner-of TOKEN_ID=<id>"; exit 1; fi
	$(eval CONTRACT_ID := $(shell cat .contract-id))
	stellar contract invoke \
		--id $(CONTRACT_ID) \
		--network $(NETWORK) \
		--source-account alice \
		-- owner_of \
		--token_id $(TOKEN_ID)

# Get balance of an address
balance-of:
	@echo "💰 Getting balance..."
	@if [ ! -f .contract-id ]; then echo "❌ Contract not deployed. Run 'make deploy' first."; exit 1; fi
	@if [ -z "$(OWNER)" ]; then echo "❌ OWNER address required. Usage: make balance-of OWNER=<address>"; exit 1; fi
	$(eval CONTRACT_ID := $(shell cat .contract-id))
	stellar contract invoke \
		--id $(CONTRACT_ID) \
		--network $(NETWORK) \
		--source-account alice \
		-- balance_of \
		--owner $(OWNER)

# Transfer token
transfer:
	@echo "📤 Transferring token..."
	@if [ ! -f .contract-id ]; then echo "❌ Contract not deployed. Run 'make deploy' first."; exit 1; fi
	@if [ -z "$(FROM)" ] || [ -z "$(TO)" ] || [ -z "$(TOKEN_ID)" ]; then echo "❌ FROM, TO, and TOKEN_ID required. Usage: make transfer FROM=<addr> TO=<addr> TOKEN_ID=<id>"; exit 1; fi
	$(eval CONTRACT_ID := $(shell cat .contract-id))
	stellar contract invoke \
		--id $(CONTRACT_ID) \
		--network $(NETWORK) \
		--source-account alice \
		-- transfer \
		--from $(FROM) \
		--to $(TO) \
		--token_id $(TOKEN_ID)
	@echo "✅ Token $(TOKEN_ID) transferred from $(FROM) to $(TO)!"

# Get contract admin
get-admin:
	@echo "👑 Getting contract admin..."
	@if [ ! -f .contract-id ]; then echo "❌ Contract not deployed. Run 'make deploy' first."; exit 1; fi
	$(eval CONTRACT_ID := $(shell cat .contract-id))
	@echo "Contract ID: $(CONTRACT_ID)"
	stellar contract invoke \
		--id $(CONTRACT_ID) \
		--network $(NETWORK) \
		--source-account alice \
		-- get_admin

# Get contract name
get-name:
	@echo "📝 Getting contract name..."
	@if [ ! -f .contract-id ]; then echo "❌ Contract not deployed. Run 'make deploy' first."; exit 1; fi
	$(eval CONTRACT_ID := $(shell cat .contract-id))
	stellar contract invoke \
		--id $(CONTRACT_ID) \
		--network $(NETWORK) \
		--source-account alice \
		-- name

# Get contract symbol
get-symbol:
	@echo "🔤 Getting contract symbol..."
	@if [ ! -f .contract-id ]; then echo "❌ Contract not deployed. Run 'make deploy' first."; exit 1; fi
	$(eval CONTRACT_ID := $(shell cat .contract-id))
	stellar contract invoke \
		--id $(CONTRACT_ID) \
		--network $(NETWORK) \
		--source-account alice \
		-- symbol

# Get base URI
get-base-uri:
	@echo "🌐 Getting base URI..."
	@if [ ! -f .contract-id ]; then echo "❌ Contract not deployed. Run 'make deploy' first."; exit 1; fi
	$(eval CONTRACT_ID := $(shell cat .contract-id))
	stellar contract invoke \
		--id $(CONTRACT_ID) \
		--network $(NETWORK) \
		--source-account alice \
		-- base_uri

# Generate TypeScript bindings
bindings: build
	@echo "🔗 Generating TypeScript bindings..."
	@if [ ! -f .contract-id ]; then echo "⚠️  No contract deployed. Using build artifacts for bindings."; fi
	@mkdir -p ../../nft-sdk/src
	stellar contract bindings typescript \
		--wasm $(WASM_FILE) \
		--output-dir ../../nft-sdk/src \
		--overwrite
	@echo "✅ TypeScript bindings generated in ../../nft-sdk/src!"

# Create NFT SDK package
create-sdk: bindings
	@echo "📦 Creating NFT SDK package..."
	@mkdir -p ../../nft-sdk
	@if [ ! -f ../../nft-sdk/package.json ]; then \
		echo "Creating package.json..."; \
		echo '{\n  "name": "@aurora/nft-sdk",\n  "version": "0.1.0",\n  "description": "TypeScript SDK for Aurora NFT contract",\n  "main": "src/index.ts",\n  "types": "src/index.ts",\n  "scripts": {\n    "build": "tsc",\n    "test": "jest"\n  },\n  "dependencies": {\n    "@stellar/stellar-sdk": "^13.0.0",\n    "buffer": "^6.0.3"\n  },\n  "devDependencies": {\n    "typescript": "^5.0.0",\n    "@types/node": "^20.0.0"\n  }\n}' > ../../nft-sdk/package.json; \
	fi
	@if [ ! -f ../../nft-sdk/tsconfig.json ]; then \
		echo "Creating tsconfig.json..."; \
		echo '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "commonjs",\n    "lib": ["ES2020"],\n    "outDir": "./dist",\n    "rootDir": "./src",\n    "strict": true,\n    "esModuleInterop": true,\n    "skipLibCheck": true,\n    "forceConsistentCasingInFileNames": true,\n    "declaration": true,\n    "declarationMap": true,\n    "sourceMap": true\n  },\n  "include": ["src/**/*"],\n  "exclude": ["node_modules", "dist"]\n}' > ../../nft-sdk/tsconfig.json; \
	fi
	@echo "✅ NFT SDK package structure created!"

# Full deployment flow (requires ADMIN parameter)
full-deploy: setup fund-accounts clean build deploy bindings create-sdk
	@echo "🎉 Full deployment complete!"
	@echo "📋 Contract ID: $(shell cat .contract-id)"
	@echo "🔗 TypeScript bindings available in ../../nft-sdk/src"
	@echo "ℹ️  Run 'make initialize ADMIN=<address>' to initialize the contract"

# Quick deployment (assumes setup is done)
quick-deploy: clean build deploy
	@echo "⚡ Quick deployment complete!"
	@echo "📋 Contract ID: $(shell cat .contract-id)"
	@echo "ℹ️  Run 'make initialize ADMIN=<address>' to initialize the contract"

# Development workflow
dev: fmt lint test build
	@echo "🛠️  Development checks complete!"

# Show contract info
info:
	@echo "📊 NFT Contract Information"
	@echo "=========================="
	@echo "Network: $(NETWORK)"
	@echo "RPC URL: $(RPC_URL)"
	@if [ -f .contract-id ]; then echo "Contract ID: $(shell cat .contract-id)"; else echo "Contract ID: Not deployed"; fi
	@if [ -f $(WASM_FILE) ]; then echo "WASM File: $(WASM_FILE)"; echo "WASM Size: $(shell wc -c < $(WASM_FILE)) bytes"; else echo "WASM File: Not built"; fi

# Help
help:
	@echo "🚀 Aurora NFT Contract Makefile"
	@echo "=============================="
	@echo ""
	@echo "Setup & Configuration:"
	@echo "  setup           Complete setup (network + Alice account + funding)"
	@echo "  setup-account   Configure Alice account in Stellar CLI"
	@echo "  setup-network   Configure network settings"
	@echo "  fund-accounts   Fund Alice account with testnet XLM"
	@echo "  check-balances  Verify Alice account exists"
	@echo "  get-alice       Show Alice account address and keys"
	@echo ""
	@echo "Building:"
	@echo "  build       Build the contract"
	@echo "  clean       Clean build artifacts"
	@echo "  clean-all   Clean everything (artifacts + Alice account)"
	@echo "  test        Run tests"
	@echo "  check       Check code without building"
	@echo "  fmt         Format code"
	@echo "  lint        Run clippy linter"
	@echo "  optimize    Optimize WASM file"
	@echo ""
	@echo "Deployment:"
	@echo "  install      Install contract WASM"
	@echo "  deploy       Deploy contract to network"
	@echo "  initialize   Initialize deployed contract (requires ADMIN=<addr>)"
	@echo "  full-deploy  Complete deployment flow (setup + deploy, no init)"
	@echo "  quick-deploy Quick deployment (assumes setup done, no init)"
	@echo ""
	@echo "Contract Interaction:"
	@echo "  mint        Mint NFT (requires TO=<addr> TOKEN_ID=<id>)"
	@echo "  owner-of    Get token owner (requires TOKEN_ID=<id>)"
	@echo "  balance-of  Get balance (requires OWNER=<addr>)"
	@echo "  transfer    Transfer token (requires FROM=<addr> TO=<addr> TOKEN_ID=<id>)"
	@echo ""
	@echo "Contract Information:"
	@echo "  get-admin   Get contract admin address"
	@echo "  get-name    Get contract name"
	@echo "  get-symbol  Get contract symbol"
	@echo "  get-base-uri Get contract base URI"
	@echo ""
	@echo "Development:"
	@echo "  bindings    Generate TypeScript bindings"
	@echo "  create-sdk  Create NFT SDK package"
	@echo "  dev         Run development checks"
	@echo "  info        Show contract information"
	@echo "  help        Show this help"
	@echo ""
	@echo "Examples:"
	@echo "  make clean-all                # Fresh start (removes Alice account)"
	@echo "  make setup                    # First time setup (generates new Alice)"
	@echo "  make get-alice                # Show Alice address for use as admin"
	@echo "  make deploy                   # Deploy contract only"
	@echo "  make initialize ADMIN=GCQZQ... # Initialize with custom admin"
	@echo "  make initialize ADMIN=GCQZQ... NAME='My NFT' SYMBOL='MYN'"
	@echo "  make mint TO=GCQZQ... TOKEN_ID=1"
	@echo "  make get-admin                # Check who is the admin"
	@echo ""
	@echo "Environment Variables:"
	@echo "  ADMIN=<address>         Admin address for initialization"
	@echo "  NAME=<name>             Custom NFT collection name (optional)"
	@echo "  SYMBOL=<symbol>         Custom NFT symbol (optional)"
	@echo "  NETWORK=testnet         Set network (default: testnet)"

.PHONY: default all clean clean-all setup setup-account setup-network fund-accounts check-balances build test fmt check lint optimize install deploy initialize mint owner-of balance-of transfer get-admin get-name get-symbol get-base-uri bindings create-sdk full-deploy quick-deploy dev info help
