import { StudentService } from "./student.service";
import httpStatus from 'http-status';
import sendResponse from "../../utils/response";
import catchAsync from "../../utils/catchAsync";


const allStudent = catchAsync(async (req, res) => {
    const result = await StudentService.getAllStudentsFromDb(req.query);
    // if(await result <= 0){
    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     success: true,
    //     message: "You don't have any data",
    //     data: null
    // })
    // }
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student data has retrieved successfully",
        data: result    
    })

})

const singleStudent = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await StudentService.getSingleStudentFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student data has retrieved successfully",
        data: result
    })
})

const updateStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { student } = req.body;
    const result = await StudentService.updateStudentIntoDb(id, student);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student updated successfully",
        data: result
    })
})

const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentService.deleteStudentFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student has deleted successfully",
        data: result
    })
})

export const StudentController = {
    allStudent,
    singleStudent,
    updateStudent,
    deleteStudent,
}