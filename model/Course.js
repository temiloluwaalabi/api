import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    shortDesciption: {
        type: String,
        required: true
    },
    isFeatured:{
        type: Boolean,
        default: false
    },
    lessonTotal: {
        type: String
    },
    courseTime: {
        type: String
    },
    categories: {
        type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Category',
        required: true
    },
    introVideo: {
        type: String,
    },
    thumbnail: [],
    courseDescription: {
        type: String,
        required: true
    },

    requirements: {
        type: [String],
        required: true
    },
    ratings: [
       { 
        star: Number,
        feedback: "",
        reviewTitle: String,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }
    
    ],
    totalRating: {
        type: String,
        default: 0
    },
    language: {
        type:String
    },

    intention: {
        type: String,
        required: true
    },

    enrolledStudents: [String],

   
    skillLevel: {
        type: String,
        required: true
    },
    modules: {
        type: [String]
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    price: {
        type: String,
    },
    otherFiles:[String]

}, {timestamps: true});

export default mongoose.model('Course', CourseSchema);