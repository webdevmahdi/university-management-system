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
    const result = await AcademicSemester.findOne({id});
    return result;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemestersFromDb,
    getSingleSemesterFromDb,
}