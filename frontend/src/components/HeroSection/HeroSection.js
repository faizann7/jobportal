import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Jobhunt } from "./jobhunt.svg";
import "./hero.scss";
import Pagination from "../Pagination/Pagination";
const HeroSection = () => {
  return (
    <div>
      <section class="container-hero row hero-body">
        <div class="content-hero row">
          <h2 className="main-heading">
            Find Your Dream Job <span className="hero-span">Fast!</span>
          </h2>
          <Link to="#" class="btn">
            Find Jobs
          </Link>
          <div class="boxContainer">
            <input className="searchbox" placeholder="Search" />
            <button to="#" class="search-btn">
              Search
            </button>
          </div>
        </div>
        <div class="img-body row">
          <Jobhunt className="jobhunt" />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
