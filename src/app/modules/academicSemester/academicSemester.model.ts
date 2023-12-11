import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { Months, AcademicSemesterName, AcademicSemesterCode } from "./academicSemester.constants";
import { AppError } from "../../errors/AppError";
import httpStatus from "http-status";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: AcademicSemesterName,
        required: true,
    },
    code: {
        type: String,
        enum: AcademicSemesterCode,
        required: true,
    },
    year: {
        type: String,
        required: true
    },
    startMonth: {
        type: String,
        enum: Months,
        required: true
    },
    endMonth: {
        type: String,
        enum: Months,
        required: true,
    }
}, {
    timestamps: true
})

academicSemesterSchema.pre('save', async function(next) {
    const isSemesterExists = await AcademicSemester.findOne({
        name: this.name,
        year: this.year,
    })
    if(isSemesterExists){
        throw new AppError(httpStatus.BAD_REQUEST,'Semester is already exists!')
    }
    next()
})

export const AcademicSemester = model<TAcademicSemester>('academicSemester', academicSemesterSchema);