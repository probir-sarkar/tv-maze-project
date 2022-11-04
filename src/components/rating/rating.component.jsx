import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceTired,
  faFaceSadCry,
  faFaceGrinStars,
  faFaceGrinHearts,
  faFaceMeh,
  faFaceSadTear,
} from "@fortawesome/free-regular-svg-icons";

const Rating = ({ rating }) => {
  // font awesome icons based on rating
  console.log(rating);
  const getRating = () => {
    switch (rating) {
      case rating <= 2:
        return faFaceTired;
      case rating <= 4:
        return faFaceSadTear;
      case rating <= 6:
        return faFaceMeh;
      case rating <= 8:
        return faFaceGrinHearts;
      case rating <= 10:
        return faFaceGrinStars;
    }
  };
  return (
    <div className="rating">
      <FontAwesomeIcon icon={getRating(rating)} />
    </div>
  );
};
export default Rating;
