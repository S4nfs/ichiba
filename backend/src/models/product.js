const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: {
        type: Number
    },
    productPictures: [{
        img: {
            type: String
        }
    }],
    reviews: [{
        userid: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }, //relationships
        reviews: String
    }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    updatedAt: Date,
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema);