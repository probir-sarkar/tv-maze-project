import { useSearchParams } from "react-router";

import "./show-ticket.styles.scss";

const ShowTicket = ({ ticket }) => {
  const { showId, showName, ticketDetails } = ticket;
  const { name, email, phone, date, time, seats } = ticketDetails;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="ticket-container">
        <div className="show-info mb-4 border-bottom">
          <div className="badge badge-dark bg-dark">Show ID: {showId}</div>
          <h2 className="fw-bolder my-1"> {showName}</h2>
          <p className="display-1">Show this ticket at the entrance</p>
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
          <button type="button" onClick={() => setSearchParams({})} className="show-btn">
            Back to Details
          </button>
        </div>
        <div className="col-md-8 mt-4">
          <button onClick={() => setSearchParams({ booking: "true", edit: "true" })} className="show-btn dark">
            Edit Ticket
          </button>
        </div>
      </div>
    </>
  );
};

export default ShowTicket;
