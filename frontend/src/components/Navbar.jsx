import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="navbar">
      <div className="left">
        <Link to = "/login">Login</Link>
        <Link to = "/signup">Sign Up</Link>
      </div>
    </section>
  );
};

export default Navbar;
