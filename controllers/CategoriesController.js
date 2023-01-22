import Category from "../model/Category.js"


export const getCategories = async (req, res, next) => {
    const categoryList = await Category.find()

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.send(categoryList)
}

export const addCategory = async (req, res, next) => {
    try{
        // const {name} = req.body
        // const foundCat = await Category.find(name);

        // if(foundCat) {
        //     return res.json("Category already exists")
        // }
            
        let category = new Category({
                name: req.body.name
            })
            category = await category.save();
            if(!category) return res.status(404).json("The category can't be created")
            res.json(category);
        
    }catch(err){
        next()
    }
    

    
}

//update a course
export const updateCategory = async (req, res, next) => {
    const {
        id
    } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No Such Category'
        })
    }
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, {
            $set: req.body
        }, {
            new: true
        })
        res.status(200).json(updatedCategory)
    } catch (err) {
        next(err)
    }
};
//delete a product
export const deleteCategory = async (req, res, next) => {
    const {
        id
    } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            error: 'No such Category'
        });
    }
    try {
        await Category.findByIdAndDelete({
            _id: id
        })
        res.status(200).json("The Category has been deleted")
    } catch (err) {
        next()
    }
};