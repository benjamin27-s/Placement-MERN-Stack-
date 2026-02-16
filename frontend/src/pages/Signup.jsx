import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { saveProfile } from "../utils/profileStorage.js";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    saveProfile({
      completed: false,
      type: null,
      createdAt: new Date().toISOString(),
      account: {
        username: form.username.trim(),
        email: form.email.trim(),
      },
    });
    navigate("/dashboard");
  };

  const onGoogle = () => {
    saveProfile({
      completed: false,
      type: null,
      createdAt: new Date().toISOString(),
      account: {
        username: form.username.trim(),
        email: form.email.trim(),
      },
    });
    navigate("/dashboard");
  };

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

          <button className="auth__google" type="button" onClick={onGoogle}>
            Sign up with Google
          </button>

          <div className="auth__divider" aria-hidden="true">
            <span>or</span>
          </div>

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
              />
            </label>

            <button className="auth__submit" type="submit">
              Create account
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
