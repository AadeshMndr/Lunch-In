"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import useSearch from '@/hooks/search';
import SectionHeader from "../UI/SectionHeader";
import ItemSection from "./ItemSection";
import { Meal } from "@/models/Meal";

import { getUnrepeatedArray } from "@/lib/utils";

interface Props {
}

const Menu: React.FC<Props> = () => {
  const { data } = useQuery<Meal[]>({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await fetch("/api/meal");

      if (!response.ok) {
        console.log("Some Error occured!");

        return [];
      }

      const data: Meal[] = await response.json();

      return data;
    },
  });

  const searchKeys: (keyof Meal)[] = useMemo(
    () => ["name", "section", "category", "description"],
    []
  );

  const { filteredList, search } = useSearch<Meal>(data || [], searchKeys);

  const sectionNames = useMemo(
    () =>
      getUnrepeatedArray<string>((filteredList).map(({ section }) => section)),
    [filteredList]
  );

  return (
    <>
    <div className="flex flex-row items-center w-full mb-5">
            <input
              type="text"
              className="flex-1 mx-2 rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
              onChange={(event) => search(event.target.value)}
            />
            <Search
              width={30}
              height={30}
              className="text-primaryOrange active:scale-95"
            />
          </div>
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
            meals={(filteredList).filter(
              (meal) =>
                meal.category === "food" &&
                meal.section.trim().toLocaleUpperCase() ===
                  sectionName.trim().toLocaleUpperCase()
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
            meals={(filteredList).filter(
              (meal) =>
                meal.category === "drinks" && meal.section === sectionName
            )}
          />
        ))}
      </div>
    </div></>
  );
};

export default Menu;
