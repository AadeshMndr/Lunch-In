"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BatteryMedium, BatteryFull } from "lucide-react";

import {
  Price,
  getPriceKeys,
  getProperNameOfKeys,
  QuantitativePrice,
} from "@/models/Meal";

interface Props {
  price: Price | number;
}

const stringify = (value: number | object) => {
  if (typeof value === "number") {
    return value.toString();
  }

  const keys = Object.keys(value);

  const stringedObject = keys
    .map((key) => `${key}:${value[key as keyof typeof value]}`)
    .join("|-|");

  return stringedObject;
};

const destringify = (stringedObject: string) => {
  const stringedPairs = stringedObject.split("|-|");

  const theObject = new Object();

  stringedPairs.forEach((pair) => {
    const [key, value] = pair.split(":");

    (theObject as any)[key] = Number(value);
  });

  return theObject;
};

const PriceBox: React.FC<Props> = ({ price }) => {
  const priceKeys = useMemo(() => getPriceKeys(price), [price]);

  const [quantity, setQuantity] = useState<"full" | "half">("full");
  const [selectivePrice, setSelectivePrice] = useState<QuantitativePrice>(
    typeof price === "number" ? price : (price as any)[priceKeys[0]]
  );

  const toggleQuantity = () => {
    setQuantity((prevState) => (prevState === "full" ? "half" : "full"));
  };

  if (typeof price === "number") {
    return (
      <div className="text-primaryOrange font-semibold max-w-[70px]">
        Rs. {price}
      </div>
    );
  }

  if (
    priceKeys.every(
      (validKey) => typeof price[validKey as keyof Price] === "number"
    ) &&
    typeof selectivePrice === "number"
  ) {
    return (
      <div className="max-w-[70px] text-primaryOrange font-semibold text-center mx-2">
        <motion.select
          whileHover={{ scale: 1.03 }}
          id="priceBox"
          onChange={(event) => setSelectivePrice(Number(event.target.value))}
          className="max-w-fit focus:outline-none bg-primaryOrange text-primaryBrown rounded-md"
        >
          {priceKeys.map((subject) => (
            <option
              value={price[subject as keyof Price] as number}
              key={subject}
              className="hover:text-red-500"
            >
              {getProperNameOfKeys(subject)}
            </option>
          ))}
        </motion.select>
        <div className="text-primaryOrange font-semibold">
          Rs.{selectivePrice}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-normal items-center text-primaryOrange font-semibold text-center mx-2">
      {typeof selectivePrice === "object" &&
        (quantity === "full" ? (
          <BatteryFull
            width={30}
            height={30}
            className="-rotate-90 hover:scale-[1.03]"
            onClick={toggleQuantity}
          />
        ) : (
          <BatteryMedium
            width={30}
            height={30}
            className="-rotate-90 hover:scale-[1.03]"
            onClick={toggleQuantity}
          />
        ))}

      <div>
        <motion.select
          whileHover={{ scale: 1.03 }}
          onChange={(event) => {
            const value = event.target.value;

            if (isNaN(Number(value))) {
              const obj = destringify(value);

              let newPriceObject = {
                full: NaN,
                half: NaN,
              };

              if ("half" in obj) {
                newPriceObject.half = Number(obj.half);
              }

              if ("full" in obj) {
                newPriceObject.full = Number(obj.full);
              }

              setSelectivePrice(newPriceObject);

              return;
            }

            setSelectivePrice(Number(event.target.value));
          }}
          className="max-w-fit focus:outline-none bg-primaryOrange text-primaryBrown rounded-md"
        >
          {priceKeys.map((subject) => {
            const value = price[subject as keyof Price];

            return (
              <option
                value={stringify(value)}
                key={subject}
                className="hover:text-red-500"
              >
                {getProperNameOfKeys(subject)}
              </option>
            );
          })}
        </motion.select>
        <div className="text-primaryOrange font-semibold">
          Rs. {typeof selectivePrice === "number"
            ? selectivePrice
            : quantity === "full"
            ? selectivePrice.full
            : selectivePrice.half}
        </div>
      </div>
    </div>
  );
};

export default PriceBox;
