const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id }).exec((error, cart) => {
        if (error) return res.status(400).json({ error: error });
        if (cart) {

            const isProductExists = cart.cartItems.find(c => c.product == req.body.cartItems.product);
            if (isProductExists) {
                Cart.findOneAndUpdate({ "user": req.user._id, "cartItems.product": req.body.cartItems.product }, {
                    "$set": {
                        "cartItems.$": { ...req.body.cartItems, quantity: isProductExists.quantity + req.body.cartItems.quantity }
                    }
                }).exec((error, _cart) => {
                    if (error) return res.status(400).json({ error: error });
                    if (_cart) return res.status(201).json({ cart: _cart });
                });
            } else {
                //if user already added something in cart, update cart items
                Cart.findOneAndUpdate({ user: req.user._id }, {
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                }).exec((error, _cart) => {
                    if (error) return res.status(400).json({ error: error });
                    if (_cart) return res.status(201).json({ cart: _cart });
                });
            }
        } else {
            //if not exists create new
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems],
            })
            cart.save((error, cart) => {
                if (error) return res.status(400).json({ error: error });
                if (cart) return res.status(201).json({ cart: cart });
            })
        }

    })
}