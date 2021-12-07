import React, { useState } from "react";
import "./searchbar.scss";
const Searchbar = () => {
  const [query, setQuery] = useState("");
  return (
    <div>
      <form
        onsubmit="event.preventDefault();"
        role="search"
        className="filterbar"
      >
        <input
          className="bar"
          type="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="filterButton">Search</button>
      </form>
    </div>
  );
};

export default Searchbar;
