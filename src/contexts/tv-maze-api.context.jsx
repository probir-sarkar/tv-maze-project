/* eslint-disable react/prop-types */
// import useStates, useEffects, createContext, and axios
import { useLocalStorage } from "@uidotdev/usehooks";
import React, { useState, useEffect, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import TvMazeApi from "../api/tv-maze.api";
// create and export the context
export const TvMazeContext = createContext();

// create and export the provider
export const TvMazeProvider = ({ children }) => {
  const [bookedTickets, setBookedTickets] = useLocalStorage("bookedTickets", []);
  const {data } = useQuery({
    queryKey: ["all-shows"],
    queryFn: () => TvMazeApi.getAllShows(),
  });
  const shows = data || [];
  const isBooked = (showId) => {
    return bookedTickets.find((ticket) => ticket.id === showId);
  };
  const deleteTicket = (showId) => {
    setBookedTickets(bookedTickets.filter((ticket) => ticket.id !== showId));
  };

  const value = { shows, bookedTickets, setBookedTickets, isBooked,deleteTicket };

  // return the provider
  return <TvMazeContext.Provider value={value}>{children}</TvMazeContext.Provider>;
};
