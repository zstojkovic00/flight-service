const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(express.json());
app.use('/api/v1', userRouter);





module.exports = app;
