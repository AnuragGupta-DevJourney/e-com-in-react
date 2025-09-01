import React from "react";
import Navbar from "../navbar/Navbar";
import LandingCarousel from "./LandingCarousel";
import ParellexEffect from "./ParellexEffect";
import ServicesSection from "./ServicesSection";

function Home() {
  return (
    <>
      <LandingCarousel />
      <ParellexEffect />
      <ServicesSection />
    </>
  );
}

export default Home;
