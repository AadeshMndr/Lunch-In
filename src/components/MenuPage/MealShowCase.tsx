import Image from "next/legacy/image";

import PriceBox from "./PriceBox";
import { Meal } from "@/models/Meal";

interface Props {
  meal: Meal;
}

const MealShowCase: React.FC<Props> = ({
  meal: { image, name, description, price, section },
}) => {
  return (
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
          <PriceBox price={price} />
        </div>
      </div>
    </div>
  );
};

export default MealShowCase;
