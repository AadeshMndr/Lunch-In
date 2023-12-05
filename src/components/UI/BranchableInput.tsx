"use client";

import { InputHTMLAttributes, useState, ChangeEventHandler, useEffect } from "react";
import {
  UseFormRegister,
  UseFormResetField,
  UseFormWatch,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";
import { CircleSlash2, Circle } from "lucide-react";

import { MealFormInput } from "@/models/MealForm";
import { Price } from "@/models/Meal";

interface Props {
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  id: InputHTMLAttributes<HTMLInputElement>["id"];
  register: UseFormRegister<MealFormInput>;
  resetField: UseFormResetField<MealFormInput>;
  watch: UseFormWatch<MealFormInput>;
  setError: UseFormSetError<MealFormInput>;
  clearError: UseFormClearErrors<MealFormInput>;
  isSubmitting: boolean;
  defaultCondition?: boolean;
}

const priceInputisValid = (value: string) => {
  const number = Number(value.trim());

  if (isNaN(number) || number <= 0) {
    return false;
  } else {
    return true;
  }
};

const BranchableInput: React.FC<Props> = ({
  type,
  id,
  register,
  resetField,
  setError,
  clearError,
  isSubmitting,
  defaultCondition=false
}) => {
  const [branchOut, setBranchOut] = useState<boolean>(defaultCondition);

  const [touchedHalf, setTouchedHalf] = useState<boolean>(false);
  const [touchedFull, setTouchedFull] = useState<boolean>(false);
  const [touched, setTouched] = useState<boolean>(false);

  useEffect( () => {
    if (isSubmitting){
      if(!touched && !branchOut){
        setError(id === "price" ? "price" : (`price.${id}` as any), { message: "You cannot keep that empty!" });
      } else if (!touchedHalf && branchOut){
        setError(id === "price" ? "price.half" : (`price.${id}.half` as any), { message: "You cannot keep empty price for half!" })
      } else if (!touchedFull && branchOut){
        setError(id === "price" ? "price.full" : (`price.${id}.full` as any), { message: "You cannot keep empty price for full!" })
      }
    }
  }, [isSubmitting, touched, touchedHalf, touchedFull, branchOut, id, setError]);

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [timerHalf, setTimerHalf] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [timerFull, setTimerFull] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleTouch = (
    which: "half" | "full" | "single"
  ) => {
    if (which === "single" && !touched) {
      setTouched(true);
      setTimer(
        setTimeout(
          () => setError(id === "price" ? "price" : (`price.${id}` as any), { message: "Enter a price!" }),
          2000
        )
      );
    } else if (which === "half" && !touchedHalf) {
      setTouchedHalf(true);
      setTimerHalf(
        setTimeout(
          () => setError(id === "price" ? "price.half" : (`price.${id}.half` as any), { message: "Enter a price for half!" }),
          2000
        )
      );
    } else if (which === "full" && !touchedFull) {
      setTouchedFull(true);
      setTimerFull(
        setTimeout(
          () => setError(id === "price" ? "price.full" : (`price.${id}.full` as any), { message: "Enter a price for full!" }),
          2000
        )
      );
    }
  };

  const handleInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    const targetId = event.target.id;

    if (targetId === id && timer !== null) {
      clearTimeout(timer);
    } else if (targetId === `half-${id}` && timerHalf !== null) {
      clearTimeout(timerHalf);
    } else if (targetId === `full-${id}` && timerFull !== null) {
      clearTimeout(timerFull);
    }

    if (!priceInputisValid(value)) {
      if (targetId === id && touched) {
        setError(id === "price" ? "price" : (`price.${id}` as any), { message: "Enter a valid single price !" });
      } else if (targetId === `half-${id}` && touchedHalf) {
        setError(id === "price" ? "price" : (`price.${id}` as any), { message: "Enter a valid price for half !" });
      } else if (targetId === `full-${id}` && touchedFull) {
        setError(id === "price" ? "price.full" : (`price.${id}.full` as any), { message: "Enter a valid price for full !" });
      }
    } else {
      if (targetId === id) {
        clearError(id === "price" ? "price" : (`price.${id}` as any));
      } else if (targetId === `half-${id}`) {
        clearError(id === "price" ? "price" : (`price.${id}` as any));
      } else if (targetId === `full-${id}`) {
        clearError(id === "price" ? "price.full" : (`price.${id}.full` as any));
      }
    }
  };

  const toggle = () => {
    if (branchOut) {
      resetField(id === "price" ? "price.half" : (`price.${id}.half` as any));
      resetField(id === "price" ? "price.full" : (`price.${id}.full` as any));
      setTouchedFull(false);
      setTouchedHalf(false);
    } else {
      resetField(id === "price" ? "price" : (`price.${id}` as any));
      setTouched(false);
    }

    if (timer !== null) {
      clearTimeout(timer);
    } 

    if (timerHalf !== null){
      clearTimeout(timerHalf);
    }

    if (timerFull !== null){
      clearTimeout(timerFull);
    }

    setBranchOut((prevState) => !prevState);
  };

  const style =
    "w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold";

  return (
    <div className="flex w-full justify-around items-center gap-2">
      {branchOut ? (
        <div className="flex flex-col gap-2 items-center justify-evenly">
          <div className="flex gap-3 items-center">
            <label htmlFor={`full-${id}`}>Full: </label>
            <input
              type={type}
              className={style}
              id={`full-${id}`}
              {...register(
                id === "price" ? "price.full" : (`price.${id}.full` as any)
              )}
              onFocus={() => handleTouch("full")}
              onChange={handleInput}
            />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor={`half-${id}`}>Half: </label>
            <input
              type={type}
              className={style}
              id={`half-${id}`}
              {...register(
                id === "price" ? "price.half" : (`price.${id}.half` as any)
              )}
              onFocus={() => handleTouch("half")}
              onChange={handleInput}
            />
          </div>
        </div>
      ) : (
        <input
          type={type}
          className={style}
          id={id}
          {...register(id === "price" ? "price" : (`price.${id}` as any))}
          onFocus={() => handleTouch("single")}
          onChange={handleInput}
        />
      )}
      {branchOut ? (
        <Circle width={20} height={20} onClick={toggle} />
      ) : (
        <CircleSlash2 width={20} height={20} onClick={toggle} />
      )}
    </div>
  );
};

export default BranchableInput;
