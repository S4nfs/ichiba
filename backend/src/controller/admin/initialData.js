const Category = require('../../models/category');
const Product = require('../../models/product')


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
            slug: c.sulg,
            parentId: c.parentId,
            type: c.type,
            children: createCategories(categories, c._id)
        })
    }
    return categoryList;
}

exports.initialData = async (req, res) => {
    const categories = await Category.find({}).exec();
    // const products = await Product.find({}).select('_id name slug price quantity description productPictures category').populate('category').exec(); //creating relationship
    const products = await Product.find({}).select('_id name slug price quantity description productPictures category').populate({ path: 'category', select: '_id name' }).exec(); //don't want to display all properties of category in product
    res.status(200).json({
        categories: createCategories(categories),
        products
    })
}