const Category = require('../models/category');
const slugify = require('slugify');

exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if (req.body.productId) {   //if parentId exists
        categoryObj.parentId = req.body.parentId
    }
    const cat = new Category(categoryObj);  //save category
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error: error });
        if (category) return res.status(400).json({ category: category });
    })
};

exports.getCategories = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) return res.status(400).json({ error: error });
        if (categories) return res.status(400).json({ categories: categories });
    })
}