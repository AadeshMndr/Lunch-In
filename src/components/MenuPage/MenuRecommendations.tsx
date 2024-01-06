"use client";

import Image from "next/legacy/image";
import { useQuery } from "@tanstack/react-query";
import { Soup } from "lucide-react";

import RecommendationBox from "./RecommendationBox";
import { Meal } from "@/models/Meal";
import { Review, Recommendation } from "@/models/Review";

interface Props {
  reviews: Review[];
  backupData?: Meal[];
}

const MenuRecommendations: React.FC<Props> = ({ reviews, backupData = [] }) => {
  const { data, isPending, isError } = useQuery<Meal[]>({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await fetch("/api/meal");

      if (!response.ok) {
        console.log("Some Error occured!");

        return backupData || [];
      }

      const data: Meal[] = await response.json();

      return data;
    },
  });

  if (isPending) {
    return (
      <div className="w-full flex flex-col gap-y-4 justify-center items-center pt-10">
        <Soup
          width={60}
          height={60}
          className="text-primaryOrange animate-pulse"
        />
        <span className="text-primaryOrange font-bubblegum">
          Getting Recommendations...
        </span>
      </div>
    );
  } else if (isError) {
    return (
      <div className="w-full flex justify-center items-center p-5">
        Failed to get Recommendations!
      </div>
    );
  } else {
    let dishes: Recommendation[] = [];

    reviews.forEach(({ selectedMealIds, id: ReviewerID }) => {
      const mealsChoosen = selectedMealIds
        .map((testID) => data.filter(({ id }) => testID === id)[0])
        .filter((item) => item !== undefined);

      mealsChoosen.forEach(({ name, id, image }) => {
        if (dishes.some(({ id: testID }) => testID === id)) {
          dishes.forEach((item) => {
            if (item.id === id) {
              item.count++;
              item.reviewers.push(ReviewerID);
            }
          });
        } else {
          dishes.push({ name, id, image, count: 1, reviewers: [ReviewerID] });
        }
      });
    });

    return (
      <div className="flex-1 overflow-auto">
        <span className="block text-primaryOrange font-bold text-lg text-center mb-6">
          Recommended Dishes
        </span>
        <div className="w-full h-full grid pc:grid-cols-4 mobile:grid-cols-2  grid-flow-row gap-y-3 justify-items-center content-evenly">
          {dishes.map((recommendation) => {
            return <RecommendationBox key={`Recommendations-key-${recommendation.id}`} recommendation={recommendation} />;
          })}
        </div>
      </div>
    );
  }
};

export default MenuRecommendations;
