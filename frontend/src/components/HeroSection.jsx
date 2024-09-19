import React from "react";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1><span className="first_line">Design, Build, and Code </span><br /> <span className="second_line">with Flowcharts<span/></span></h1>
          <p>Get done more, write better</p>
          <button className="cta-button">Try ChartRun</button>
        </div>
        <div className="hero-icons">
          <div className="icon-item">
            <span className="circle"></span>
            <img src="src/assets/speed.png" alt="speed icon" />
            <span>Code Visually with Speed</span>
          </div>
          <div className="icon-item">
            <span className="circle"></span>
            <img src="src/assets/workflow.png" alt="workflow icon" />
            <span>Automate Complex Workflows</span>
          </div>
          <div className="icon-item">
            <span className="circle"></span>
            <img src="src/assets/coding.png" alt="coding icon" />
            <span>Streamline Development Process</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
