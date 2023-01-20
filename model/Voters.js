import mongoose from "mongoose"
const VotersSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        min: 6,
        max:64
    }
})

export default mongoose.model('Voter', VotersSchema)