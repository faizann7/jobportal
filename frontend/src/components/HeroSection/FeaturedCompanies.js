import React from "react";
import { ReactComponent as Careem } from "../../images/careem.svg";
import { ReactComponent as EY } from "../../images/ey.svg";
import { ReactComponent as Nestle } from "../../images/nestle.svg";
import { ReactComponent as Unilever } from "../../images/unilever.svg";
import "./companies.scss";

const FeaturedCompanies = () => {
  return (
    <div className="companyContainer">
      <Careem className="svg" />
      <EY className="svg" />
      <Nestle className="svg" />
      <Unilever className="svg" />
    </div>
  );
};

export default FeaturedCompanies;
