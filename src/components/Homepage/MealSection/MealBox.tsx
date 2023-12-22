"use client";

import { useContext } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { AppContext } from "@/components/Providers/context";
import { Meal } from "@/models/Meal";

interface Props {
  meal: Meal;
  index: number;
  selectCard: (index: number | null, id?: string) => void;
  scrollAreaWidth: number;
  isMobile: boolean;
}

const MealBox: React.FC<Props> = ({ meal: { name, image, id }, index, selectCard, isMobile }) => {
  const router = useRouter();

  const { setSelectedMeal } = useContext(AppContext);

  const goToSpecificMenu = () => {
    router.push("/menu");
    setSelectedMeal(id);
  };

  const handleClickEvent = () => {
    if(isMobile){
      selectCard(index, id);
    } else {
      goToSpecificMenu();
    }
  }

  return (
    <motion.div
      id={`box${index}`}
      onClick={handleClickEvent}
      whileHover={
        isMobile
          ? {}
          : {
              x: [
                -50 - index * 75,
                -100 - index * 75,
                -50 - index * 75 + (index !== 0 ? 0 : 25),
              ],
              scale: 1.15,
              zIndex: 40,
              rotateY: ["5deg", "10deg", "5deg", "0deg"],
              boxShadow: "0px 0px 10px black",
              backgroundColor: "rgb(212,142,93)",
            }
      }
      transition={isMobile ? { duration: 0.3 } : { stiffness: 100 }}
      initial={{ x: -index * 75 }}
      className={`MealWithIndex${index} p-3 shadow-shadowLeft rounded-md bg-gradient-to-r from-[60%] from-[rgb(212,142,93)] to-[rgba(212,143,93,0.14)] flex flex-col justify-evenly items-center`}
    >
      <div className="relative w-40 h-40 overflow-hidden rounded-md">
        <Image
          src={image}
          alt={name}
          layout="fill"
          priority={true}
          className="select-none"
          objectFit="cover"
        />
      </div>
      <span className="text-xl font-semibold text-center mt-4 select-none">
        {name}
      </span>
    </motion.div>
  );
};

export default MealBox;
