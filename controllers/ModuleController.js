import Module from "../model/Modules.js";
import Course from "../model/Course.js";
import { createError } from "../middlewares/error.js";


export const createModule = async(req, res, next) => {
    const {courseId} = req.params;
    const newModule = new Module(req.body);

     try{
        const savedModule = await newModule.save();
        try{
           const rer = await Course.findByIdAndUpdate(courseId, {$push : {modules: savedModule._id}});
        }catch(err){
            next(err)
        }

        res.status(200).json(savedModule)
     }catch(err){
        next(err)
     }
}
export const updateModule = async(req, res, next) => {
     try{
        const updatedModule = await Module.findByIdAndUpdate(req.params.id, {$set : req.body}, {new:true})
        res.status(200).json(updatedModule)
     }catch(err){
        next(err)
     }
}
export const getModule = async(req, res, next) => {
     try{
        const module = await Module.findById(req.params.id);
        res.status(200).json(module)
     }catch(err){
        next(err)
     }
}
export const getModules = async(req, res, next) => {
     try{
        const modules = await Module.find();
        res.status(200).json(modules)
     }catch(err){
        next(err)
     }
}
export const deleteModule = async(req, res, next) => {
    const {courseId} = req.params;
     try{
        await Module.findByIdAndDelete(req.params.id);

        try{
            await Course.findByIdAndUpdate(courseId, {$pull: {modules: req.params.id}})
        }catch(err){
            next(err)
        }
        res.status(200).json("Module has been deleted")
     }catch(err){
        next(err)
     }
}