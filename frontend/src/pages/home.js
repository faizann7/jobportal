import axios from "axios";
import React, { useState, useEffect } from "react";
import Cards from "../components/Cards/Cards";
import FeaturedCompanies from "../components/HeroSection/FeaturedCompanies";
import HeroSection from "../components/HeroSection/HeroSection";
import Naavbar from "../components/Naavbar";
import Searchbar from "../components/SearchBar.js/Searchbar";

const Home = () => {
  return (
    <div>
      {/* <Searchbar /> */}
      <HeroSection />
      <FeaturedCompanies />
      {/* <Cards /> */}
    </div>
  );
};
export default Home;
