const mongoose = require('mongoose');
const express = require("express");
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');




const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);


mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( () =>
    console.log('DB connection successful!')
).catch(err=>{
    console.log('ERROR');
})

const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{
    console.log(`App running on port ${port}...`);
})

