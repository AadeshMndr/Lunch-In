import Image from "next/legacy/image";

import { Meal } from "@/models/Meal";

interface Props {
  meal: Meal;
  toggleMeal: (id: string) => void;
  highlight: boolean;
}

const MealBox: React.FC<Props> = ({ meal: { image, name, id }, toggleMeal, highlight }) => {
  const style = `${highlight ? "ring-4" : ""} pc:min-w-[85px] mobile:min-w-[90px] mobile:max-w-[130px] pc:max-w-[110px] rounded-md flex flex-col justify-center items-center bg-primaryBrown p-0.5 hover:ring-2 ring-orange-900 pc:hover:scale-105`;

  return (
    <div onClick={() => toggleMeal(id)} className={style}>
      <div className="w-full pc:h-16 mobile:h-20 relative rounded-t-md overflow-hidden">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div> 
      <span className="first-letter:capitalize mobile:text-base text-center font-bold font-cursive">{name}</span>
    </div>
  );
};

export default MealBox;
