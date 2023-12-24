import { Schema, model } from 'mongoose';
import validator from 'validator';
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TStudentName } from './student.interface';


const studentNameSchema = new Schema<TStudentName>({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
    }
});
const guardianSchema = new Schema<TGuardian>({
    fathersName: {
        type: String,
        required: [true, "Fathers name is required"]
    },
    fathersOccupation: {
        type: String,
        required: [true, "Fathers occupation is required"]
    },
    fathersContactNo: {
        type: String,
        required: [true, "Fathers contact no is required"]
    },
    mothersName: {
        type: String,
        required: [true, "Mothers name is required"]
    },
    mothersOccupation: {
        type: String,
        required: [true, "Mothers occupation is required"]
    },
    mothersContactNo: {
        type: String,
        required: [true, "Mothers contact no is required"]
    }
});
const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, "Local guardian name is required"]
    },
    occupation: {
        type: String,
        required: [true, "Local guardian occupation is required"]
    },
    contactNo: {
        type: String,
        required: [true, "Local guardian contact no is required"]
    },
    address: {
        type: String,
        required: [true, "Local guardian address is required"]
    }
});

const studentSchema = new Schema<TStudent, StudentModel>({
    id: {
        type: String,
        required: [true, "ID is required"],
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required.'],
        unique: true,
        ref: 'User'
    },
    name: { type: studentNameSchema, required: true },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female', 'Others'],
            message: " Gender can be the following options 'Male', 'Female' and 'Others'"
        },
        required: true
    },
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: "{VALUE} is not a valid email"
        }
    },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: "Blood groups can only be one of the following 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+' and 'O-'",
        }
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: localGuardianSchema, required: true },
    profileImg: { type: String },
    admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'academicSemester'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
    },
}, {
    toJSON: {
        virtuals: true,
    },
});

// studentSchema.virtual('fullName').get(function () {
//     let name = '';
//     if(this?.name?.middleName){
//         name= this.name.middleName;
//     }
//     return `${this.name.firstName}${name? ' ' + name + ' ' : ' '}${this.name.lastName}`
// })
studentSchema.virtual('fullName').get(function () {
    let name = this?.name;
    let firstName = '';
    let middleName = '';
    let lastName = '';
    if (name) {
        firstName = name?.firstName;
        middleName = name?.middleName;
        lastName = name?.lastName;
    }
    return `${name ? firstName + ' ' : ''}${name ? middleName + ' ' : ' '}${name ? lastName : ''}`;
})
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next()
});
studentSchema.statics.isStudentExists = async function (id: string) {
    const existingStudent = await Student.findOne({ id });
    // if(!existingStudent){
    return existingStudent;
}


export const Student = model<TStudent, StudentModel>('Student', studentSchema);