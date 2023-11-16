"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Salad } from "lucide-react";

import MealBox from "./MealBox";
import { Meal, picture } from "@/models/Meal";

const DUMMY_DATA = [
  new Meal("Somedish1", "A good food", 34, picture),
  new Meal("Somedish2", "A good food", 54, picture),
  new Meal("Somedish2", "A good food", 54, picture),
  new Meal("Somedish2", "A good food", 54, picture),
  new Meal("Somedish2", "A good food", 54, picture),
  new Meal("Somedish2", "A good food", 54, picture),
  new Meal("Somedish2", "A good food", 54, picture),
];

interface Props {}

const MealSlider: React.FC<Props> = () => {
  const router = useRouter();

  const goToTheMenuPage = () => {
    console.log("gets executed!");
    router.push("/menu");
  };

  return (
    <div className="flex flex-row gap-x-3 w-3/4 mx-auto overflow-x-auto p-10">
      {DUMMY_DATA.slice(0, 5).map((meal, index) => (
        <MealBox meal={{ ...meal }} key={meal.id} index={index} />
      ))}
      <motion.div
        whileHover={{
          scale: 1.15,
          boxShadow: "0px 0px 10px black",
        }}
        transition={{ stiffness: 100 }}
        initial={{ x: -5 * 75 }}
        onClick={goToTheMenuPage}
        className="px-24 shadow-shadowLeft rounded-md bg-[rgb(212,142,93)] flex flex-col items-center justify-center gap-y-5"
      >
        <span className="text-2xl font-cursive min-w-max select-none">View Menu</span>
        <Salad className="w-20 h-20 select-none"/>
      </motion.div>
    </div>
  );
};

export default MealSlider;
