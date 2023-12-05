"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { Meal } from "@/models/Meal";
import MealItem from "./MealItem";

interface Props {}

const AvailableMeals: React.FC<Props> = () => {
  const { data } = useQuery<Meal[]>({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await fetch("/api/meal");

      if (!response.ok) {
        console.log("Some Error occured!");

        return;
      }

      const data = await response.json();

      return data;
    },
  });

  const height = useMemo( () => data ? (data.length <= 4 ? "screen" : "auto") : "auto", [data]);

  const layoutClassName = useMemo(() => `w-full h-${height} mobile:flex mobile:flex-col mobile:items-center pc:grid pc:grid-cols-3 pc:gap-3 pc:items-start pc:justify-items-center`, [height]);

  return data ? (
    <div className={layoutClassName}>
      {data.map((meal) => (
        <MealItem meal={meal} key={meal.id}/>
      ))}
    </div>
  ) : (
    <div className="h-screen w-full">Loading the data from the DB...</div>
  );
};

export default AvailableMeals;
