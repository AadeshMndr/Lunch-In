"use client";

import { useQuery } from "@tanstack/react-query";

import MenuRecommendations from "./MenuRecommendations";
import { Review, ArrayOfReviewSchema } from "@/models/Review";
import { Meal } from "@/models/Meal";

interface Props {
    backupData?: Meal[];
}

const Recommendations: React.FC<Props> = ({ backupData=[] }) => {
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
    return <div className="text-center">Loading Recommendations...</div>;
  } else if (isError) {
    return <div className="text-center">Unable to extract the recommendations!</div>;
  } else if (data.length === 0) {
    return <div></div>;
  } else {
    return (
      <div>
        <MenuRecommendations reviews={data} backupData={backupData}/>
      </div>
    );
  }
};

export default Recommendations;
