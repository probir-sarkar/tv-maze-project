// import useStates, useEffects, createContext, and axios
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

// create and export the context
export const TvMazeContext = createContext();

// create and export the provider
export const TvMazeProvider = ({ children }) => {
  // create a state
  const [shows, setShows] = useState([]);

  // create a function to fetch data
  const getShows = async () => {
    const { data } = await axios.get(
      "https://api.tvmaze.com/search/shows?q=all"
    );
    setShows(data);
  };

  // call the function in useEffect
  useEffect(() => {
    getShows();
  }, []);

  const value = { shows };

  // return the provider
  return (
    <TvMazeContext.Provider value={value}>{children}</TvMazeContext.Provider>
  );
};
