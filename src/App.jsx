// import useState, useEffect, useContext, and TvMazeContext
import React, { useContext, useEffect, useState } from "react";
import { TvMazeContext } from "./contexts/tv-maze-api.context";

import ShowCard from "./components/show-card/show-card.component";

import "./App.scss";

function App() {
  const { shows } = useContext(TvMazeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = shows.filter((show) =>
      show.show.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, shows]);

  return (
    <div className="App">
      <div className="container-fluid main-hero">
        <div className="row">
          <div className="col-md-12 hero-text">
            <h1 className="text-center">TV SHOWS</h1>
          </div>
        </div>
      </div>
      {/* search filter */}

      <div className="search-filter">
        <div className="input-box">
          <input
            type="text"
            placeholder="Search For Movie...."
            value={searchTerm}
            onChange={(event) => handleSearchChange(event)}
          />
        </div>
      </div>

      <div className="show-card-div">
        {searchResults.map(({ show }, index) => {
          return <ShowCard key={show.id} show={show} index={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
