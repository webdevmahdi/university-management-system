import { Request, Response, NextFunction } from "express";
import { StudentService } from "./student.service";
import httpStatus from 'http-status';
import sendResponse from "../../utils/response";

const allStudent = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const result = await StudentService.getAllStudents();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student data has retrieved successfully",
            data: result
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err){
        next(err);
    }
};

const singleStudent = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const { studentId } = req.params
        const result = await StudentService.getSingleStudents(studentId);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student data has retrieved successfully",
            data: result
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err){
        next(err);
    }
    
}

const deleteStudentFromDb = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { studentId } = req.params;
        const result = await StudentService.deleteStudent(studentId)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student has deleted successfully",
            data: result
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err){
        next(err);
    }
}

export const StudentController = {
    allStudent,
    deleteStudentFromDb,
    singleStudent
}