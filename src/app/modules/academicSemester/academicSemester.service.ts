import { academicSemesterNameAndCodeMapper } from "./academicSemester.constants";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
    if(academicSemesterNameAndCodeMapper[payload.name] !== payload.code){
        throw Error('Invalid semester code.')
    }
    const result = await AcademicSemester.create(payload);
    return result;
}
const getAllAcademicSemestersFromDb = async () =>{
    const result = await AcademicSemester.find();
    return result;
}
const getSingleSemesterFromDb = async (id: string) =>{
    const result = await AcademicSemester.findById(id);
    return result;
};
const updateSingleAcademicSemesterIntoDb = async (id: string, payload: Partial<TAcademicSemester>) => {
    if(payload.name && payload.code && academicSemesterNameAndCodeMapper[payload.name] !== payload.code){
        throw new Error('Invalid semester code.')
    }
    const result = await AcademicSemester.findOneAndUpdate({_id: id}, payload, {
        new: true
    });
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemestersFromDb,
    getSingleSemesterFromDb,
    updateSingleAcademicSemesterIntoDb,
}