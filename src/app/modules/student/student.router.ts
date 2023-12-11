import express from 'express';
import { StudentController } from './student.controller';
import validateData from '../../middlewares/validationSchema';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();
// router.post('/create-student', StudentController.createStudent)
router.get('/', StudentController.allStudent)
router.get('/:studentId', StudentController.singleStudent)
router.patch('/:studentId',validateData(updateStudentValidationSchema) , StudentController.updateStudent)
router.delete('/:studentId', StudentController.deleteStudent)

export const StudentRoutes = router;