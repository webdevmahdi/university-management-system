import { TAcademicFaculty } from "./academicFaculty.interface"
import { AcademicFacultyModel } from "./academicFaculty.model"

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
    const result = await AcademicFacultyModel.create(payload);
    return result;
}
const getAllAcademicFacultiesFromDb = async () => {
    const result = await AcademicFacultyModel.find();
    return result;
}
const getSingleAcademicFacultyFromDb = async (id: string) => {
    const result = await AcademicFacultyModel.findById(id)
    return result;
}
const updateSingleAcademicFacultyIntoDb =async (id:string, payload: Partial<TAcademicFaculty>) => {
    const result = await AcademicFacultyModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
      });
      return result;
}


export const AcademicFacultyServices = {
    createAcademicFacultyIntoDb,
    getAllAcademicFacultiesFromDb,
    getSingleAcademicFacultyFromDb,
    updateSingleAcademicFacultyIntoDb
}