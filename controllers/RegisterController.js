import User from "../model/User.js";
import bcrypt from "bcrypt";

const handleNewUser = async (req,res,next) => {
    const {username, firstname, lastname, email, password} = req.body;
    const emptyFields = [];
    if(!username){
        emptyFields.push(username)
    }
    if(!firstname){
        emptyFields.push("Please fill in your firstname")
    }
    if(!lastname){
        emptyFields.push(lastname)
    }
    if(!email){
        emptyFields.push(email)
    }
    if(!password){
        emptyFields.push(password)
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    //check for duplicate email in the database
    const duplicateEmail = await User.findOne({email: email}).exec()
    if(duplicateEmail) return res.status(409).json({"message":"Email already exists"})
    const duplicateUsername = await User.findOne({username: username}).exec()
    // if(duplicateUsername || duplicateEmail) return res.status(409).json({"message":"username or email already exists"})

    try{
        //encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create a new user
        const newUser = await User.create({
            "username":username,
            "email":email,
            "password": hashedPassword,
            "firstname": firstname,
            "lastname": lastname
        });
        res.status(201).json(newUser)
    }catch(err){
        res.status(500).json({'message': err.message});
    }
}

export default handleNewUser;