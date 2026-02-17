import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, error, clearError } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
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
    if (form.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }
    setSubmitting(true);
    setLocalError("");
    try {
      await signup(form.username, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  const displayError = localError || error;

  return (
    <div className="app">
      <Navbar
        right={
          <Link className="navbar__link" to="/login">
            Login
          </Link>
        }
      />

      <main className="auth">
        <section className="auth__card" aria-label="Sign up">
          <h1 className="auth__title">SignUp</h1>

          {displayError ? (
            <div className="auth__error" role="alert">
              {displayError}
            </div>
          ) : null}

          <form className="auth__form" onSubmit={onSubmit}>
            <label className="auth__field">
              <span className="auth__label">Username</span>
              <input
                className="auth__input"
                value={form.username}
                onChange={update("username")}
                autoComplete="username"
                required
              />
            </label>

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
                autoComplete="new-password"
                required
                minLength={6}
              />
            </label>

            <button className="auth__submit" type="submit" disabled={submitting}>
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="auth__switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
