import React from "react";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>
            Design, Build, and Code
            <br />
            <span className="highlight">with Flowcharts</span>
          </h1>
          <p className="subtitle">Get done more, write better</p>
          <button className="try-chartrun-btn">
            <span className="btn-icon">→</span>
            Try ChartRun
          </button>
          <div className="hero-features">
            <div className="feature-item">
              <div className="icon-wrapper">
                <img src="src/assets/speed.png" alt="Speed icon" />
              </div>
              <span>Code Visually with Speed</span>
            </div>
            <div className="feature-item">
              <div className="icon-wrapper">
                <img src="src/assets/workflow.png" alt="Workflow icon" />
              </div>
              <span>Automate Complex Workflows</span>
            </div>
            <div className="feature-item">
              <div className="icon-wrapper">
                <img src="src/assets/coding.png" alt="Process icon" />
              </div>
              <span>Streamline Development Process</span>
            </div>
          </div>
          <div className="rating-section">
            <div className="stars">★★★★★</div>
            <p>2M+ Professionals choose us</p>
          </div>
        </div>
      </div>
      <div className="image-placeholder"></div>
    </section>
  );
};

export default HeroSection;