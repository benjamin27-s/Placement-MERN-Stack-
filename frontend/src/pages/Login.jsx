import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

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

            <button className="auth__submit" type="submit">
              Login
            </button>
          </form>

          <p className="auth__switch">
            Don’t have an account? <Link to="/signup">Join Now</Link>
          </p>
        </section>
      </main>
    </div>
  );
}

