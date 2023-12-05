"use client";

import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

import { Meal } from "@/models/Meal";

interface Props {
  meal: Meal;
}

const MealItem: React.FC<Props> = ({ meal }) => {
    const router = useRouter();

  const goToThisItem = () => {
    router.push(`/edit/changeMeal/${meal.id}`);
  };

  return (
    <div
      onClick={goToThisItem}
      className="pc:hover:scale-105 bg-primaryOrange rounded-md flex flex-row gap-5 items-center my-4 shadow-md  mobile:max-w-fit mobile:min-w-[80%] overflow-hidden pc:pr-4 pc:w-full pc:max-w-[300px]"
    >
      <div className="relative w-20 h-20">
        <Image
          src={meal.image}
          layout="fill"
          alt={meal.name}
          objectFit="cover"
        />
      </div>
      <div className="text-xl text-primaryBrown tracking-wide first-letter:capitalize font-bubblegum font-bold">{`${meal.section}: ${meal.name}`}</div>
    </div>
  );
};

export default MealItem;
