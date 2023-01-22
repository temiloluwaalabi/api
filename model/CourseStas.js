import mongoose from "mongoose";
import Course from "./Course";
const CourseStatsSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    monthyData:[
        {
            month: String,
            totalSales:Number,
            totalEnrolled: Number,
        },
    ],
    dailyData:[
        {
            month: String,
            totalSales:Number,
            totalEnrolled: Number,
        },
    ],
    totalStudents: String,
    totalRating: {
        type: Number,
        default: 0
    },
    totalRevews: String
})