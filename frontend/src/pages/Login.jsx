import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8001";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      console.log("Login response:", data);

      if (!response.ok) {
        if (response.status === 401) {
          setError("Invalid username or password.");
        } else if (response.status === 403) {
          setError(
            "Face verification failed. Access denied."
          );
        } else {
          setError(
            data.detail ||
              data.message ||
              "Authentication failed."
          );
        }

        return;
      }

      /*
       * Your backend may return the JWT using
       * access_token or token.
       */
      const token =
        data.access_token ||
        data.token ||
        data.accessToken;

      if (!token) {
        console.error(
          "No access token returned by backend:",
          data
        );

        setError(
          "Login succeeded but no access token was returned."
        );

        return;
      }

      /*
       * Save authentication token.
       */
      localStorage.setItem("access_token", token);

      /*
       * Save user information if backend provides it.
       */
      if (data.user) {
        localStorage.setItem(
          "current_user",
          JSON.stringify(data.user)
        );
      }

      /*
       * Save username.
       */
      localStorage.setItem(
        "current_username",
        username.trim()
      );

      /*
       * Save role if backend provides it.
       */
      if (data.role) {
        localStorage.setItem(
          "user_role",
          data.role
        );
      }

      /*
       * Login successful.
       */
      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Cannot connect to the authentication server. Make sure the backend is running on port 8001."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* Background decoration */}
      <div style={styles.glowOne}></div>
      <div style={styles.glowTwo}></div>

      <div style={styles.wrapper}>

        {/* =========================
            LEFT PANEL
        ========================== */}

        <div style={styles.leftPanel}>

          <div style={styles.brand}>
            <div style={styles.logo}>
              AI
            </div>

            <div>
              <div style={styles.brandName}>
                SIGNAL INTELLIGENCE
              </div>

              <div style={styles.brandSub}>
                AI DEFENCE INTELLIGENCE SYSTEM
              </div>
            </div>
          </div>

          <div style={styles.leftContent}>

            <div style={styles.secureBadge}>
              <span style={styles.greenDot}></span>
              SECURE SYSTEM
            </div>

            <h1 style={styles.heading}>
              AI Hidden-Signal
              <br />

              <span style={styles.headingBlue}>
                Communication
              </span>
            </h1>

            <p style={styles.description}>
              Secure communication intelligence platform
              designed to detect suspicious communication
              patterns using artificial intelligence.
            </p>

            <div style={styles.features}>

              <Feature
                icon="◉"
                title="AI Signal Detection"
                text="Analyze communication for hidden and suspicious patterns."
              />

              <Feature
                icon="◆"
                title="Restricted Access"
                text="Only authorized personnel can access intelligence data."
              />

              <Feature
                icon="✓"
                title="Real-Time Analysis"
                text="Monitor communication and detection activity."
              />

            </div>

          </div>

          <div style={styles.classified}>
            CLASSIFIED SYSTEM • AUTHORIZED ACCESS ONLY
          </div>

        </div>

        {/* =========================
            RIGHT PANEL
        ========================== */}

        <div style={styles.rightPanel}>

          <div style={styles.loginCard}>

            <div style={styles.lock}>
              🔐
            </div>

            <h2 style={styles.title}>
              Secure Access
            </h2>

            <p style={styles.subtitle}>
              Authenticate to access the intelligence
              dashboard.
            </p>

            {error && (
              <div style={styles.error}>
                <span>⚠</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>

              {/* USERNAME */}

              <div style={styles.group}>

                <label style={styles.label}>
                  AUTHORIZED USER
                </label>

                <div style={styles.inputBox}>

                  <span style={styles.inputIcon}>
                    👤
                  </span>

                  <input
                    type="text"
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                    placeholder="Enter username"
                    autoComplete="username"
                    disabled={loading}
                    style={styles.input}
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div style={styles.group}>

                <label style={styles.label}>
                  PASSWORD
                </label>

                <div style={styles.inputBox}>

                  <span style={styles.inputIcon}>
                    🔑
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter password"
                    autoComplete="current-password"
                    disabled={loading}
                    style={styles.input}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    style={styles.showButton}
                  >
                    {showPassword
                      ? "HIDE"
                      : "SHOW"}
                  </button>

                </div>

              </div>

              {/* SECURITY MESSAGE */}

              <div style={styles.securityBox}>

                <div style={styles.securityIcon}>
                  🛡
                </div>

                <div>

                  <div style={styles.securityTitle}>
                    Multi-Factor Authentication
                  </div>

                  <div style={styles.securityText}>
                    Authorized users may be required
                    to complete face verification.
                  </div>

                </div>

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.loginButton,
                  opacity: loading ? 0.65 : 1,
                }}
              >

                {loading ? (
                  <>
                    <span>◌</span>
                    AUTHENTICATING...
                  </>
                ) : (
                  <>
                    ACCESS SECURE SYSTEM
                    <span style={styles.arrow}>
                      →
                    </span>
                  </>
                )}

              </button>

            </form>

            <div style={styles.divider}>
              <span></span>
              <small>
                AUTHORIZED PERSONNEL
              </small>
              <span></span>
            </div>

            <div style={styles.warning}>
              ⚠ Unauthorized access attempts may be
              logged and monitored.
            </div>

          </div>

          <div style={styles.version}>
            AI Hidden-Signal Communication • Secure
            Intelligence Platform
          </div>

        </div>

      </div>

    </div>
  );
}


/* =====================================
   FEATURE COMPONENT
===================================== */

function Feature({ icon, title, text }) {
  return (
    <div style={styles.feature}>

      <div style={styles.featureIcon}>
        {icon}
      </div>

      <div>
        <div style={styles.featureTitle}>
          {title}
        </div>

        <div style={styles.featureText}>
          {text}
        </div>
      </div>

    </div>
  );
}


/* =====================================
   STYLES
===================================== */

const styles = {

  page: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, #050d18, #0a1727, #0d1c30)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      "Inter, Segoe UI, Arial, sans-serif",
    color: "#ffffff",
  },

  glowOne: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    border:
      "1px solid rgba(0,190,255,0.07)",
    top: "-250px",
    right: "-150px",
  },

  glowTwo: {
    position: "absolute",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    border:
      "1px solid rgba(0,190,255,0.05)",
    bottom: "-250px",
    left: "-180px",
  },

  wrapper: {
    width: "92%",
    maxWidth: "1200px",
    minHeight: "680px",
    display: "flex",
    borderRadius: "22px",
    overflow: "hidden",
    position: "relative",
    zIndex: 2,
    background:
      "rgba(10,22,38,0.96)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 30px 80px rgba(0,0,0,0.5)",
  },

  leftPanel: {
    width: "52%",
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background:
      "linear-gradient(145deg,#081a2c,#071320)",
    borderRight:
      "1px solid rgba(255,255,255,0.06)",
  },

  rightPanel: {
    width: "48%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    background:
      "rgba(12,25,42,0.9)",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  logo: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    background:
      "linear-gradient(135deg,#00c6ff,#0072ff)",
    boxShadow:
      "0 8px 25px rgba(0,150,255,0.25)",
  },

  brandName: {
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  brandSub: {
    marginTop: "4px",
    fontSize: "9px",
    color: "#71849a",
    letterSpacing: "1.2px",
  },

  leftContent: {
    maxWidth: "530px",
  },

  secureBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "7px 12px",
    borderRadius: "20px",
    background:
      "rgba(0,220,170,0.07)",
    border:
      "1px solid rgba(0,220,170,0.16)",
    color: "#43e2b5",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "22px",
  },

  greenDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#35e0aa",
    boxShadow:
      "0 0 10px #35e0aa",
  },

  heading: {
    margin: "0 0 20px",
    fontSize: "42px",
    lineHeight: "1.08",
    fontWeight: "800",
    letterSpacing: "-1.5px",
  },

  headingBlue: {
    color: "#22c8ff",
  },

  description: {
    color: "#8ea2b8",
    fontSize: "14px",
    lineHeight: "1.8",
    maxWidth: "500px",
    marginBottom: "32px",
  },

  features: {
    display: "flex",
    flexDirection: "column",
    gap: "19px",
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  featureIcon: {
    width: "38px",
    height: "38px",
    flexShrink: 0,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#29c9ff",
    background:
      "rgba(0,180,255,0.08)",
    border:
      "1px solid rgba(0,180,255,0.13)",
  },

  featureTitle: {
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "4px",
  },

  featureText: {
    fontSize: "10px",
    color: "#71849a",
    lineHeight: "1.5",
  },

  classified: {
    color: "#4d6279",
    fontSize: "9px",
    letterSpacing: "1.2px",
  },

  loginCard: {
    width: "100%",
    maxWidth: "420px",
    padding: "34px",
    borderRadius: "18px",
    background:
      "rgba(18,34,54,0.85)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 20px 55px rgba(0,0,0,0.25)",
  },

  lock: {
    width: "52px",
    height: "52px",
    borderRadius: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "rgba(0,180,255,0.08)",
    border:
      "1px solid rgba(0,180,255,0.14)",
    fontSize: "22px",
    marginBottom: "17px",
  },

  title: {
    margin: "0",
    fontSize: "28px",
    fontWeight: "800",
  },

  subtitle: {
    margin:
      "7px 0 27px",
    color: "#7e92a9",
    fontSize: "12px",
    lineHeight: "1.6",
  },

  error: {
    display: "flex",
    gap: "9px",
    padding: "12px",
    borderRadius: "9px",
    marginBottom: "18px",
    color: "#ff8b8b",
    background:
      "rgba(255,60,60,0.08)",
    border:
      "1px solid rgba(255,60,60,0.18)",
    fontSize: "11px",
    lineHeight: "1.5",
  },

  group: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    color: "#8195ab",
    fontSize: "9px",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    minHeight: "50px",
    borderRadius: "10px",
    background: "#091625",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  inputIcon: {
    paddingLeft: "14px",
    fontSize: "14px",
    opacity: 0.7,
  },

  input: {
    flex: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#ffffff",
    padding: "13px 11px",
    fontSize: "12px",
  },

  showButton: {
    border: "none",
    background: "transparent",
    color: "#2fcaff",
    cursor: "pointer",
    fontSize: "9px",
    fontWeight: "700",
    padding: "10px",
  },

  securityBox: {
    display: "flex",
    gap: "11px",
    padding: "12px",
    margin:
      "3px 0 19px",
    borderRadius: "9px",
    background:
      "rgba(0,170,255,0.05)",
    border:
      "1px solid rgba(0,170,255,0.1)",
  },

  securityIcon: {
    fontSize: "16px",
  },

  securityTitle: {
    fontSize: "10px",
    fontWeight: "700",
    marginBottom: "4px",
  },

  securityText: {
    color: "#71859c",
    fontSize: "9px",
    lineHeight: "1.5",
  },

  loginButton: {
    width: "100%",
    minHeight: "51px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#00bfff,#0078ff)",
    color: "#ffffff",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow:
      "0 10px 25px rgba(0,130,255,0.2)",
  },

  arrow: {
    fontSize: "17px",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin:
      "23px 0 13px",
  },

  warning: {
    textAlign: "center",
    color: "#60748b",
    fontSize: "9px",
    lineHeight: "1.6",
  },

  version: {
    marginTop: "16px",
    color: "#52667d",
    fontSize: "8px",
    letterSpacing: "0.6px",
    textAlign: "center",
  },
};