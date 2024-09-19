import React from "react";
import "../styles/WhyLearnWithUs.css";

const WhyLearnWithUs = () => {
  return (
    <section className="why-learn-section">
      <h2>Why Learn With Us?</h2>
      <div className="feature-list">
        <div className="feature-item">
          <div className="feature-image"></div>
          <div className="feature-content">
            <div className="feature-icon">1</div>
            <h3>Code from Flowchart</h3>
            <p>Generate code directly from visual flowcharts, making development faster and more intuitive.</p>
          </div>
        </div>
        <div className="feature-item reverse">
          <div className="feature-image"></div>
          <div className="feature-content">
            <div className="feature-icon">2</div>
            <h3>Ready-Made Templates</h3>
            <p>Get started quickly with pre-built templates designed for a variety of development scenarios.</p>
          </div>
          
        </div>
        <div className="feature-item">
          <div className="feature-image"></div>
          <div className="feature-content">
            <div className="feature-icon">3</div>
            <h3>Learn and Transition</h3>
            <p>Transition seamlessly from flowcharts to real-world coding practices.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLearnWithUs;