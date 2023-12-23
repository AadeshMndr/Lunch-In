import { useMemo, Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import useSearch from "@/hooks/search";
import MealBox from "./MealBox";
import { Meal } from "@/models/Meal";

interface Props {
  mealIds: string[];
  setMealIds: Dispatch<SetStateAction<string[]>>;
}

const MealSelection: React.FC<Props> = ({ mealIds, setMealIds }) => {
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

  const toggleMealId = (id: string) => {
    setMealIds((prevState) => {
      if (prevState.includes(id)){
        return prevState.filter( (mealId) => mealId !== id);
      } else {
        return [...prevState, id];
      }
    })
  }

  const searchKeys: (keyof Meal)[] = useMemo(
    () => ["name", "section", "category", "description"],
    []
  );

  const { filteredList, search } = useSearch<Meal>(data || [], searchKeys);

  return (
    <>
      <div className="flex flex-row items-center w-full mt-1">
        <input
          type="text"
          className="flex-1 mx-2 rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
          onChange={(event) => search(event.target.value)}
        />
        <Search
          width={30}
          height={30}
          className="text-primaryOrange active:scale-95"
        />
      </div>
      <div></div>
      <div className="w-full">
        {isPending ? (
          <div>Loading...</div>
        ) : data === undefined ? (
          <div></div>
        ) : (
          <div className="p-2 grid grid-flow-col grid-rows-2 overflow-y-visible overflow-x-auto gap-3 max-w-full">
            {filteredList.map((meal) => (
              <MealBox meal={meal} key={meal.id} toggleMeal={toggleMealId} highlight={mealIds.includes(meal.id)} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MealSelection;
