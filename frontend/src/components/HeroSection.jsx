import React from "react";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>Design, Build, and Code <br /> with Flowcharts</h1>
          <p>Get done more, write better</p>
          <button className="cta-button">Try ChartRun</button>
        </div>
        <div className="hero-icons">
          <div className="icon-item">
            <i className="icon-code-visual"></i>
            <p>Code Visually with Speed</p>
          </div>
          <div className="icon-item">
            <i className="icon-automate-workflows"></i>
            <p>Automate Complex Workflows</p>
          </div>
          <div className="icon-item">
            <i className="icon-streamline-process"></i>
            <p>Streamline Development Process</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
