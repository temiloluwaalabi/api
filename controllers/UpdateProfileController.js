import User from "../model/User.js"
//update a user information 
const completeProfile = async (req, res, next) => {
    const userId = req.user._id
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {$set : req.body}, {new :true})
        res.status(200).json(updatedUser)

    }catch(err){
        next(err)
    }
}

export default completeProfile;
