export default function ThankYouPage() {
  return (
    <>
      <style>{themeStyles}</style>

      <main
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "var(--bg)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            width: "100%",
            backgroundColor: "var(--card)",
            borderRadius: "16px",
            border: "1px solid var(--card-border)",
            padding: "40px",
            textAlign: "center",
            boxShadow: "var(--shadow)",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              color: "var(--text)",
              marginBottom: "20px",
            }}
          >
            Thank You
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "var(--text-medium)",
              lineHeight: "1.8",
              marginBottom: "20px",
            }}
          >
            Your registration has been submitted successfully.
          </p>

          <p
            style={{
              fontSize: "18px",
              color: "var(--text-soft)",
              lineHeight: "1.8",
            }}
          >
            Our team will review your information and contact you soon with the
            next steps.
          </p>

          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: "30px",
              backgroundColor: "var(--button-dark)",
              color: "white",
              padding: "14px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Back to Home
          </a>
        </div>
      </main>
    </>
  );
}

const themeStyles = `
  :root {
    color-scheme: light dark;
    --bg: #f8fafc;
    --text: #111827;
    --text-medium: #374151;
    --text-soft: #4b5563;
    --card: #ffffff;
    --card-border: #e5e7eb;
    --button-dark: #111827;
    --shadow: 0 10px 25px rgba(0,0,0,0.05);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #020617;
      --text: #f8fafc;
      --text-medium: #e2e8f0;
      --text-soft: #cbd5e1;
      --card: #0f172a;
      --card-border: #1e293b;
      --button-dark: #1e293b;
      --shadow: 0 10px 25px rgba(0,0,0,0.35);
    }
  }
`;