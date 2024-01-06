"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { UsersIcon } from "lucide-react";
import { toast } from "sonner";

import { Review, ArrayOfReviewSchema } from "@/models/Review";
import { useWindowDimension } from "@/hooks/dimension";
import ReviewItem from "./ReviewItem";
import DeletionLayer from "../UI/DeletionLayer";
import RecommendedDishes from "./RecommendedDishes";
import { queryClient } from "@/lib/tanstack";

interface Props {
  admin?: boolean;
}

const ReviewList: React.FC<Props> = ({ admin = false }) => {
  const { width } = useWindowDimension();

  const [selectedForDeletion, setSelectedForDeletion] = useState<string[] | null>(null);

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

  const { mutate } = useMutation<any, any, string, Review[]>({
    mutationFn: async (id) => {
      const response = await fetch("/api/review", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Couldn't delete the review from the DB!");
        return;
      }
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["reviews"] });

      const cacheData = queryClient.getQueryData<Review[]>(["reviews"]) || [];

      queryClient.setQueryData(
        ["reviews"],
        cacheData.filter(({ id: deletionID }) => deletionID !== id)
      );

      return cacheData;
    },
    onError: (error, variable, context) => {
      queryClient.setQueryData(["reviews"], context);
      console.log(error);
      toast.error("Couldn't delete the Review!");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setSelectedForDeletion(null);
    },
    onSuccess: () => {
      toast.success("The Review was deleted.");
    }
  });

  const cancelDeletion = () => {
    setSelectedForDeletion(null);
  }

  const confirmDeletion = () => {
    if (selectedForDeletion !== null && selectedForDeletion.length > 0){
      mutate(selectedForDeletion[0]);
    }
  }

  const selectForDeletion = (id: string) => {
    setSelectedForDeletion([id]);
  }

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
      <>
        <DeletionLayer data={data} onCancel={cancelDeletion} onDelete={confirmDeletion} deleteModalIsOpen={selectedForDeletion !== null} selectedForDeletion={selectedForDeletion || []}/>
        <div className="flex flex-row w-full">
          <div className="flex flex-col items-stretch gap-y-4 max-w-xl flex-1">
            {data.map((review) => (
              <ReviewItem key={review.id} review={review} admin={admin} selectForDeletion={selectForDeletion}/>
            ))}
          </div>
          {width > 500 && <RecommendedDishes reviews={data} />}
        </div>
      </>
    );
  }
};

export default ReviewList;
