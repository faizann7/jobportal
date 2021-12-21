import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Jobhunt } from "./jobhunt.svg";
import "./hero.scss";
const HeroSection = () => {
  return (
    <div>
      <section class="container-hero row hero-body">
        <div class="content-hero row">
          <h2 className="main-heading">
            Find Your Dream Job <span className="hero-span">Fast!</span>
          </h2>
          <Link to="/findjobs" class="btn">
            Find Jobs
          </Link>
        </div>
        <div class="img-body row">
          <Jobhunt className="jobhunt" />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
