import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WhyLearnWithUs from "../components/WhyLearnWithUs";
import "../styles/Landing.css";

const Landing = () => {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <WhyLearnWithUs />
    </>
  );
};

export default Landing;
