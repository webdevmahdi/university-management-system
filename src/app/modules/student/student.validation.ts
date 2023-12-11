import { z } from 'zod';
import validator from 'validator';

const createStudentNameValidationSchema = z.object({
  firstName: z.string().min(1).max(15).refine(value => /^[A-Z][a-z]*$/.test(value), {
    message: "{VALUE} is not in capitalize format"
  }),
  middleName: z.string().min(0).max(255).optional(),
  lastName: z.string().min(1).refine(value => /^[A-Za-z]+$/.test(value), {
    message: "{value} is not valid"
  }),
});

const createGuardianValidationSchema = z.object({
  fathersName: z.string().min(1),
  fathersOccupation: z.string().min(1),
  fathersContactNo: z.string().min(1),
  mothersName: z.string().min(1),
  mothersOccupation: z.string().min(1),
  mothersContactNo: z.string().min(1),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string()
      .min(8, { message: "Password can not be less than 8 characters" })
      .max(20, { message: "Password can not be mor than 20 characters" }),
    student: z.object({
      name: createStudentNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Others']),
      dateOfBirth: z.string().min(1).optional(),
      email: z.string().min(1).refine(value => validator.isEmail(value), {
        message: "{VALUE} is not a valid email"
      }),
      contactNo: z.string().min(1),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImg: z.string().min(1).optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    })
  })
});
const updateStudentNameValidationSchema = z.object({
  firstName: z.string().min(1).max(15).refine(value => /^[A-Z][a-z]*$/.test(value), {
    message: "{VALUE} is not in capitalize format"
  }).optional(),
  middleName: z.string().min(0).max(255).optional(),
  lastName: z.string().min(1).refine(value => /^[A-Za-z]+$/.test(value), {
    message: "{value} is not valid"
  }).optional(),
});

const updateGuardianValidationSchema = z.object({
  fathersName: z.string().min(1).optional(),
  fathersOccupation: z.string().min(1).optional(),
  fathersContactNo: z.string().min(1).optional(),
  mothersName: z.string().min(1).optional(),
  mothersOccupation: z.string().min(1).optional(),
  mothersContactNo: z.string().min(1).optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).optional(),
  occupation: z.string().min(1).optional(),
  contactNo: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateStudentNameValidationSchema,
      gender: z.enum(['Male', 'Female', 'Others']).optional(),
      dateOfBirth: z.string().min(1).optional(),
      email: z.string().min(1).refine(value => validator.isEmail(value), {
        message: "{VALUE} is not a valid email"
      }).optional(),
      contactNo: z.string().min(1).optional(),
      emergencyContactNo: z.string().min(1).optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
      presentAddress: z.string().min(1).optional(),
      permanentAddress: z.string().min(1).optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().min(1).optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    })
  })
});


export const StudentValidationSchemas = {
  createStudentValidationSchema,
  updateStudentNameValidationSchema,
};




