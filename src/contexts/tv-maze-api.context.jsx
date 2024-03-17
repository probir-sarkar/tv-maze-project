// import useStates, useEffects, createContext, and axios
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

// create and export the context
export const TvMazeContext = createContext();

// create and export the provider
export const TvMazeProvider = ({ children }) => {
  // create a state
  const [shows, setShows] = useState([]);
  const [bookedTickets, setBookedTickets] = useLocalStorage("bookedTickets", []);

  // create a function to fetch data
  const getShows = async () => {
    const { data } = await axios.get("https://api.tvmaze.com/shows");
    setShows(data);
  };

  // call the function in useEffect
  useEffect(() => {
    getShows();
  }, []);
  const isBooked = (showId) => {
    return bookedTickets.find((ticket) => ticket.id === showId);
  };

  const value = { shows, setShows, bookedTickets, setBookedTickets, isBooked };

  // return the provider
  return <TvMazeContext.Provider value={value}>{children}</TvMazeContext.Provider>;
};
