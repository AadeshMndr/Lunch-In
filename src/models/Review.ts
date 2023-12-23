import { z } from "zod";

export const ReviewSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    message: z.string(),
    selectedMealIds: z.array(z.string()),
    rating: z.number().min(1),
});

export type Review = z.infer<typeof ReviewSchema>;