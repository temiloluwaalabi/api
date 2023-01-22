import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        min:3,
        max:10,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
        min:2,
        max:50
    },
    lastname: {
        type: String,
        required: true,
        min:2,
        max:50
    },
    wishlist: [String],
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        min: 6,
        max:64
    },
    picture: [],
    password: {
        type: String,
        required: true,
        min: 5
    },
    role: {
        type: [String],
        default: ['Student'],
        enum: ['Student','Admin']
    },
    
    about_user:{
        type: String
    },
    user_gender:{
        type: String
    },
    expertise: {
        type: String,
        // required: true,
    },
    country: {
        type: String,
        // required: true,
    },
    phone: {
        type: String,
    },
    // confirmed:{
    //     type: Boolean,
    //     default: false
    // },
    // passwordResetCode:{
    //     type: String,
    //     default: ''
    // },
    refreshToken: [String],
    user_courses: [String],
    

}, {timestamps: true})

export default mongoose.model("User", UserSchema)