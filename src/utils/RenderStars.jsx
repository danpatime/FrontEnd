import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

export const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} size={18} color="#f9c74f" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} size={18} color="#f9c74f" />);
    } else {
      stars.push(<FaRegStar key={i} size={18} color="#e9ecef" />);
    }
  }
  return stars;
};
