"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  MealSchema,
  Meal,
  keyArray,
  getProperNameOfKeys,
  PriceKey,
} from "@/models/Meal";
import { getUnrepeatedArray } from "@/lib/utils";
import BranchableInput from "../UI/BranchableInput";

interface Props {
  meals: Meal[];
}

const MealForm: React.FC<Props> = ({ meals }) => {
  const [choosenKeys, setChoosenKeys] = useState<PriceKey[]>([]);

  const dealWithKeyCheckBox = (key: PriceKey) => {
    setChoosenKeys((prevState) => {
      if (prevState.includes(key)) {
        return prevState.filter((oldKey) => oldKey !== key);
      } else if (key === "nonVeg") {
        return ["veg", "nonVeg"];
      } else if (key === "veg") {
        return [...prevState, key];
      } else {
        return [...prevState.filter((oldKey) => oldKey !== "nonVeg"), key];
      }
    });
  };

  console.log(choosenKeys);

  const { register, watch } = useForm<Meal>({
    resolver: zodResolver(MealSchema),
  });

  const sectionsList = getUnrepeatedArray<string>(
    meals
      .filter(({ category }) =>
        watch("category") ? category === watch("category") : true
      )
      .map(({ section }) => section)
  );

  return (
    <form className="p-5">
      <div className="flex flex-row gap-3 items-center text-orange-950 mb-5">
        <label htmlFor="name" className="text-lg font-semibold">
          Name:{" "}
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
        />
      </div>
      <div className="flex flex-row gap-3 items-center text-orange-950 mb-5">
        <span className="text-lg font-semibold">Category: </span>
        <div className="flex justify-evenly items-center">
          <div className="flex gap-1 mx-8 items-center">
            <input
              {...register("category")}
              id="food"
              type="radio"
              name="category"
              value={"food"}
              className="w-4 h-4 translate-y-[1px] accent-primaryOrange"
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="flex gap-1 mx-8 items-center">
            <input
              {...register("category")}
              id="drinks"
              type="radio"
              name="category"
              value={"drinks"}
              className="w-4 h-4 translate-y-[1px] accent-primaryOrange"
            />
            <label htmlFor="food">Drinks</label>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center text-orange-950 mb-5">
        <label htmlFor="section" className="text-lg font-semibold">
          Section:{" "}
        </label>
        <input
          id="section"
          type="text"
          className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
          list="sectionlist"
        />
        <datalist id="sectionlist">
          {sectionsList.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </datalist>
      </div>
      <div className="flex flex-col gap-1 text-orange-950 mb-5">
        <label htmlFor="price" className="text-lg font-semibold">
          Price:{" "}
        </label>
        <div className="flex justify-around items-center my-2">
          <div className="grid grid-cols-1 gap-1">
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                value={"veg"}
                checked={choosenKeys.includes("veg")}
                onChange={() => dealWithKeyCheckBox("veg")}
              />
              <span>veg</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                value={"nonVeg"}
                checked={choosenKeys.includes("nonVeg")}
                onChange={() => dealWithKeyCheckBox("nonVeg")}
              />
              <span>non-veg</span>
            </div>
          </div>
          <div className="grid pc:grid-cols-7 mobile:grid-cols-3 gap-1 border-l-2 border-orange-950 pl-5">
            {keyArray
              .filter((key) => !["veg", "nonVeg", "full", "half"].includes(key))
              .map((key) => (
                <div className="flex gap-1" key={key}>
                  <input
                    type="checkbox"
                    value={key}
                    checked={choosenKeys.includes(key)}
                    onChange={() => dealWithKeyCheckBox(key)}
                  />
                  <span>{getProperNameOfKeys(key)}</span>
                </div>
              ))}
          </div>
        </div>

        {choosenKeys.length <= 1 ? (
          <BranchableInput type="number" id="price"/>
        ) : (
          <div className="flex flex-col items-center gap-1">
            {choosenKeys.map((key) => (
              <div className="flex flex-row items-center gap-2 my-3">
                <label htmlFor={`${getProperNameOfKeys(key)}-price`} className="font-semibold min-w-max">{`${getProperNameOfKeys(key)}: `}</label>
                <BranchableInput type="number" id={`${getProperNameOfKeys(key)}-price`}/>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 items-center text-orange-950 mb-5">
        <label
          htmlFor="description"
          className="self-start text-lg font-semibold"
        >
          Description:{" "}
        </label>
        <textarea
          rows={3}
          id="description"
          className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
        />
      </div>
    </form>
  );
};

export default MealForm;
