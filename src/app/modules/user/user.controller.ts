// import StudentValidationSchema from "../student/student.validation";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/response";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDb(password, studentData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student has created successfully",
        data: result
    })
});

export const UserControllers = {
    createStudent,
}