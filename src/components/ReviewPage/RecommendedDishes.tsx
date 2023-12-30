"use client";

import { useContext } from "react";
import Image from "next/legacy/image";
import { useQuery } from "@tanstack/react-query";
import { Soup } from "lucide-react";

import { Meal } from "@/models/Meal";
import { Review } from "@/models/Review";
import { AppContext } from "../Providers/context";

interface Props {
  reviews: Review[];
  backupData?: Meal[];
}

const RecommendedDishes: React.FC<Props> = ({ reviews, backupData = [] }) => {
  const { setHoveredMealId, hoveredMealId } = useContext(AppContext);

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
    let dishes: { name: string; image: string; id: string; count: number, reviewers: string[] }[] =
      [];

    reviews.forEach(({ selectedMealIds, id: ReviewerID }) => {
      const mealsChoosen = selectedMealIds.map(
        (testID) => data.filter(({ id }) => testID === id)[0]
      );

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
        <div className="w-full h-full grid grid-cols-2 grid-flow-row gap-y-3 justify-items-center">
          {dishes.map(({ image, id, count, name, reviewers }) => {
            const dynamicStyle = `hover:scale-105 ring-primaryOrange flex flex-col items-center shadow-md rounded-lg max-w-[180px] px-3 pb-1 ${
              hoveredMealId === id ||
              (hoveredMealId !== null && reviewers.includes(hoveredMealId))
                ? "ring-4"
                : "ring-0"
            }`;

            return (
              <div
                key={`Recommendation-${id}`}
                onClick={() =>
                  setHoveredMealId((prevState) =>
                    prevState === id ? null : id
                  )
                }
                className={dynamicStyle}
              >
                <div className="flex flex-row justify-center gap-x-4 items-center text-lg">
                  <span className="text-orange-900">{name}</span>
                  <span className="font-semibold"> x {count}</span>
                </div>
                <div className="overflow-hidden rounded-md relative h-32 w-32">
                  <Image src={image} layout="fill" objectFit="cover" priority={true}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default RecommendedDishes;
