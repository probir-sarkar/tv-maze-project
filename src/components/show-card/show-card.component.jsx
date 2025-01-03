import { Link } from "react-router";
import "./show-card.styles.scss";
import Rating from "../rating/rating.component";

const ShowCard = ({ show, index }) => {
 if (!show.image) return null;

  return (
    <div className="show-card">
      <img src={show.image.original} className="card-img" alt="..." />
      <div className="card-body">
        {/* index */}
        <h5 className="card-index">{index + 1}</h5>
        <h5 className="card-title">{show.name}</h5>
        <Link to={`/shows/${show.id}`} className="card-btn">
          More Details
        </Link>
      </div>
    </div>
  );
};
export default ShowCard;
