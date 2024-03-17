// import useState, useEffect, useContext, and TvMazeContext
import React, { useContext, useEffect, useState } from "react";
import { TvMazeContext } from "./contexts/tv-maze-api.context";
import { useSearchParams } from "react-router-dom";

import ShowCard from "./components/show-card/show-card.component";

import "./App.scss";
import { Link } from "react-router-dom";

function App() {
  const { shows, bookedTickets } = useContext(TvMazeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const bookedTab = searchParams.get("booked");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const allShows = bookedTab ? bookedTickets : shows;
    const results = allShows.filter((show) => show.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [searchTerm, shows, bookedTab]);

  return (
    <div className="App">
      <div className="container-fluid main-hero">
        <div className="row">
          <div className="col-md-12 hero-text">
            <h1 className="text-center">TV SHOWS</h1>
          </div>
        </div>
      </div>
      {/* tab for all shows and bokked */}
      <div className="d-flex justify-content-center">
        <div className="btn-group btn-group-toggle ">
          <Link to="/" className={`btn btn-dark ${bookedTab ? "active" : ""}`}>
            All Shows
          </Link>
          <Link to="/?booked=true" className={`btn btn-dark ${bookedTab ? "" : "active"}`}>
            Booked
          </Link>
        </div>
      </div>
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
        <>
          {searchResults.length === 0 ? (
            <div className="text-center">
              <h2>No shows found</h2>
            </div>
          ) : (
            searchResults.map((show, index) => <ShowCard key={show.id} show={show} index={index} />)
          )}
        </>
      </div>
    </div>
  );
}

export default App;
