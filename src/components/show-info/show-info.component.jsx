import React,{ useContext } from "react";
import { Link } from "react-router";
import { TvMazeContext } from "../../contexts/tv-maze-api.context";

const ShowInfo = ({ showDetails, handleProcessToBookTicket }) => {
  const { isBooked } = useContext(TvMazeContext);
  return (
    <>
      <div className="col-md-6">
        <h3>Type</h3>
        <p>{showDetails.type}</p>
        <h3>Language</h3>
        <p>{showDetails.language}</p>
        <h3>Genere</h3>
        <p>{showDetails.genres.map((genre) => genre + ", ")}</p>
      </div>
      <div className="col-md-6">
        <h3>Official Site</h3>
        <p>{showDetails.officialSite}</p>
        <h3>Schedule</h3>
        <p>
          {showDetails.schedule.days.map((day) => day + " ")}, {showDetails.schedule.time}
        </p>

        <h3>Avarage Runtime</h3>
        <p>{showDetails.averageRuntime}</p>
      </div>
      <div className="mobile-screen-btn row w-100 ">
        <div className="col-md-4 mt-4">
          <Link to="/" className="show-btn">
            Back to shows
          </Link>
        </div>
        <div className="col-md-8 mt-4">
          <button className="show-btn dark" onClick={handleProcessToBookTicket}>
            {isBooked(showDetails.id) ? "View Ticket" : "Process to Book Ticket"}
          </button>
        </div>
      </div>
    </>
  );
};
export default ShowInfo;
