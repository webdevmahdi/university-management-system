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

const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;
  
    const result = await UserServices.createFacultyIntoDB(password, facultyData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is created succesfuly',
      data: result,
    });
  });
  
  const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;
  
    const result = await UserServices.createAdminIntoDB(password, adminData);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin is created succesfully',
      data: result,
    });
  });
  
export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin,
}