import { useState } from "react";
import { Link } from "react-router-dom";
import "./book-ticket.styles.scss";

const formDataObject = {
  name: "",
  email: "",
  phone: "",
  show: "",
  date: "",
  time: "",
  seats: "",
};
const BookTicket = ({ showDetails, handleBackToDetails }) => {
  const [formData, setFormData] = useState(formDataObject);

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="ticket-book-form">
      <div className="row mx-auto">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={(e) => handleOnChange(e)}
              value={formData.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={(e) => handleOnChange(e)}
              value={formData.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              onChange={(e) => handleOnChange(e)}
              value={formData.phone}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              onChange={(e) => handleOnChange(e)}
              value={formData.date}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              onChange={(e) => handleOnChange(e)}
              value={formData.time}
            />
          </div>
          <div className="form-group">
            <label htmlFor="seats">Seats</label>
            <input
              type="number"
              className="form-control"
              id="seats"
              name="seats"
              onChange={(e) => handleOnChange(e)}
              value={formData.seats}
            />
          </div>
        </div>
        <div className="row w-100 mobile-screen-btn p-0 m-0">
          <div className="col-md-4 mt-4">
            <button className="show-btn" onClick={handleBackToDetails}>
              Back to Details
            </button>
          </div>
          <div className="col-md-8 mt-4">
            <Link className="show-btn dark">Book Ticket</Link>
          </div>
        </div>
      </div>
    </form>
  );
};
export default BookTicket;
