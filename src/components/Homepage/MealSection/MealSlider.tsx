"use client";

import { useMemo, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion, useAnimate } from "framer-motion";
import { Salad } from "lucide-react";

import MealBox from "./MealBox";
import { AppContext } from "@/components/Providers/context";
import { useWindowDimension } from "@/hooks/dimension";
import { Meal } from "@/models/Meal";

interface Props {}

const MealSlider: React.FC<Props> = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const { cardShown, setCardShown } = useContext(AppContext);

  const { width } = useWindowDimension();
  const isMobile = useMemo(() => width < 500, [width]);

  const { data } = useQuery<Meal[]>({
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

  const [scope, animate] = useAnimate<HTMLDivElement>();

  const router = useRouter();

  const goToTheMenuPage = () => {
    router.push("/menu");
  };

  const animateShowingCard = useCallback((index: number) => {
    animate(
      `.MealWithIndex${index}`,
      {
        scale: 1.15,
        position: ["static", "absolute"],
        x: [-index * 75 - 100, -index * 75],
        left: [
          width / 4 + index * 75,
          width / 8 + index * 75,
          width / 4 + index * 75,
        ],
        top: "50px",
        width: "200px",
        zIndex: 50,
        boxShadow: "0px 0px 10px black",
        backgroundColor: "rgb(212, 142, 93)",
      },
      { duration: 0.2 }
    );
  }, []);

  const animateHidingCard = useCallback((index: number) => {
    animate(
      `.MealWithIndex${index}`,
      {
        scale: 1,
        position: ["absolute", "absolute", "absolute", "static"],
        left: [width / 8 + index * 75, width / 4 + index * 75],
        x: [-index * 75 - 100, -index * 75],
        zIndex: 0,
        backgroundImage:
          "linear-gradient(to right, rgb(212,142,93) 60%, rgba(212,143,93,0.14))",
        boxShadow: "-10px 2px 10px rgb(0, 0, 0)",
      },
      { duration: 0.2 }
    );
  }, []);

  const selectCard = (index: number | null, id?: string) => {
    // setSelectedCard((prevState) => {
    //   if (prevState === index) {
    //     if (prevState !== null){
    //       router.push(`/menu?mealId=${id}`);
    //     }
    //     return null;
    //   } else {
    //     if (index !== null) {
    //       animateShowingCard(index);
    //       if (prevState !== null) {
    //         animateHidingCard(prevState);
    //       }
    //     } else {
    //       if (prevState !== null) {
    //         animateHidingCard(prevState);
    //       }
    //     }
    //     return index;
    //   }
    // });

    if (selectedCard === index && selectedCard !== null) {
      setCardShown(false);
      router.push(`/menu?mealId=${id}`);
      return;
    }

    if (selectedCard !== index) {
      if (index !== null) {
        setCardShown(true);
        animateShowingCard(index);
        if (selectedCard !== null) {
          animateHidingCard(selectedCard);
        }

        setSelectedCard(index);
      } else {
        setCardShown(false);
      }
    }
  };

  useEffect(() => {
    if (!cardShown && selectedCard !== null) {
      animateHidingCard(selectedCard);
      setSelectedCard(null);
    }
  }, [cardShown, selectedCard, animateHidingCard]);

  return (
    <div
      id="backdropSlider"
      ref={scope}
      className="flex flex-row gap-x-3 w-3/4 mx-auto overflow-x-auto p-10"
      onClick={(event) => {
        if ("id" in event.target && isMobile) {
          if (event.target.id === "backdropSlider") {
            selectCard(null);
          }
        }
      }}
      onScroll={(event) => {
        if (isMobile) {
          if (selectedCard !== null) {
            animateHidingCard(selectedCard);
          }
          setSelectedCard(null);
        }
      }}
    >
      {data === undefined ? (
        <div className="w-full p-4">Loading Dishes ...</div>
      ) : (
        data
          .slice(0, 5)
          .map((meal, index) => (
            <MealBox
              meal={{ ...meal }}
              key={meal.id}
              index={index}
              selectCard={selectCard}
              scrollAreaWidth={width}
              isMobile={isMobile}
            />
          ))
      )}
      <motion.div
        whileHover={
          isMobile
            ? {}
            : {
                scale: 1.15,
                boxShadow: "0px 0px 10px black",
              }
        }
        whileTap={
          isMobile
            ? {
                scale: 1.15,
                boxShadow: "0px 0px 10px black",
                transition: { duration: 0.1 },
              }
            : {}
        }
        transition={{ stiffness: 100 }}
        initial={{ x: -5 * 75 }}
        onClick={goToTheMenuPage}
        className="px-24 shadow-shadowLeft rounded-md bg-[rgb(212,142,93)] flex flex-col items-center justify-center gap-y-5"
      >
        <span className="text-2xl font-cursive min-w-max select-none">
          View Menu
        </span>
        <Salad className="w-20 h-20" />
      </motion.div>
    </div>
  );
};

export default MealSlider;
