install:
	# Install if needed
	#@echo "Updating rust toolchain"
	#rustup update stable
	#rustup default stable

rust-version:
	@echo "Rust command-line utility versions:"
	rustc --version 			#rust compiler
	cargo --version 			#rust package manager
	rustfmt --version			#rust code formatter
	rustup --version			#rust toolchain manager
	clippy-driver --version		#rust linter

format:
	@echo "Formatting all projects with cargo"
	cargo fmt --

lint:
	@echo "Linting all projects with cargo"
	@rustup component add clippy 2> /dev/null
	cargo clippy --all-targets --all-features -- -D warnings

nextest:
	@echo "Testing all projects with cargo nextest"
	cargo nextest run --release --retries 2

watch:
	@echo "Starting cargo watch with cargo nextest"
	cargo watch -x check -x 'nextest run --release --retries 2'

test:
	@echo "Testing all projects with cargo test"
	cargo test

build:
	@echo "Building Project with release flag"
	cargo build --release

all: format lint test

run-anthropic:
	cargo run --no-default-features --features anthropic

run-ollama:
	cargo run --no-default-features --features ollama