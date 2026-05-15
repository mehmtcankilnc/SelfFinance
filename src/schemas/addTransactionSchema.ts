import { z } from "zod";

const categorySchema = z.object({
  id: z.number().gt(0, "*Category field cannot be left blank."),
  title: z.string().min(1, "*Category field cannot be left blank."),
  colorCode: z.string(),
});

export const addTransactionSchema = z.object({
  transactionName: z.string().min(1, "*Name field cannot be left blank."),
  transactionCategory: categorySchema,
  transactionAmount: z
    .string()
    .min(1, "*Amount field cannot be left blank.")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "*Amount cannot be negative",
    ),
  transactionDate: z.date({
    error: (issue) =>
      issue.input === undefined
        ? "*Date field cannot be left blank."
        : "*Invalid Input",
  }),
});
