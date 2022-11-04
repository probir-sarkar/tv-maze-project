import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { TvMazeContext } from "../../contexts/tv-maze-api.context";

import ShowInfo from "../show-info/show-info.component";
import BookTicket from "../book-ticket/book-ticket.component";

import "./about-show.styles.scss";

const AboutShow = () => {
  const { id } = useParams();
  // usecontext after page refresh
  const { shows } = useContext(TvMazeContext);
  const [showDetails, setShowDetails] = useState({});
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  useEffect(() => {
    const findShow = shows.find((show) => show.show.id === parseInt(id));
    if (findShow) {
      setShowDetails(findShow.show);
    }
  }, [id, shows]);

  const handleProcessToBookTicket = () => {
    setBookingFormOpen(true);
  };
  const handleBackToDetails = () => {
    setBookingFormOpen(false);
  };

  if (!showDetails) return null;

  if (showDetails.id === parseInt(id)) {
    return (
      <>
        <div className="container-fluid about-container-top bg-black py-5 mb-3">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-white text-center">
                {bookingFormOpen ? "BOOK TICKET" : "SHOW DETAILS"}
              </h1>
            </div>
          </div>
        </div>

        <div className="container-fluid about-container">
          <div className="row p-4">
            <div className="col-md-4">
              <img
                src={showDetails.image.original}
                className="img-fluid rounded"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="show-name mb-4 p-4 rounded">
                <h1>{showDetails.name}</h1>
                <p>{showDetails.summary.replace(/(<([^>]+)>)/gi, "")}</p>
              </div>
              <div className="row w-100 mx-auto small-details">
                {!bookingFormOpen ? (
                  <ShowInfo
                    showDetails={showDetails}
                    handleProcessToBookTicket={handleProcessToBookTicket}
                  />
                ) : (
                  <BookTicket
                    showDetails={showDetails}
                    handleBackToDetails={handleBackToDetails}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AboutShow;
