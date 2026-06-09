# thegsingh

Personal portfolio website for Gagandeep Singh — a monorepo containing a Rust/Axum REST API backend and a Next.js frontend.

## Structure

```
thegsingh/
├── tgs-backend/   # Rust REST API (Axum, port 8080)
└── tgs-ui/        # Next.js frontend (TypeScript, Tailwind CSS)
```

## Backend (`tgs-backend`)

Built with [Rust](https://www.rust-lang.org/) and [Axum](https://github.com/tokio-rs/axum). Serves portfolio content from an in-memory repository.

### Prerequisites

- Rust (stable) — install via [rustup](https://rustup.rs/)

### Running

```bash
cd tgs-backend
cargo run
```

The server starts on `http://0.0.0.0:8080`.

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/healthcheck` | Health check |
| `GET` | `/api/v1/portfolio` | Full portfolio data |

### Development

```bash
cd tgs-backend

make format   # Format code
make lint     # Run Clippy linter
make test     # Run tests
make build    # Release build
make all      # format + lint + test
```

## Frontend (`tgs-ui`)

Built with [Next.js](https://nextjs.org/), TypeScript, and Tailwind CSS.

### Prerequisites

- Node.js 18+

### Running

```bash
cd tgs-ui
npm install
npm run dev
```

## License

MIT — see [LICENSE](LICENSE).
