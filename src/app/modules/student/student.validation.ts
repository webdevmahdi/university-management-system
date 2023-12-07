import { z } from 'zod';
import validator from 'validator';

const StudentNameValidationSchema = z.object({
  firstName: z.string().min(1).max(15).refine(value => /^[A-Z][a-z]*$/.test(value), {
    message: "{VALUE} is not in capitalize format"
  }),
  middleName: z.string().min(0).max(255).optional(),
  lastName: z.string().min(1).refine(value => /^[A-Za-z]+$/.test(value), {
    message: "{value} is not valid"
  }),
});

const GuardianValidationSchema = z.object({
  fathersName: z.string().min(1),
  fathersOccupation: z.string().min(1),
  fathersContactNo: z.string().min(1),
  mothersName: z.string().min(1),
  mothersOccupation: z.string().min(1),
  mothersContactNo: z.string().min(1),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

export const StudentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string()
  .min(8, {message: "Password can not be less than 8 characters"})
  .max(20,{message: "Password can not be mor than 20 characters"}),
  name: StudentNameValidationSchema,
  gender: z.enum(['Male', 'Female', 'Others']),
  dateOfBirth: z.string().min(1).optional(),
  email: z.string().min(1).refine(value => validator.isEmail(value), {
    message: "{value} is not a valid email"
  }),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().min(1).optional(),
  isActive: z.enum(['active', 'offline']).default('active'),
  isDeleted: z.boolean().optional().default(false),
});


export default StudentValidationSchema;




