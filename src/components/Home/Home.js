import React from "react";
import "./Home.css";
import Calculator from "../Calculator";

function Home() {
  return (
    <div className="home-container">
      <Calculator />
      <small>by Stephan</small>
    </div>
  );
}

export default Home;
