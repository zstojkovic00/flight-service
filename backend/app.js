const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const flightRouter = require("./routes/flightRoutes");
const bookingRouter = require('./routes/bookingRoutes');
const cityRouter = require('./routes/cityRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require("path");
const bookingController = require("./controllers/bookingController");

app.get('/', bookingController.createBookingCheckout);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin:"http://localhost:3000"}))
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/flights', flightRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/cities', cityRouter);





module.exports = app;
