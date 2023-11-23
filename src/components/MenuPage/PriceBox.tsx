"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import AmountIcons from "../UI/AmountIcons";
import { stringify, destringify } from "@/lib/utils";

import {
  Price,
  getPriceKeys,
  getProperNameOfKeys,
  QuantitativePrice,
} from "@/models/Meal";

interface Props {
  price: Price | QuantitativePrice;
}

const PriceBox: React.FC<Props> = ({ price }) => {
  const priceKeys = useMemo(() => getPriceKeys(price), [price]);

  const [quantity, setQuantity] = useState<"full" | "half">("full");
  const [selectivePrice, setSelectivePrice] = useState<QuantitativePrice>(
    typeof price === "number" || "half" in price
      ? price
      : (price as any)[priceKeys[0]]
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
    priceKeys.includes("half") &&
    priceKeys.every(
      (validKey) =>
        typeof price[
          validKey as keyof (Price | Exclude<QuantitativePrice, number>)
        ] === "number"
    ) &&
    typeof selectivePrice === "object"
  ) {
    return (
      <div className="flex justify-normal items-center text-primaryOrange font-semibold text-center mx-2">
        {typeof selectivePrice === "object" && (
          <AmountIcons quantity={quantity} toggleQuantity={toggleQuantity} />
        )}
        Rs. {quantity === "half" ? selectivePrice.half : selectivePrice.full}
      </div>
    );
  }

  if (
    priceKeys.every(
      (validKey) =>
        typeof price[
          validKey as keyof (Price | Exclude<QuantitativePrice, number>)
        ] === "number"
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
              value={(price as any)[subject] as number}
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
      {typeof selectivePrice === "object" && (
        <AmountIcons quantity={quantity} toggleQuantity={toggleQuantity} />
      )}

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
            const value =
              price[
                subject as keyof (Price | Exclude<QuantitativePrice, number>)
              ];

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
          Rs.{" "}
          {typeof selectivePrice === "number"
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
