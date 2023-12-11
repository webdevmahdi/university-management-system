import { z } from "zod";

const academicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic department must be a string.',
            required_error: 'Department name is required.'
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic faculty must be a string',
            required_error: 'Faculty name is required.'
        }),
    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic department must be a string',
            required_error: 'Department name is required.'
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: 'Academic faculty must be a string',
            required_error: 'Faculty name is required.'
        }).optional(),
    })
})

export const AcademicDepartmentValidations = {
    academicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
}