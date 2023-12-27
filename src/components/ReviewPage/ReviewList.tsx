"use client";

import { useQuery } from "@tanstack/react-query";

import { Review, ArrayOfReviewSchema } from "@/models/Review";
import ReviewItem from "./ReviewItem";

interface Props {}

const ReviewList: React.FC<Props> = () => {
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
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Unable to fetch the data from the DB!</div>;
  } else {
    return (
      <div className="flex flex-col mobile:items-stretch pc:items-start gap-y-4">
        {data.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
    );
  }
};

export default ReviewList;
