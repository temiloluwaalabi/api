import User from "../model/User.js";
import bcrypt from "bcrypt";

const handleNewAdmin = async (req,res,next) => {
    const {username, firstname, lastname, email, password, picture, gender, phone} = req.body;
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
            "lastname": lastname,
            "gender" : gender,
            "phone": phone,
            "picture" : picture,
            // "roles" : "Admin"
        });
        res.status(201).json(newUser)
    }catch(err){
        res.status(500).json({'message': err.message});
    }
}

export default handleNewAdmin;