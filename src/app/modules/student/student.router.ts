import express from 'express';
import { StudentController } from './student.controller';
import validateData from '../../middlewares/validationSchema';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();
// router.post('/create-student', StudentController.createStudent)
router.get('/', StudentController.allStudent)
router.get('/:id', StudentController.singleStudent)
router.patch('/:id',validateData(updateStudentValidationSchema) , StudentController.updateStudent)
router.delete('/:id', StudentController.deleteStudent)

export const StudentRoutes = router;