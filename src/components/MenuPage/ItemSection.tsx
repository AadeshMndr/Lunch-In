"use client";

import { motion } from "framer-motion";

import MealItem from "./MealItem";
import { Meal } from "@/models/Meal";
import SectionHeader from "../UI/SectionHeader";

interface Props {
  meals: Meal[];
}

const ItemSection: React.FC<Props> = ({ meals }) => {
  if (meals.length === 0) {
    return <></>;
  }

  return (
    <div>
      <SectionHeader text={meals[0]?.section || "Others"} />
      <motion.section animate="slideIn" variants={{ slideIn: {transition: { staggerChildren: 0.05 }} }} className="shadow-xl flex flex-wrap w-full max-h-[500px] pc:rounded-lg overflow-auto justify-evenly border-black pc:border-x-2 border-b-2 -translate-y-[10px] pt-3">
        {meals.map((meal) => {
          return <MealItem meal={meal} key={`menu-${meal.id}`} />;
        })}
      </motion.section>
    </div>
  );
};

export default ItemSection;
