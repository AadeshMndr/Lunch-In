"use client";

import { useState, useMemo } from "react";
import Image from "next/legacy/image";

import { Meal } from "@/models/Meal";

interface Props {
  meal: Meal;
  markForDeletion: (id: string) => void; 
}

const DeleteItem: React.FC<Props> = ({ meal, markForDeletion }) => {
    const [selected, setSelected] = useState<boolean>(false);

    const style = useMemo( () => {
        if (selected){
            return "ring-4 ring-red-600"
        } else {
            return "";
        }
    }, [selected]);

  return (
    <div
    onClick={() => {
        setSelected((prevState) => !prevState);
        markForDeletion(meal.id);
    }}
      className={`${style} pc:hover:scale-105 bg-primaryOrange rounded-md flex flex-row gap-5 items-center my-2 shadow-md  mobile:max-w-fit mobile:min-w-[80%] overflow-hidden pc:pr-4 pc:w-full pc:max-w-[300px]`}
    >
      <div className="relative w-20 h-20">
        <Image
          src={meal.image}
          layout="fill"
          alt={meal.name}
          objectFit="cover"
        />
      </div>
      <div className="p-2 text-xl text-primaryBrown tracking-wide first-letter:capitalize font-bubblegum font-bold">{`${meal.section}: ${meal.name}`}</div>
    </div>
  );
};

export default DeleteItem;
