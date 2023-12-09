import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();
// router.post('/create-student', StudentController.createStudent)
router.get('/', StudentController.allStudent)
router.get('/:studentId', StudentController.singleStudent)
router.delete('/:studentId', StudentController.deleteStudent)

export const StudentRoutes = router;