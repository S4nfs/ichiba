const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
// const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth.route');

const app = express();

app.use(express.json())

//database
mongoose.connect('mongodb://localhost:27017/MERN-ichiba').then(() => {
    console.log('Databse connected');
})

//routes 
// app.use('/api', userRoutes)
app.use('/api', adminRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`)
});