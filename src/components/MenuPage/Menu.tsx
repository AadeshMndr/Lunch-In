"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import SectionHeader from "../UI/SectionHeader";
import ItemSection from "./ItemSection";
import { Meal } from "@/models/Meal";


import { getUnrepeatedArray } from "@/lib/utils";

interface Props {
  meals: Meal[];
}


const Menu: React.FC<Props> = ({ meals }) => {

  const { data } = useQuery<Meal[]>({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await fetch("/api/meal");

      if (!response.ok){
        console.log("Some Error occured!");

        return;
      }

      const data = await response.json();

      return data;
    }
  });

  console.log("The data is: ", data);

  const sectionNames = useMemo( () => getUnrepeatedArray<string>(meals.map(({ section }) => section)), [meals]);

  return (
    <div>
      <SectionHeader
        text={"Foods Section"}
        classNameForTitle="text-primaryOrange"
        classNameForInnerDiv="bg-primaryOrange"
      />
      <div className="pc:grid pc:grid-cols-3 pc:gap-3 mobile:flex mobile:flex-wrap w-full max-h-[500px] overflow-auto justify-evenly">
        {sectionNames.map((sectionName) => (
          <ItemSection
            key={sectionName}
            meals={meals.filter(
              (meal) => meal.category === "food" && meal.section === sectionName
            )}
          />
        ))}
      </div>
      <SectionHeader
        text={"Drinks Section"}
        classNameForTitle="text-primaryOrange"
        classNameForInnerDiv="bg-primaryOrange"
      />
       <div className="pc:grid pc:grid-cols-3 pc:gap-3 mobile:flex mobile:flex-wrap w-full max-h-[500px] overflow-auto justify-evenly">
        {sectionNames.map((sectionName) => (
          <ItemSection
            key={sectionName}
            meals={meals.filter(
              (meal) => meal.category === "drinks" && meal.section === sectionName
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
