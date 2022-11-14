const Category = require('../models/category');
const slugify = require('slugify');

//recusrive function to add sub-categories inside its parent
function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for (let c of category) {
        categoryList.push({
            _id: c._id,
            name: c.name,
            slug: c.slug,
            parentId: c.parentId,
            children: createCategories(categories, c._id)
        })
    }
    return categoryList;
}
//Create
exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }
    if (req.file) {
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    if (req.body.parentId) {   //if parentId exists
        categoryObj.parentId = req.body.parentId
    }
    const cat = new Category(categoryObj);  //save category
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error: error });
        if (category) return res.status(200).json({ category: category });
    })
};

//Read
exports.getCategories = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) return res.status(400).json({ error: error });
        if (categories) {
            const categoryList = createCategories(categories); //recusrively adding sub-categories inside its parent
            return res.status(200).json({ categoryList: categoryList });
        }
    })
}

//
exports.updateCategories = async (req, res) => {
    const { name, parentId, type } = req.body;
    const updatedCategories = []
    if (name instanceof array) {    //if multiple categories to be updated
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            }
            if (parentId[i] !== '') {
                category.parentId = parentId[i];
            }
            const updatedCategory = await Category.findOneAndUpdate({ _id: _id }, category, { new: true });
            updatedCategories.push(updatedCategory);
        }
        return res.statue(201).json({ updatedCategories: req.body })
    } else {
        const category = {       //if single category to be updated
            name: name,
            type: type
        }
        if (parentId !== '') {
            category.parentId = parentId;
            const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true });
            return res.statue(201).json({ updatedCategory })
        }
    }
}