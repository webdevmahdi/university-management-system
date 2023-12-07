import { NextFunction, Request, Response } from "express";
// import StudentValidationSchema from "../student/student.validation";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/response";
import httpStatus from 'http-status';

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {password, student: studentData} = req.body;

        // const zodValidatedData = StudentValidationSchema.parse(studentData)
        const result = await UserServices.createStudentOnDb(password, studentData);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student has created successfully",
            data: result
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err : any ) {
        next(err)
    }
};

export const UserControllers = {
    createStudent,
}