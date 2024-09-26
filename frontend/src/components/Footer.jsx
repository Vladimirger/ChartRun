import "../styles/Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">ChartRun</Link>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>Product</h3>
            <ul>
              <li><Link to="/landing-page">Landing Page</Link></li>
              <li><Link to="/popup-builder">Popup Builder</Link></li>
              <li><Link to="/web-design">Web-design</Link></li>
              <li><Link to="/content">Content</Link></li>
              <li><Link to="/integrations">Integrations</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Use Cases</h3>
            <ul>
              <li><Link to="/web-designers">Web-designers</Link></li>
              <li><Link to="/marketers">Marketers</Link></li>
              <li><Link to="/small-business">Small Business</Link></li>
              <li><Link to="/website-builder">Website Builder</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/academy">Academy</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/themes">Themes</Link></li>
              <li><Link to="/hosting">Hosting</Link></li>
              <li><Link to="/developers">Developers</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/teams">Teams</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;