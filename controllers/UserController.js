import Course from "../model/Course.js";
import User from "../model/User.js";
import fs from "fs"
import cloudinaryPath from "../cloudinary/cloudinary.js";
//create a user
export const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)

    }catch(err){
        next(err)
    }
}

//update a user information 
export const updateUser = async (req, res, next) => {

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set : req.body}, {new :true})
        res.status(200).json(updatedUser)

    }catch(err){
        next(err)
    }
}

//get a users data
export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        console.log(user.username)
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
}

export const resetUser = async (req, res, next) => {
    
}

//get all the users in the database
export const getUsers = async (req, res, next) => {
    try{
        const users = await User.find().select("-password").sort({createdAt: -1});
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
}

//delete a user from the database
export const deleteUser = async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")

    }catch(err){
        next(err)
    }
}

export const getCoursesOfferedByUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);//user id
        
        const list = await Promise.all(user.user_courses.map(course => {
            return Course.findById(course);
        }));
        res.status(200).json(list)
        console.log(list.length)//use it to get total and also show course module
    }catch(err){
        next(err)
    }

};


//get all the course data a user has enrolled in
export const getUserCourse = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        const result = user.data.user_courses;

        res.status(200).json(result)

        //follow up
        result.map((course) => {
            //course is the course id, now the the course content,
            //get a single course
            async (req, res, next) => {
                try{
                    const courseData = await Course.findById(course);
                    res.status(200).json(courseData);
                }catch(err){
                    next(err)
                }
            };
        })

    }catch(err){
        next(err)
    }
}

//delete course from user courses-unenrolling
export const deleteCoursesOfferedByUser = async(req, res, next) => {
    const {userId} = req.params;
     try{
        try{
            await User.findByIdAndUpdate(userId, {$pull: {user_courses: req.params.id}})
            const user = await User.findById(userId).exec();
            const course = await Course.findById(req.params.id).exec();
            const username = user.username;
            await Course.findByIdAndUpdate(req.params.id, {$pull: {enrolledStudents: {user_id: userId, user_name:username}}
            }).exec()
        }catch(err){
            next(err)
        }
        res.status(200).json("You've unenrolled from this course")
     }catch(err){
        next(err)
     }
}

export const uploadProfileImage = async(req, res, next) => {
    const {id} = req.params;
    try{
        const uploader = (path)=> cloudinaryPath(path, 'images');
        const urls = [];
        const files = req.files;
        for (const file of files){
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);

        }
        const findUser = await User.findByIdAndUpdate(id, {
            picture: urls.map((file) => {return file})
        }, {new:true});
        res.json(findUser)

    }catch(err){
        next(err)
    }
}