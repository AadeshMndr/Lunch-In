"use client";

import { useContext } from "react";
import Image from "next/legacy/image";

import { AppContext } from "../Providers/context";
import PriceBox from "./PriceBox";
import { Meal } from "@/models/Meal";

interface Props {
  meals: Meal[];
}

const MealShowCase: React.FC<Props> = ({
  meals
}) => {

  const { selectedMeal } = useContext(AppContext);

  const choosenMeal = meals.filter((meal) => meal.id === selectedMeal);

  if (selectedMeal === null && choosenMeal.length === 0){
    return <></>;
  }

  const { image, name, section, description, price } = choosenMeal[0];

  return (
    <section>
    <div className="w-full pc:flex pc:justify-center pc:items-center">
      <div className="mobile:w-fill pc:flex-1 h-60 relative rounded-md overflow-hidden mobile:mx-auto">
        <Image src={image} alt={name} layout="fill" priority={true} objectFit="contain" sizes="(max-width: 450px) 100vw, (max-width: 1200px) 33vw"/>
      </div>
      <div className="mobile:-translate-y-8 mx-auto flex pc:flex-1 flex-col gap-y-3 items-center justify-evenly mobile:w-3/4 pc:max-w-sm p-4 bg-primaryBrown shadow-md rounded-md">
        <div className="flex justify-evenly items-center gap-3 self-start">
          <span className="font-bubblegum font-semibold text-lg first-letter:capitalize text-primaryOrange">
            {section}:{" "}
          </span>
          <span className="font-bold text-xl font-bubblegum">{name}</span>
        </div>
        <span className="font-cursive font-semibold text-lg">{description}</span>
        <div className="self-end">
          <PriceBox price={price} key={name} />
        </div>
      </div>
    </div>
    </section>
  );
};

export default MealShowCase;
