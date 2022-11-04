const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/auth.route');
const adminRoutes = require('./routes/admin/auth.route');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const initialData = require('./routes/admin/initialData');
const cartRoutes = require('./routes/cart');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')));   //expose uploads to public

//database
mongoose.connect('mongodb://localhost:27017/MERN-ichiba').then(() => {
    console.log('Database connected');
})

//routes 
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialData);


app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`)
});