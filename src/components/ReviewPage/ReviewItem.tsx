"use client";

import { Star } from "lucide-react";

import { Review } from "@/models/Review";

interface Props {
  review: Review;
}

const ReviewItem: React.FC<Props> = ({ review: { name, message, rating } }) => {
  return (
    <div className="shadow-md p-2 bg-primaryBrown rounded-md">
      <div className="flex flex-row items-center gap-x-4">
        <span className="font-bubblegum text-lg text-orange-900">{name}</span>
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
  );
};

export default ReviewItem;
