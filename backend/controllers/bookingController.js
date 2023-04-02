const factory = require('./handlerFactory');
const Booking = require('./../models/bookingModel');
const Flight = require('./../models/flightModel')
const Stripe = require('stripe');
const catchAsync = require('./../util/catchAsync')





exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently booked tour
    const flight = await Flight.findById(req.params.flightId).populate('user');
    // 2) Create Checkout session
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
            success_url: `${req.protocol}://${req.get('host')}/?flight=${
                req.params.flightId
            }&user=${req.user.id}&price=${flight.price}`,
        customer_email: req.user.email,
        client_reference_id: req.params.flightId,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: flight.price * 100,
                    product_data: {
                        name: `${flight.name}`,
                        description: "\n" +
                            "Flight ticket from " + flight.from + " to "+flight.to,
                        images: [`https://www.diplomacyandcommerce.rs/wp-content/uploads/2020/05/Air-Serbia-aircraft.jpg`],
                    },
                },
            },
        ],
        mode: 'payment'
    });

    // 3) Create Session as response
    res.status(200).json({
        status: 'success',
        session,
    });
});


exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    const { flight, user, price } = req.query;

    if (!flight || !user || !price) { return next(); }
    await Booking.create({ flight, user, price });

    res.redirect(`${req.protocol}://${req.hostname}:3000/my-flights`);
});


exports.createBooking = factory.createOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);