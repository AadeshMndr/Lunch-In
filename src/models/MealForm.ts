import { z } from "zod";

const convertibleToNumber = z.string().refine(
  (rawValue) => {
    const value = rawValue.trim();

    if (value === "") {
      return false;
    }

    return !isNaN(Number(value)) && Number(value) > 0;
  },
  { message: "Enter a valid price !" }
);

export const QuantitativePriceSchema = z.union([
  convertibleToNumber,
  z.object({ full: convertibleToNumber, half: convertibleToNumber }),
]);

//solved an issue here by changing the union for two separate objects into one single object!

const PriceFormSchema = z.object({
  veg: QuantitativePriceSchema.optional(),
  buff: QuantitativePriceSchema.optional(),
  beef: QuantitativePriceSchema.optional(),
  chicken: QuantitativePriceSchema.optional(),
  mutton: QuantitativePriceSchema.optional(),
  pork: QuantitativePriceSchema.optional(),
  fish: QuantitativePriceSchema.optional(),
  mix: QuantitativePriceSchema.optional(),
  nonVeg: QuantitativePriceSchema.optional(),
});

export const mealFormInputFieldSchema = z.object({
  name: z.string().trim().min(1, "The Name cannot be empty !"),
  description: z
    .string()
    .min(1, { message: "Provide a description for the meal" })
    .max(100, { message: "Keep it shorter ! (max: 100 letters)" }),
  category: z.enum(["food", "drinks"]),
  section: z.string().trim().min(1, "The dish must be assigned to a section."),
  price: z.union([QuantitativePriceSchema, PriceFormSchema]),
  image: z.any()
});

export type MealFormInput = z.infer<typeof mealFormInputFieldSchema>;
