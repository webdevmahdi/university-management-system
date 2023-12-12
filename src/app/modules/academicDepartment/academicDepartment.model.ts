import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name:{
        type: String,
        required: [true, 'Department name is required.'],
        ref: 'Academic',
        unique: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: [true, 'Academic faculty is required.'],
        ref: 'AcademicFaculty'
    }
},{
    timestamps: true
})

academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExists = await AcademicDepartmentModel.findOne({name: this.name});
    if(isDepartmentExists){
        throw new AppError(httpStatus.BAD_REQUEST,'The department already exists.')
    }
    next();
});
academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery();
    const isDepartmentExists = await AcademicDepartmentModel.findOne(query);
    if(!isDepartmentExists){
        throw new AppError(httpStatus.NOT_FOUND,'Department does not exists');
    }
    next()
})


export const AcademicDepartmentModel = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)