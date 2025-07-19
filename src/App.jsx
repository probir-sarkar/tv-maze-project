import React, { useContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useIntersectionObserver, useDebounce } from "@uidotdev/usehooks";

import { TvMazeContext } from "./contexts/tv-maze-api.context";
import TvMazeApi from "./api/tv-maze.api";
import ShowCard from "./components/show-card/show-card.component";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const { bookedTickets } = useContext(TvMazeContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const bookedTab = searchParams.get("booked");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchChange = (event) => {
    setSearchParams({ search: event.target.value });
  };

  // Infinite shows query
  const {
    data: infinitePages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["shows"],
    queryFn: ({ pageParam = 0 }) => TvMazeApi.getAllShows({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length ? allPages.length : undefined,
    refetchOnWindowFocus: false,
  });

  // Search query
  const { data: searchResults = [] } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: () => TvMazeApi.searchShows(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
  });

  // Intersection observer for infinite scroll
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    rootMargin: "0px",
  });

  // Trigger fetchNextPage on intersection
  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten infinite query results
  const infiniteData = useMemo(
    () => infinitePages?.pages.flatMap((page) => page.data) ?? [],
    [infinitePages]
  );

  // Final shows to render based on tab & search
  const showsToRender = useMemo(() => {
    if (bookedTab) return bookedTickets;
    if (searchTerm) return searchResults;
    return infiniteData;
  }, [bookedTab, bookedTickets, searchTerm, searchResults, infiniteData]);

  return (
    <div className="App">
      <header className="container-fluid main-hero">
        <div className="row">
          <div className="col-md-12 hero-text">
            <h1 className="text-center">TV SHOWS</h1>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="d-flex justify-content-center mb-3">
        <div className="btn-group btn-group-toggle">
          <Link to="/" className={`btn btn-dark ${!bookedTab ? "active" : ""}`}>
            All Shows
          </Link>
          <Link
            to="/?booked=true"
            className={`btn btn-dark ${bookedTab ? "active" : ""}`}
          >
            Booked
          </Link>
        </div>
      </div>

      {/* Search box */}
      <div className="search-filter mb-3">
        <div className="input-box">
          <input
            type="text"
            placeholder="Search For a Show..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Show cards */}
      <div className="show-card-div">
        {showsToRender.length === 0 ? (
          <div className="text-center">
            <h2>{isLoading ? "Loading..." : "No Shows Found"}</h2>
          </div>
        ) : (
          <>
            {showsToRender.map((show, index) => (
              <ShowCard key={show.id} show={show} index={index} />
            ))}
            {!searchTerm && !bookedTab && (
              <div ref={ref} className="text-center my-3">
                {isFetchingNextPage && <p>Loading more shows...</p>}
                {!hasNextPage && <p>All shows loaded.</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
