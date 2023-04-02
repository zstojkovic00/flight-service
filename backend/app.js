const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const flightRouter = require("./routes/flightRoutes");
const bookingRouter = require('./routes/bookingRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
const bookingController = require("./controllers/bookingController");

app.get('/', bookingController.createBookingCheckout);
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use(cors({credentials: true, origin:"http://localhost:3000"}))
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/flights', flightRouter);
app.use('/api/v1/bookings', bookingRouter);





module.exports = app;
