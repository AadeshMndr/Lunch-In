import dummyImage from "@/assets/dummyImage.jpeg";
import { StaticImageData } from "next/image";
import { z } from "zod";

export const QuantitativePriceSchema = z.union([
  z.number(),
  z.object({ full: z.number(), half: z.number() }),
]);

export const PriceSchema = z.union([
  z.object({
    veg: QuantitativePriceSchema.optional(),
    buff: QuantitativePriceSchema.optional(),
    beef: QuantitativePriceSchema.optional(),
    chicken: QuantitativePriceSchema.optional(),
    mutton: QuantitativePriceSchema.optional(),
    pork: QuantitativePriceSchema.optional(),
    fish: QuantitativePriceSchema.optional(),
    mix: QuantitativePriceSchema.optional(),
  }),
  z.object({ veg: QuantitativePriceSchema, nonVeg: QuantitativePriceSchema }),
]);

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type A = Prettify<StaticImageData>;

export const MealSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.union([
    z.string(),
    z.object({
      src: z.string(),
      height: z.number(),
      width: z.number(),
      blurDataURL: z.string().optional(),
      blurWidth: z.number().optional(),
      blurHeight: z.number().optional(),
    }),
  ]),
  price: z.union([QuantitativePriceSchema, PriceSchema]),
  category: z.enum(["food", "drinks"]),
  section: z.string(),
  id: z.number(),
});

export type Meal = z.infer<typeof MealSchema>;

export type QuantitativePrice = z.infer<typeof QuantitativePriceSchema>;

export type Price = z.infer<typeof PriceSchema>;

type ExtractKeys<T> = T extends any ? keyof T : never;

export type PriceKey = ExtractKeys<Price | Exclude<QuantitativePrice, number>>;

export const keyArray: PriceKey[] = [
  "veg",
  "nonVeg",
  "buff",
  "fish",
  "chicken",
  "full",
  "half",
  "pork",
  "beef",
  "mutton",
  "mix",
];

export const getPriceKeys = (price: Price | QuantitativePrice): PriceKey[] => {
  if (typeof price === "number") {
    return [];
  }

  return Object.keys(price).filter((key) => {
    const value =
      price[key as keyof (Price | Exclude<QuantitativePrice, number>)];

    return typeof value === "object" || !isNaN(value);
  }) as PriceKey[];
};

export const getProperNameOfKeys = (name: PriceKey) => {
  if (name === "nonVeg") {
    return "non-veg";
  }

  return name;
};

export class MealClass {
  constructor(
    public name: string,
    public description: string,
    public price: QuantitativePrice | Price,
    public image: string | StaticImageData,
    public category: "food" | "drinks",
    public section: string,
    public id: number
  ) {}
}

export const picture = dummyImage;

export const DUMMY_DATA = [
  {
    ...new MealClass(
      "Somedish-1",
      "A good food",
      34,
      picture,
      "food",
      "momo",
      1
    ),
  },
  {
    ...new MealClass(
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
    ...new MealClass(
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
  {
    ...new MealClass(
      "Somedish-4",
      "A good food",
      74,
      picture,
      "food",
      "pizza",
      4
    ),
  },
  {
    ...new MealClass(
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
    ...new MealClass(
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
    ...new MealClass(
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
    ...new MealClass(
      "Somedish-8",
      "A good food",
      64,
      picture,
      "food",
      "thukpa",
      8
    ),
  },
  {
    ...new MealClass(
      "Somedish-9",
      "A good food",
      { half: 64, full: 120 },
      picture,
      "food",
      "fried rice",
      9
    ),
  },
  {
    ...new MealClass(
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
    ...new MealClass(
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
    ...new MealClass(
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
