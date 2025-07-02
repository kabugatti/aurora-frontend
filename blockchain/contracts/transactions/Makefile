CONTRACT_NAME=transactions
NETWORK=testnet
WASM=target/wasm32-unknown-unknown/release/$(CONTRACT_NAME).wasm
FRONTEND_BINDINGS=../../frontend/src/bindings/transactions/$(CONTRACT_NAME)


default: build

build:
	stellar contract build

fmt:
	cargo fmt --all

clean:
	cargo clean

deploy:
	stellar contract deploy \
		--wasm $(WASM) \
		--source alice \
		--network $(NETWORK) \
		--alias $(CONTRACT_NAME)
invoke:
	stellar contract invoke \
		--network $(NETWORK) \
		--source alice \
		--id $(CONTRACT_NAME) \
		-- \
		create_transaction \
		--to $(TO) \
		--amount $(AMOUNT)
bindings:
	stellar contract bindings typescript \
		--wasm $(WASM) \
		--network $(NETWORK) \
		--output-dir $(FRONTEND_BINDINGS)
test:
	cargo test
