import Image from "next/legacy/image";

import { Meal } from "@/models/Meal";

interface Props {
  meal: Meal;
}

const MealBox: React.FC<Props> = ({ meal: { image, name } }) => {
  return (
    <div className="rounded-md flex flex-col justify-center items-center bg-primaryBrown p-0.5 hover:ring-2 ring-orange-900 pc:hover:scale-105">
      <div className="w-full pc:h-12 mobile:h-8 relative rounded-t-md overflow-hidden">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div> 
      <span className="first-letter:capitalize mobile:text-xs text-center font-bold font-cursive">{name}</span>
    </div>
  );
};

export default MealBox;
