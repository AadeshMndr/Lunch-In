"use client";

import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

import PriceBox from "./PriceBox";
import { Meal } from "@/models/Meal";

interface Props {
  meal: Meal;
}

const MealItem: React.FC<Props> = ({ meal: { image, name, price, id } }) => {
  
  const router = useRouter();

  const selectTheMeal: MouseEventHandler<HTMLDivElement> = (event) => {
    if ("id" in event.target){

      if(event.target.id === "clickable"){
        router.push(`/menu?mealId=${id}`);
      }
    }

  };


  return (
    <motion.div
      variants={{
        slideIn: { x: [-50, 0] }
      }}
      whileHover={{ scaleY: 1.03 }}
      onClick={selectTheMeal}
      className="hover:cursor-pointer flex flex-1 gap-4 justify-between items-center rounded-md overflow-hidden p-0.5 pr-3 shadow-lg m-2 min-w-min bg-gradient-to-b from-primaryBrown from-95% to-[#ae896f]"
    >
      <div className="pr-0.5 border-r-4 border-r-primaryBrown300">
        <div className="relative w-16 h-16 rounded-md overflow-hidden">
          <Image id="clickable" src={image} alt={name} fill priority={true}  sizes="33vw"/>
        </div>
      </div>
      <div id="clickable" className="flex justify-center items-center font-semibold text-lg font-cursive self-stretch">{name}</div>
      <PriceBox price={price}/>
    </motion.div>
  );
};

export default MealItem;
