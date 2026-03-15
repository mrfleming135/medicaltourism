export default function HomePage() {
  return (
    <>
      <style>{`
        :root {
          color-scheme: light dark;
          --bg: #f8fafc;
          --text: #111827;
          --text-soft: #4b5563;
          --card: #ffffff;
          --card-border: #e5e7eb;
          --muted-card: #f9fafb;
          --note-bg: #eff6ff;
          --note-border: #bfdbfe;
          --note-text: #1e3a8a;
          --footer-bg: #111827;
          --footer-text: #ffffff;
          --footer-soft: #d1d5db;
          --button-bg: #ffffff;
          --button-text: #111827;
          --shadow: 0 10px 25px rgba(0,0,0,0.05);
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #020617;
            --text: #f8fafc;
            --text-soft: #cbd5e1;
            --card: #0f172a;
            --card-border: #1e293b;
            --muted-card: #111827;
            --note-bg: #0f172a;
            --note-border: #1d4ed8;
            --note-text: #bfdbfe;
            --footer-bg: #020617;
            --footer-text: #f8fafc;
            --footer-soft: #94a3b8;
            --button-bg: #ffffff;
            --button-text: #111827;
            --shadow: 0 10px 25px rgba(0,0,0,0.35);
          }
        }
      `}</style>

      <main
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          minHeight: "100vh",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <section
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #38bdf8 100%)",
            color: "white",
            padding: "80px 40px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  color: "#dbeafe",
                }}
              >
                Trusted Medical Tourism Support
              </p>

              <h1
                style={{
                  fontSize: "52px",
                  fontWeight: "bold",
                  lineHeight: "1.2",
                  marginBottom: "20px",
                }}
              >
                Medical Travel Care for Sri Lankan and Bangladeshi Patients
              </h1>

              <p
                style={{
                  fontSize: "20px",
                  lineHeight: "1.8",
                  color: "#e0f2fe",
                  marginBottom: "30px",
                  maxWidth: "700px",
                }}
              >
                We support your full treatment journey with accommodation options,
                travel coordination, daily package plans, and personalized care support.
              </p>

              <a
                href="/register"
                style={{
                  display: "inline-block",
                  backgroundColor: "white",
                  color: "#111827",
                  padding: "16px 28px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Start Registration
              </a>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "20px",
                padding: "28px",
                backdropFilter: "blur(6px)",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  marginBottom: "18px",
                }}
              >
                What We Help With
              </h2>

              <div style={{ display: "grid", gap: "14px" }}>
                <div style={heroListItem}>Doctor consultation coordination</div>
                <div style={heroListItem}>Hotel stay based on your budget</div>
                <div style={heroListItem}>Travel and local support</div>
                <div style={heroListItem}>Treatment planning assistance</div>
                <div style={heroListItem}>End-to-end patient journey guidance</div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "70px 40px 30px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2
                style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "var(--text)",
                  marginBottom: "12px",
                }}
              >
                Our Medical Travel Packages
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: "var(--text-soft)",
                  lineHeight: "1.7",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                Choose a package based on your preferred comfort and stay level.
                Final treatment duration and total cost will be discussed with you directly.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
                alignItems: "stretch",
              }}
            >
              <div style={packageCard}>
                <div style={premiumBanner}>Premium Care</div>
                <h3 style={packageTitle}>Luxury Medical Stay</h3>
                <p style={priceText}>From $250 per day</p>
                <p style={packageText}>
                  Premium accommodation, priority support, guided coordination,
                  and comfortable stay for patients and companions.
                </p>
                <ul style={featureList}>
                  <li>Luxury hotel stay</li>
                  <li>Priority coordination</li>
                  <li>Comfort-focused experience</li>
                </ul>
              </div>

              <div style={packageCard}>
                <div style={deluxeBanner}>Deluxe Care</div>
                <h3 style={packageTitle}>Balanced Comfort Package</h3>
                <p style={priceText}>From $150 per day</p>
                <p style={packageText}>
                  A practical option with comfortable stay, treatment support,
                  and good value for planned medical travel.
                </p>
                <ul style={featureList}>
                  <li>Comfort hotel stay</li>
                  <li>Daily support assistance</li>
                  <li>Value-based coordination</li>
                </ul>
              </div>

              <div style={packageCard}>
                <div style={budgetBanner}>Budget Care</div>
                <h3 style={packageTitle}>Affordable Care Package</h3>
                <p style={priceText}>From $80 per day</p>
                <p style={packageText}>
                  Budget-friendly accommodation and essential support for
                  patients who want economical medical travel planning.
                </p>
                <ul style={featureList}>
                  <li>Affordable stay option</li>
                  <li>Essential support</li>
                  <li>Simple travel coordination</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "30px 40px 70px" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              backgroundColor: "var(--card)",
              borderRadius: "20px",
              border: "1px solid var(--card-border)",
              padding: "36px",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                fontWeight: "bold",
                color: "var(--text)",
                marginBottom: "20px",
              }}
            >
              How It Works
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
              <div style={stepCard}>
                <div style={stepNumber}>1</div>
                <h3 style={stepTitle}>Register</h3>
                <p style={stepText}>
                  Enter your personal and medical travel details.
                </p>
              </div>

              <div style={stepCard}>
                <div style={stepNumber}>2</div>
                <h3 style={stepTitle}>Discuss Treatment</h3>
                <p style={stepText}>
                  Our team reviews your information and discusses your needs.
                </p>
              </div>

              <div style={stepCard}>
                <div style={stepNumber}>3</div>
                <h3 style={stepTitle}>Receive Package Details</h3>
                <p style={stepText}>
                  Final package and treatment duration are shared by email.
                </p>
              </div>

              <div style={stepCard}>
                <div style={stepNumber}>4</div>
                <h3 style={stepTitle}>Travel with Support</h3>
                <p style={stepText}>
                  We help coordinate your stay and medical journey.
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: "30px",
                backgroundColor: "var(--note-bg)",
                border: "1px solid var(--note-border)",
                borderRadius: "14px",
                padding: "18px",
                color: "var(--note-text)",
                lineHeight: "1.7",
                transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
              }}
            >
              <strong>Important Note:</strong> Package prices are shown per day.
              Final pricing depends on treatment duration, hospital requirements,
              and stay period. Flight tickets, visa, immigration, and other travel-related
              charges are not included in the package. These will vary separately, and our
              team will guide you during the discussion process.
            </div>
          </div>
        </section>

        <section
          style={{
            backgroundColor: "var(--footer-bg)",
            color: "var(--footer-text)",
            padding: "50px 40px",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Begin Your Registration Today
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "var(--footer-soft)",
                marginBottom: "24px",
                lineHeight: "1.7",
              }}
            >
              Submit your information and our team will contact you soon.
            </p>
            <a
              href="/register"
              style={{
                display: "inline-block",
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
                padding: "15px 28px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register Now
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

const heroListItem = {
  backgroundColor: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "12px",
  padding: "14px 16px",
  color: "white",
  fontSize: "16px",
};

const packageCard = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--card-border)",
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "var(--shadow)",
  display: "flex",
  flexDirection: "column" as const,
  height: "100%",
  transition: "background-color 0.3s ease, border-color 0.3s ease",
};

const premiumBanner = {
  display: "inline-block",
  backgroundColor: "#dbeafe",
  color: "#1d4ed8",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "bold" as const,
  marginBottom: "16px",
};

const deluxeBanner = {
  display: "inline-block",
  backgroundColor: "#ede9fe",
  color: "#6d28d9",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "bold" as const,
  marginBottom: "16px",
};

const budgetBanner = {
  display: "inline-block",
  backgroundColor: "#dcfce7",
  color: "#15803d",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "bold" as const,
  marginBottom: "16px",
};

const packageTitle = {
  fontSize: "26px",
  fontWeight: "bold" as const,
  color: "var(--text)",
  marginBottom: "8px",
  minHeight: "70px",
  lineHeight: "1.3",
};

const priceText = {
  fontSize: "20px",
  fontWeight: "bold" as const,
  color: "var(--text)",
  marginBottom: "12px",
  minHeight: "30px",
};

const packageText = {
  color: "var(--text-soft)",
  lineHeight: "1.7",
  marginBottom: "14px",
  minHeight: "120px",
};

const featureList = {
  color: "var(--text)",
  paddingLeft: "18px",
  lineHeight: "1.9",
  margin: 0,
  minHeight: "120px",
};

const stepCard = {
  backgroundColor: "var(--muted-card)",
  border: "1px solid var(--card-border)",
  borderRadius: "16px",
  padding: "20px",
  transition: "background-color 0.3s ease, border-color 0.3s ease",
};

const stepNumber = {
  width: "38px",
  height: "38px",
  borderRadius: "999px",
  backgroundColor: "#111827",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold" as const,
  marginBottom: "14px",
};

const stepTitle = {
  fontSize: "20px",
  fontWeight: "bold" as const,
  color: "var(--text)",
  marginBottom: "8px",
};

const stepText = {
  color: "var(--text-soft)",
  lineHeight: "1.7",
};