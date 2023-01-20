import mongoose from "mongoose";
import cloudinaryPath from "../cloudinary/cloudinary.js";
import Course from "../model/Course.js";
import Module from "../model/Modules.js"
import User from "../model/User.js";
import fs from "fs"
import Category from "../model/Category.js";


//get all courses
export const getAllCourses = async (req, res, next) => {
    try {
        const pages = req.query.p || 0
        const coursesPerPage = 20
        const courses = await Course.find().sort({
            createdAt: -1
        })
        res.status(200).json(courses)
    } catch (err) {
        next(err)
    }
};
//get courses with filter
export const getCourses = async (req, res, next) => {
    const {
        min,
        max,
        ...others
    } = req.query;

    try {
        const courses = await Course.find({
            ...others,price:{$gt:min | 100, $lt:max || 10000}
        }).limit(req.query.limit);
        res.status(200).json(courses)
    } catch (err) {
        next(err)
    }
};
//get a single course
export const getCourse = async (req, res, next) => {
   

    try {
        const {
            id
        } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                error: 'No Such Course'
            })
        }
        // .populate('category')
        const course = await Course.findById(id);
        res.status(200).json(course);
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
};
//create a course
export const createCourse = async (req, res, next) => {
    // const  category = await Category.findById(req.body.category);
    // if(!category) return res.status(400).send('Invalid Category');
    try {
        const {
            courseTitle,
            courseDescription,
            shortDesciption,
            categories,
            // category,
            requirements,
            skillLevel,
            intention,
            // thumbnail,
            price
        } = req.body;

        // const pic = await cloudinaryPath.uploader.upload(req.file.path)
        // const secure_url = pic.secure_url

        const newCourse = new Course({
            courseTitle,
            courseDescription,
            shortDesciption,
            categories,
            requirements,
            skillLevel,
            intention,
            // thumbnail : secure_url,
            price
        })
        const savedCourse = await newCourse.save()
        res.status(201).json(savedCourse)
    } catch (err) {
        res.status(409).json({
            message: err.message
        })
    }
};
//update a course
export const updateCourse = async (req, res, next) => {
    const {
        id
    } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No Such Course'
        })
    }
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(updatedCourse)
    } catch (err) {
        next(err)
    }
};
//delete a product
export const deleteCourse = async (req, res, next) => {
    const {
        id
    } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such employee'
        });
    }
    try {
        await Course.findByIdAndDelete({
            _id: id
        })
        res.status(200).json("deleted")
    } catch (err) {
        next()
    }
};
//get all course lessons
export const getAllCourseModules = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        const list = await Promise.all(course.modules.map(module => {
            return Module.findById(module);
        }));
        res.status(200).json(list)
        console.log(list.length) //use it to get total and also show course module
    } catch (err) {
        next(err)
    }

};
//count course categories
export const countByCat = async (req, res, next) => {
    const categories = req.query.cat.split(",");
    try {
        const list = await Promise.all(categories.map(cat => {
            return Course.countDocuments({
                categories: cat
            })
        }));
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
};
//count total levels
export const countByLevelAggregation = async(req, res, next) => {
    const levels = req.query.level.split(",");
    try {
        const list = await Promise.all(levels.map(level => {
            return Course.countDocuments({
                skillLevel: level
            })
        }));
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}
//individal categories
export const countByLevel = async (req, res, next) => {
    try{
        const Begineer = await Course.countDocuments({skillLevel: "Begineer"});
        const Advanced = await Course.countDocuments({SkillLevel: "Advanced"});

        res.status(200).json([
            {type:"Begineer", count: Begineer},
            {type: "Advanced", count:Advanced}
        ]);
    }catch(err){
        next(err)
    }
}

//count total number of students enrolled
export const totalEnrolled = async (req, res, next) => {
    try {
        const userCount = await Course.countDocuments(enrolledStudents)
        res.status(200).json({
            totalEnrolled: userCount
        })
    } catch (err) {
        next(err)
    }
}

// export const unEnroll = async  (req, res) => {
//     try{
//         const {id, courseId} = req.params;
//         const user = await User.findById(id);
//         const course = await Course.findById(courseId);

//         if(user.user_courses.includes(course)){
//             user.user_courses = user.user_courses.filter((id) => id !== courseId);
//             course.enrolledStudents = course.enrolledStudents.filter((id) => id !== id);
//         }else{
//             user.user_courses.push(courseId);
//             course.enrolledStudents.push(id);
//         }
//         await user.save();
//         await course.save();


//     }catch(err){
//         res.status(404).json({message: err.message})
//     }
// }

// export const getCourseReviews = async (req,res) => {
//     try{
//                 const { id } = req.params;
//                 const user = await User.findById(id);
//                 const course = await Course.findById(courseId);

//                 if(user.user_courses.includes(course)){
//                     user.user_courses = user.user_courses.filter((id) => id !== courseId);
//                     course.enrolledStudents = course.enrolledStudents.filter((id) => id !== id);
//                 }else{
//                     user.user_courses.push(courseId);
//                     course.enrolledStudents.push(id);
//                 }
//                 await user.save();
//                 await course.save();

// const friends = await Promise.all(
//     user.friends.map((id) => User.findById(id))
// );
// const formatted  = friends.map(
//     ({_id, firstname, lastname, occupation}) => {
//         return { _id, firstname, lastname, occupation};
//     }
// );


//             }catch(err){
//                 res.status(404).json({message: err.message})
//     }

// }
//enroll user and update the user and course database
export const enrollUser = async (req, res, next) => {
    try {
        // const id = req.user._id;
        const {
            courseId
        } = req.params;
        const {
            id
        } = req.params;
        const user_id = await User.findById(id).exec();

        if (user_id.user_courses.includes(courseId)) {
            res.status(200).json("Already Enrolled");
            next()
            return;
        }
        const result = await User.findByIdAndUpdate(id, {
            $push: {
                user_courses: courseId
            }
        }).exec();
        try {
            const user = await User.findById(id).exec();
            const username = user.username;
            // res.status(200).json(user)
            const userId = await Course.findById(courseId);
            userId.enrolledStudents.map(student => {
                if (student.user_id === id) {
                    res.status(503).json("Already Enrolled");
                    return;
                }
            })
            //make enrollment only per person
            const updatedCourse = await Course.findByIdAndUpdate(courseId, {
                $push: {
                    enrolledStudents: [{
                        user_id: id,
                        user_name: username
                    }]
                }
            }, {
                new: true
            }).exec()

        } catch (err) {
            next(err)
        }
        res.json("enrolled")
    } catch (err) {
        next(err)
    }
}
export const uploadImages = async(req, res, next) => {
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
        const findCourse = await Course.findByIdAndUpdate(id, {
            thumbnail: urls.map((file) => {return file})
        }, {new:true});
        res.json(findCourse)

    }catch(err){
        next(err)
    }
}

//getCount
export const getCourseCount = async (req, res) => {
    courseCount = await Course.countDocuments((count) => count)

    if(!courseCount){
        res.status(500).json({success:false})
    }
    res.send({
        courseCount: courseCount
    })
}

export const getFeatured = async (req, res, next) => {
    const count = req.params.count ? req.params.count : 0
    const courses = await Course.find({isFeatured: true}).limit(+count)
    if(!courses) {
        res.status(500).json({success: false})
    }
    res.send(courses)
}