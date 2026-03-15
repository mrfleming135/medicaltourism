"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        alert(data.message || "Invalid username or password");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            width: "100%",
            maxWidth: "450px",
            backgroundColor: "var(--card)",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid var(--card-border)",
            boxShadow: "var(--shadow)",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "var(--text)",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Admin Login
          </h1>

          <form onSubmit={handleLogin} style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: "var(--button-dark)",
                color: "white",
                padding: "14px 20px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
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
    --card: #ffffff;
    --card-border: #e5e7eb;
    --input-bg: #ffffff;
    --input-border: #d1d5db;
    --button-dark: #111827;
    --shadow: 0 10px 25px rgba(0,0,0,0.05);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #020617;
      --text: #f8fafc;
      --card: #0f172a;
      --card-border: #1e293b;
      --input-bg: #111827;
      --input-border: #334155;
      --button-dark: #1e293b;
      --shadow: 0 10px 25px rgba(0,0,0,0.35);
    }
  }
`;

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid var(--input-border)",
  fontSize: "16px",
  color: "var(--text)",
  backgroundColor: "var(--input-bg)",
};

const labelStyle = {
  display: "block",
  fontSize: "16px",
  fontWeight: "bold" as const,
  color: "var(--text)",
  marginBottom: "8px",
};