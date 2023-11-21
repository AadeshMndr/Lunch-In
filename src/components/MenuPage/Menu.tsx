"use client";

import { useMemo } from "react";
import SectionHeader from "../UI/SectionHeader";
import ItemSection from "./ItemSection";
import { Meal } from "@/models/Meal";

interface Props {
  meals: Meal[];
}

const getUnrepeatedArray = <T=any>(array: T[]) => {
  let arr: T[] = [];

  array.forEach( (item) =>{
    if(!arr.includes(item)){
      arr.push(item);
    }
  });

  return arr;
}

const Menu: React.FC<Props> = ({ meals }) => {
  const sectionNames = useMemo( () => getUnrepeatedArray<string>(meals.map(({ section }) => section)), [meals, getUnrepeatedArray]);

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
