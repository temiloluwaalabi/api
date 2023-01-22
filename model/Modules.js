import mongoose from "mongoose";
const ModuleSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    moduleName: {
        type: String,
        required:true
    },
    announcement:{
        type: String,
    },
    content: [{
        sectionTitle: String,
        sectionContent: String,
        type: {type: String, required:true},
        others: String
    }]
    // content: [{
    //         video: String,
    //         textContent: String,
    //         file: [String]
    //     }
    // ]
}, {timestamps: true});

export default mongoose.model('Module', ModuleSchema)