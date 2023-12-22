import { useQuery } from "@tanstack/react-query";

import { Meal } from "@/models/Meal";
import MealBox from "./MealBox";

interface Props {}

const MealSelection: React.FC = () => {
  const { data, isPending } = useQuery<Meal[]>({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await fetch("/api/meal");

      if (!response.ok) {
        console.log("Some Error occured!");

        return [];
      }

      const data: Meal[] = await response.json();

      return data;
    },
  });

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : data === undefined ? (
        <div></div>
      ) : (
        <div className="p-2 grid grid-flow-col grid-rows-2 overflow-y-visible overflow-x-auto gap-3 max-w-full">
          {data.map((meal) => (
            <MealBox meal={meal} key={meal.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MealSelection;
