import React, { useState } from "react";

const Services = () => {
  const [dropdown, setDropdown] = useState("apple");
  const [radio, setRadio] = useState("applicant");
  return (
    <div>
      <h1>Services</h1>
      <form>
        <h1>Select User: {radio}</h1>
        <label>Applicant</label>
        <input
          type="radio"
          checked={radio === "applicant"}
          value="applicant"
          onChange={(e) => {
            setRadio(e.target.value);
          }}
        />
        <label>Recruiter</label>
        <input
          type="radio"
          checked={radio === "recruiter"}
          value="recruiter"
          onChange={(e) => {
            setRadio(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default Services;
