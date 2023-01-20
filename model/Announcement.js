import mongoose from "mongoose";
const AnnouncementSchema = new mongoose.Schema({
    course_id: {
        type: String,
        required:true
    },
    title:{
        type: String,
        required: true
    },
    posted_on: {
        type: String
    },
    content: {
        type: String
    }
});

export default mongoose.model('Module', AnnouncementSchema)