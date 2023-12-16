"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Trash } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/tanstack";
import { Meal } from "@/models/Meal";
import MealItem from "./MealItem";
import DeleteItem from "./DeleteItem";
import useSearch from "@/hooks/search";
import Title from "../UI/Title";

interface Props {
  mode: "edit" | "delete";
}

const AvailableMeals: React.FC<Props> = ({ mode }) => {
  const [selectedForDeletion, setSelectedForDeletion] = useState<string[]>([]);

  const { data } = useQuery<Meal[]>({
    queryKey: ["meals"],
    queryFn: async () => {
      const response = await fetch("/api/meal", { cache: "no-store" });

      if (!response.ok) {
        console.log("Some Error occured!");

        return;
      }

      const data = await response.json();

      return data;
    },
  });

  const searchKeys: (keyof Meal)[] = useMemo(
    () => ["name", "section", "category", "description"],
    []
  );

  const { filteredList, search } = useSearch<Meal>(data || [], searchKeys);

  const height = useMemo(
    () => (data ? (data.length <= 4 ? "screen" : "auto") : "auto"),
    [data]
  );

  const layoutClassName = useMemo(
    () =>
      `w-full h-${height} mobile:flex mobile:flex-col mobile:items-center pc:grid pc:grid-cols-3 pc:gap-3 pc:items-start pc:justify-items-center`,
    [height]
  );

  const markForDeletion = (id: string) => {
    setSelectedForDeletion((prevState) =>
      prevState.includes(id)
        ? prevState.filter((oldId) => oldId !== id)
        : [...prevState, id]
    );
  };

  const { mutate } = useMutation<any, any, string[], Meal[]>({
    mutationFn: async (ids) => {
      const response = await fetch("/api/meal", {
        method: "DELETE",
        body: JSON.stringify({
          passcode: "passcode-bidek",
          data: ids,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error("Failed to Delete any dish!");
        return;
      }

      toast.success(
        `${
          selectedForDeletion.length !== 1
            ? `${selectedForDeletion.length} were Dishes Deleted !`
            : "The Dish was deleted !"
        } `
      );
      return;
    },
    onMutate: async (ids) => {
      await queryClient.invalidateQueries({ queryKey: ["meals"] });

      const cacheData = queryClient.getQueryData<Meal[]>(["meals"]) || [];

      queryClient.setQueryData(["meals"], [...cacheData.filter( (meal) => !ids.includes(meal.id))]);

      return cacheData;
    },
    onError: async (error, variables, context) => {
      queryClient.setQueryData(["meals"], context);
      return;
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["meals"] });
    }
  });

  return (
    <>
      {mode === "delete" && (
        <div className="flex flex-row justify-evenly items-center">
          <Title
            size={"lessThanLarge"}
            colorScheme={"primary"}
            spaceScheme={"spaceBelow"}
          >
            Delete Dishes
          </Title>{" "}
          {selectedForDeletion.length > 0 && (
            <Trash
              width={40}
              height={40}
              className="text-red-600 active:scale-95 -translate-y-4"
              onClick={() => {mutate(selectedForDeletion)}}
            />
          )}
        </div>
      )}
      {data ? (
        <div className="flex flex-col items-center p-2">
          <div className="flex flex-row items-center w-full mb-5">
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
          <div className={layoutClassName}>
            {filteredList.map((meal) =>
              mode === "edit" ? (
                <MealItem meal={meal} key={meal.id} />
              ) : (
                <DeleteItem
                  meal={meal}
                  key={meal.id}
                  markForDeletion={markForDeletion}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen w-full">Loading the data from the DB...</div>
      )}
    </>
  );
};

export default AvailableMeals;
