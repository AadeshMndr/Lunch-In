import { z } from "zod";

export const ArrayOfStringsSchema = z.array(z.string());