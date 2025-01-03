import React from "react";
import { useSearchParams } from "react-router";

import "./show-ticket.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useContext } from "react";
import { TvMazeContext } from "@/contexts/tv-maze-api.context";

const ShowTicket = ({ ticket }) => {
  const { id, showName, ticketDetails } = ticket;
  const { name, email, phone, date, time, seats } = ticketDetails;
  const { deleteTicket } = useContext(TvMazeContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBackToDetails = () => {
    setSearchParams({});
  };
  const handleEditTicket = () => {
    setSearchParams({ booking: "true", edit: "true" });
  };

  const handleDeleteTicket = () => {
    deleteTicket(id);
    handleBackToDetails();
  };

  return (
    <>
      <div className="ticket-container">
        <div className="header border-bottom mb-4 ">
          <div className="show-info ">
            <div className="badge badge-dark bg-dark">Show ID: {id}</div>
            <h2 className="fw-bolder my-1"> {showName}</h2>
            <p className="display-1">Show this ticket at the entrance</p>
          </div>
          <div className="delete-btn">
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip className="button-tooltip">Delete Ticket</Tooltip>}
            >
              <FontAwesomeIcon className="delete-icon" onClick={handleDeleteTicket} icon={faTrashArrowUp} />
            </OverlayTrigger>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <p className="detail-label">Name</p>
            <p className="detail-value">{name}</p>
          </div>
          <div className="col-6">
            <p className="detail-label">Seats</p>
            <p className="detail-value">{seats}</p>
          </div>
          <div className="col-6">
            <p className="detail-label">Date</p>
            <p className="detail-value">{date}</p>
          </div>
          <div className="col-6">
            <p className="detail-label">Time</p>
            <p className="detail-value">{time}</p>
          </div>

          <div className="col-6">
            <p className="detail-label">Email</p>
            <p className="detail-value">{email}</p>
          </div>
          <div className="col-6">
            <p className="detail-label">Phone</p>
            <p className="detail-value">{phone}</p>
          </div>
        </div>
      </div>
      <div className="row w-100 mobile-screen-btn p-0 m-0">
        <div className="col-md-4 mt-4">
          <button type="button" onClick={handleBackToDetails} className="show-btn">
            Back to Details
          </button>
        </div>
        <div className="col-md-8 mt-4">
          <button onClick={handleEditTicket} className="show-btn dark">
            Edit Ticket
          </button>
        </div>
      </div>
    </>
  );
};

export default ShowTicket;
