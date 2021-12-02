import axios from "axios";
import React, { useState, useEffect } from "react";
import Cards from "../components/Cards/Cards";
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Cards />
    </div>
  );
};
export default Home;
