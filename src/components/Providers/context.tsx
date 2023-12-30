"use client";

import { createContext, SetStateAction, Dispatch, useState, MouseEventHandler } from "react";

interface Context {
  cardShown: boolean;
  setCardShown: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedMeal: string | null;
  setSelectedMeal: Dispatch<SetStateAction<string | null>>;
  hoveredMealId: string | null;
  setHoveredMealId: Dispatch<SetStateAction<string | null>>;
}

export const AppContext = createContext<Context>({
  cardShown: false,
  setCardShown: () => {},
  open: false,
  setOpen: () => {},
  selectedMeal: null,
  setSelectedMeal: () => {},
  hoveredMealId: null,
  setHoveredMealId: () => {},
});

interface Props {
  children: React.ReactNode;
}

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [cardShown, setCardShown] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [ selectedMeal, setSelectedMeal ] = useState<string | null>(null);
  const [ hoveredMealId, setHoveredMealId ] = useState<string | null>(null);

  const contextObj: Context = {
    cardShown,
    setCardShown,
    open,
    setOpen,
    selectedMeal,
    setSelectedMeal,
    hoveredMealId,
    setHoveredMealId
  };

  const closeThings: MouseEventHandler<HTMLDivElement> = (event) => {
 

    if ("id" in event.target){

        if (event.target.id !== "NavSide" && event.target.id !== "Logo"){

            let rootContainer = event.target;

            if ("id" in rootContainer && rootContainer.id === "backdrop"){
              setOpen(false);
               //Setting the card as NOT to be shown.
              setCardShown(false);
            }

            
            while("id" in rootContainer && rootContainer.id !== "backdrop"){
              if ("parentElement" in rootContainer){
                rootContainer = rootContainer.parentElement as HTMLElement;

                if (rootContainer.id === "NavSide" || rootContainer.id === "backdropSlider"){
                  break;
                } else if (rootContainer.id === "backdrop"){
                  setOpen(false);
                   //Setting the card as NOT to be shown.
                  setCardShown(false);
                }
              } else {
                break;
              }
            }

        } 
    }

  }

  return (
    <AppContext.Provider value={contextObj}><div id="backdrop" onClick={closeThings}>{children}</div></AppContext.Provider>
  );
};

export default ContextProvider;
