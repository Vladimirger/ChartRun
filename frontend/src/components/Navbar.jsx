
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="src/assets/Logo.png" alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/tools">Tools</Link></li>
        <li><Link to="/templates">Templates</Link></li>
        <li><Link to="/pricing">Pricing</Link></li>
      </ul>
      <div className="auth-buttons">
        <Link to="/login" className="login-btn">Log in</Link>
        <Link to="/signup" className="signup-btn">Sign up free</Link>
      </div>
    </nav>
  );
};

export default Navbar;
