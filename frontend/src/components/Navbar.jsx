import { Link } from "react-router-dom";

export default function Navbar({ right }) {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo">
          <Link className="navbar__logoLink" to="/">
            ProConnect
          </Link>
        </div>

        <nav className="navbar__actions" aria-label="Account">
          {right !== undefined ? (
            right
          ) : (
            <>
              <Link className="navbar__link" to="/login">
                Sign In
              </Link>
              <Link className="navbar__link" to="/signup">
                Join Now
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
