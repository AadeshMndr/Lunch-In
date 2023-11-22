import dummyImage from "@/assets/dummyImage.jpeg";
import { StaticImageData } from "next/image";
import { z } from "zod";

export const QuantitativePriceSchema = z.union([
  z.number(),
  z.object({ full: z.number(), half: z.number() }),
]);

export const MealSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.union([
    z.number(),
    z.object({
      veg: QuantitativePriceSchema,
      buff: QuantitativePriceSchema.optional(),
      beef: QuantitativePriceSchema.optional(),
      chicken: QuantitativePriceSchema.optional(),
      mutton: QuantitativePriceSchema.optional(),
      pork: QuantitativePriceSchema.optional(),
      fish: QuantitativePriceSchema.optional(),
    }),
    z.object({ veg: QuantitativePriceSchema, nonVeg: QuantitativePriceSchema }),
  ]),
  category: z.enum(["food", "drinks"]),
  section: z.string(),
  id: z.number(),
});

export type MealType = z.infer<typeof MealSchema>;

export type QuantitativePrice = z.infer<typeof QuantitativePriceSchema>;

export type Price =
  | {
      veg: QuantitativePrice;
      buff?: QuantitativePrice;
      beef?: QuantitativePrice;
      chicken?: QuantitativePrice;
      mutton?: QuantitativePrice;
      pork?: QuantitativePrice;
      fish?: QuantitativePrice;
    }
  | {
      veg: QuantitativePrice;
      nonVeg: QuantitativePrice;
    };

type ExtractKeys<T> = T extends any ? keyof T : never;

type PriceKey = ExtractKeys<Price>;

export const getPriceKeys = (price: Price | number): PriceKey[] => {
  if (typeof price === "number") {
    return [];
  }

  return Object.keys(price).filter((key) => {
    const value = price[key as keyof Price];

    return typeof value === "object" || !isNaN(value);
  }) as PriceKey[];
};

export const getProperNameOfKeys = (name: PriceKey) => {
  if (name === "nonVeg") {
    return "non-veg";
  }

  return name;
};

export class Meal {
  constructor(
    public name: string,
    public description: string,
    public price: number | Price,
    public image: string | StaticImageData,
    public category: "food" | "drinks",
    public section: string,
    public id?: number
  ) {
    this.id = id || Math.random();
  }
}

export const picture = dummyImage;

export const DUMMY_DATA = [
  {
    ...new Meal("Somedish-1", "A good food", 34, picture, "food", "momo", 1),
  },
  {
    ...new Meal(
      "Somedish-2",
      "A good food, fills your stomach and is healthy as well",
      { buff: 150, chicken: 145, veg: 120 },
      picture,
      "food",
      "momo",
      2
    ),
  },
  {
    ...new Meal(
      "Somedish-3",
      "A good food",
      {
        veg: 200,
        buff: { half: 130, full: 260 },
        pork: { half: 80, full: 120 },
      },
      picture,
      "food",
      "sandwich",
      3
    ),
  },
  { ...new Meal("Somedish-4", "A good food", 74, picture, "food", "pizza", 4) },
  {
    ...new Meal(
      "Somedish-5",
      "A good food",
      { veg: 120, nonVeg: 200 },
      picture,
      "food",
      "chowmein",
      5
    ),
  },
  {
    ...new Meal(
      "Somedish-6",
      "A good food",
      { veg: 56, nonVeg: { half: 78, full: 120 } },
      picture,
      "drinks",
      "hot drinks",
      6
    ),
  },
  {
    ...new Meal(
      "Somedish-7",
      "A good food",
      14,
      picture,
      "drinks",
      "cold drinks",
      7
    ),
  },
  {
    ...new Meal("Somedish-8", "A good food", 64, picture, "food", "thukpa", 8),
  },
  {
    ...new Meal(
      "Somedish-9",
      "A good food",
      64,
      picture,
      "food",
      "fried rice",
      9
    ),
  },
  {
    ...new Meal(
      "Somedish-10",
      "A good food",
      64,
      picture,
      "food",
      "fried rice",
      10
    ),
  },
  {
    ...new Meal(
      "Somedish-11",
      "A good food",
      64,
      picture,
      "food",
      "snacks",
      11
    ),
  },
  {
    ...new Meal(
      "Somedish-12",
      "A good food",
      { pork: 256, chicken: 129, veg: 120, mutton: 450 },
      picture,
      "food",
      "chowmein",
      12
    ),
  },
];
