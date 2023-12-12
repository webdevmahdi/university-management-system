import { z } from "zod";

const TPreRequisiteCoursesValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})

const courseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourses: z.array(TPreRequisiteCoursesValidationSchema).optional(),
        isDeleted: z.boolean().optional(),
    })
})

export const courseValidationSchemas = {
    courseValidationSchema,
}