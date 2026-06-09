"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

// global-error replaces the root layout — Tailwind classes are unavailable here.
export default function GlobalError({ reset }: Props) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#0e0e0e",
          color: "#e8e8e8",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#6b6b6b",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 16,
            }}
          >
            Critical error
          </p>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Something went wrong.
          </h1>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              color: "#a8a8a8",
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            A critical error occurred. Please reload the page.
          </p>
          <button
            onClick={reset}
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "#e8e8e8",
              color: "#0e0e0e",
              border: "none",
              padding: "12px 24px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
