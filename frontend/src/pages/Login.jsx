import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login, error, clearError } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setLocalError("");
    clearError();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setLocalError("");
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const displayError = localError || error;

  return (
    <div className="app">
      <Navbar
        right={
          <Link className="navbar__link" to="/signup">
            Join Now
          </Link>
        }
      />

      <main className="auth">
        <section className="auth__card" aria-label="Login">
          <h1 className="auth__title">Login</h1>

          {displayError ? (
            <div className="auth__error" role="alert">
              {displayError}
            </div>
          ) : null}

          <form className="auth__form" onSubmit={onSubmit}>
            <label className="auth__field">
              <span className="auth__label">Email address</span>
              <input
                className="auth__input"
                type="email"
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
                required
              />
            </label>

            <label className="auth__field">
              <span className="auth__label">Password</span>
              <input
                className="auth__input"
                type="password"
                value={form.password}
                onChange={update("password")}
                autoComplete="current-password"
                required
              />
            </label>

            <button className="auth__submit" type="submit" disabled={submitting}>
              {submitting ? "Logging in…" : "Login"}
            </button>
          </form>

          <p className="auth__switch">
            Don't have an account? <Link to="/signup">Join Now</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
