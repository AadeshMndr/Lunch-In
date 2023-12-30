"use client";

import { useQuery } from "@tanstack/react-query";
import { UsersIcon } from "lucide-react";

import { Review, ArrayOfReviewSchema } from "@/models/Review";
import { useWindowDimension } from "@/hooks/dimension";
import ReviewItem from "./ReviewItem";
import RecommendedDishes from "./RecommendedDishes";

interface Props {}

const ReviewList: React.FC<Props> = () => {
  const { width } = useWindowDimension();

  const { data, isPending, isError } = useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await fetch("/api/review");

      if (!response.ok) {
        console.log("Couldn't fetch the data from the DB!");
        return [];
      }

      const data = await response.json();

      const result = ArrayOfReviewSchema.safeParse(data);

      if (!result.success) {
        console.log("Couldn't get ZODly valid data from the DB (client side)");
        return [];
      } else {
        return result.data;
      }
    },
  });

  if (isPending) {
    return (
      <div className="w-full flex flex-col gap-y-4 justify-center items-center pt-10">
        <UsersIcon
          width={60}
          height={60}
          className="text-primaryOrange animate-pulse"
        />
        <span className="text-primaryOrange font-bubblegum">
          Collecting Reviews...
        </span>
      </div>
    );
  } else if (isError) {
    return <div>Unable to fetch the data from the DB!</div>;
  } else {
    return (
      <div className="flex flex-row w-full">
        <div className="flex flex-col items-stretch gap-y-4 max-w-xl flex-1">
          {data.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
        { width > 500 && <RecommendedDishes reviews={data} />}
      </div>
    );
  }
};

export default ReviewList;
