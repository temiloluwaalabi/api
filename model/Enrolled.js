import mongoose from "mongoose";
import Course from "./Course";

const Enrolled = new mongoose.Schema({
    userId: {
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    courseId: [{
        type: mongoose.Types.ObjectId,
        of: Number,
        ref: Course}
    ],
    cost: String,
}, {timestamps:true})