import { z } from "zod";

const TPreRequisiteCourses = z.object({
    course: z.string(),
    isDeleted: z.boolean()
})

const courseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        isDeleted: z.boolean().optional(),
        preRequisiteCourses: z.array(TPreRequisiteCourses).optional(),
    })
})

export const courseValidationSchemas = {
    courseValidationSchema,
}