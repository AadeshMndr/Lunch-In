import { z } from "zod";

export const ReviewSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    message: z.string(),
    selectedMealIds: z.array(z.string()),
    rating: z.number().min(1),
});

export const RecommendationSchema = z.object({
    name: z.string(),
    image: z.string(),
    id: z.string(),
    count: z.number(),
    reviewers: z.array(z.string())
});

export const ArrayOfReviewSchema = z.array(ReviewSchema);

export type Review = z.infer<typeof ReviewSchema>;

export type Recommendation = z.infer<typeof RecommendationSchema>;