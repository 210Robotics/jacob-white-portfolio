"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main style={{ maxWidth: 560, padding: 32, textAlign: "center" }}>
          <h1>Portfolio temporarily unavailable</h1>
          <p style={{ color: "#a1a1aa", lineHeight: 1.7 }}>
            A global rendering error interrupted the page. Please retry.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 20,
              border: 0,
              borderRadius: 6,
              background: "#f97316",
              color: "#09090b",
              padding: "12px 18px",
              fontWeight: 700,
            }}
          >
            Retry
          </button>
        </main>
      </body>
    </html>
  );
}
