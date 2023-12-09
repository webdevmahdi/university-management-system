import sendResponse from "../../utils/response";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic semester has created successfully",
        data: result
    })
});

const getAllAcademicSemesters = catchAsync(async (req, res)=>{
    const result = await AcademicSemesterServices.getAllAcademicSemestersFromDb()
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "Here is all the academic semesters",
        data: result,
    })
});

const getSingleSemester = catchAsync(async (req, res)=>{
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.getSingleSemesterFromDb(semesterId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Here is your academic semester",
        data: result,
    })
})

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleSemester,
}