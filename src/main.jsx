import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import { TvMazeProvider } from "./contexts/tv-maze-api.context";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import AboutShow from "./components/about-show/about-show.component";
import BookTicket from "./components/book-ticket/book-ticket.component";

const router = createBrowserRouter([
  // root route
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/shows/:id",
    element: <AboutShow />,
  },
  {
    path: "/shows/:id/book-ticket",
    element: <BookTicket />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TvMazeProvider>
      <RouterProvider router={router} />
    </TvMazeProvider>
  </React.StrictMode>
);
