import Voter from "../model/Voters.js";
export const createVoter = async (req, res) => {
    const newVoter = new Voter(req.body);
    try{
        const savedVoter = await newVoter.save()
        res.status(200).json(savedVoter)

    }catch(err){
        res.status(409).json({
            message: err.message
        })
    }
}

export const getVoter = async (req, res, next) => {
    try{
        const Voter = await Voter.findById(req.params.id);
        res.status(200).json(Voter)
    }catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}

export const getAllVoters = async (req, res, next) => {
    try{
        const Voters = await Voter.find().select("-password").sort({createdAt: -1});
        res.status(200).json(Voters)
    }catch(err){
        next(err)
    }
}

export const deleteVoter = async (req, res, next) => {
    try{
        await Voter.findByIdAndDelete(req.params.id)
        res.status(200).json("Voter has been deleted")
    }catch(err){
        next(err)
    }
}

export const updateVoter = async (req, res, next) => {

    try{
        const updatedVoter = await Voter.findByIdAndUpdate(req.params.id, {$set : req.body}, {new :true})
        res.status(200).json(updatedVoter)

    }catch(err){
        next(err)
    }
}


