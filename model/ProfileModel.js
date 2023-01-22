import mongoose from "mongoose"
const studentProfileSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    profilePic:{
        type: String
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    
},{
    timestamps:true
})

export const StudentProfileModel=mongoose.model("StudentProfile",studentProfileSchema)

