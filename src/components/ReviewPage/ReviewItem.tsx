"use client";

import { useContext, useMemo } from "react";
import { Star, Trash2 } from "lucide-react";

import { useWindowDimension } from "@/hooks/dimension";
import { Review } from "@/models/Review";
import { AppContext } from "../Providers/context";

interface Props {
  review: Review;
  admin?: boolean;
  selectForDeletion?: (id: string) => void;
}

const ReviewItem: React.FC<Props> = ({
  review: { name, message, rating, selectedMealIds, id: ReviewerID },
  admin = false,
  selectForDeletion = (id: string) => {},
}) => {
  const { hoveredMealId, setHoveredMealId } = useContext(AppContext);

  const { width } = useWindowDimension();

  const dynamicStyle = useMemo(
    () =>
      `pc:hover:scale-105 shadow-md p-2 bg-primaryBrown rounded-md flex flex-row justify-evenly items-center ${
        hoveredMealId !== null &&
        width > 500 &&
        (selectedMealIds.includes(hoveredMealId) ||
          hoveredMealId === ReviewerID)
          ? "ring-4 ring-primaryOrange"
          : ""
      }`,
    [hoveredMealId, selectedMealIds, ReviewerID, width]
  );

  return (
    <>
      <div
        className={dynamicStyle}
        onClick={() =>
          width > 500 &&
          setHoveredMealId((prevState) =>
            prevState === ReviewerID ? null : ReviewerID
          )
        }
      >
        <div className="flex-1">
          <div className="flex flex-row items-center gap-x-4">
            <span className="font-bubblegum text-lg text-orange-900">
              {name}
            </span>
            <div className="flex flex-row items-center gap-x-2">
              {new Array(rating).fill(0).map((val, index) => (
                <Star
                  key={`star-${index}`}
                  width={20}
                  height={20}
                  fill="#edb305"
                  color="#edb305"
                />
              ))}
            </div>
          </div>
          <div className="font-cursive">{message}</div>
        </div>
        {admin && (
          <Trash2
            width={35}
            height={35}
            className="text-red-600 pc:hover:scale-95"
            onClick={() => selectForDeletion(ReviewerID)}
          />
        )}
      </div>
    </>
  );
};

export default ReviewItem;
