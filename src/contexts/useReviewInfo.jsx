import { useContext } from "react";
import ReviewInfoContext from "./ReviewInfoContext";

export const useReviewInfo = () => {
  return useContext(ReviewInfoContext);
};