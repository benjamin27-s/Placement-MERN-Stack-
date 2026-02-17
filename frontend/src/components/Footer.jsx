import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__inner">
                <div className="footer__grid">
                    <div className="footer__col">
                        <h3 className="footer__brand">ProConnect</h3>
                        <p className="footer__tagline">
                            The modern platform connecting top freelancers with amazing projects worldwide.
                        </p>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__heading">Platform</h4>
                        <ul className="footer__list">
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__heading">Categories</h4>
                        <ul className="footer__list">
                            <li>Graphics & Design</li>
                            <li>Programming & Tech</li>
                            <li>Digital Marketing</li>
                            <li>AI Services</li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__heading">Company</h4>
                        <ul className="footer__list">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Privacy Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© {new Date().getFullYear()} ProConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
