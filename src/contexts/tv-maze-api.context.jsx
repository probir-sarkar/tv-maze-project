// import useStates, useEffects, createContext, and axios
import { useLocalStorage } from "@uidotdev/usehooks";
import useSWR from "swr";
import React, { useState, useEffect, createContext } from "react";
const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};
// create and export the context
export const TvMazeContext = createContext();

// create and export the provider
export const TvMazeProvider = ({ children }) => {
  const [bookedTickets, setBookedTickets] = useLocalStorage("bookedTickets", []);
  // SWR configuration
  const { data: shows, error } = useSWR("https://api.tvmaze.com/shows", fetcher, { fallbackData: [] });
  const isBooked = (showId) => {
    return bookedTickets.find((ticket) => ticket.id === showId);
  };

  const value = { shows, bookedTickets, setBookedTickets, isBooked };

  // return the provider
  return <TvMazeContext.Provider value={value}>{children}</TvMazeContext.Provider>;
};
