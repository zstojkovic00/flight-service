const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(cors({credentials: true, origin:"http://localhost:3000"}))
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/users', userRouter);





module.exports = app;
