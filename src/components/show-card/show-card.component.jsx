import { Link } from "react-router-dom";
import "./show-card.styles.scss";
import Rating from "../rating/rating.component";

const ShowCard = ({ show, index }) => {
  //   return (
  //     <div className="col-md-3 mb-4" key={show.id}>
  //       <div className="card show-card h-100 p-2">
  //         <img
  //           src={show.image.medium}
  //           className="card-img-top img-fluid"
  //           alt="..."
  //         />
  //         <div className="card-body">
  //           <h5 className="card-title">{show.name}</h5>
  //           <p className="card-text">
  //             {show.summary.replace(/(<([^>]+)>)/gi, "")}
  //           </p>

  //           <Link to={`/shows/${show.id}`} className="btn btn-primary">
  //             Go to show
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  console.log(index);

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
