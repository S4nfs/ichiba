const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');

exports.createProduct = (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body }); //req.files as we are handling array of files in multer 
    const { name, price, quantity, description, category, createdBy } = req.body;
    let productPictures = [];
    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        });
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price: price,
        quantity: quantity,
        description: description,
        productPictures: productPictures,
        category: category,
        createdBy: req.user._id
    });
    product.save(((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(200).json({ product: product });
        }
    }));
};
