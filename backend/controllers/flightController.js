const factory = require("./handlerFactory");
const Flight = require("../models/flightModel");
const catchAsync = require('../util/catchAsync')


exports.getAllFlights = factory.getAll(Flight);
exports.getFlight = factory.getOne(Flight);
exports.updateFlight = factory.updateOne(Flight);
exports.deleteFlight = factory.deleteOne(Flight);
exports.createFlight = factory.createOne(Flight);


exports.searchFlight = catchAsync (async(req,res,next)=> {
    const from = req.body.from;
    const to = req.body.to;
    const startDate = Date.parse(req.body.date);
    Flight.find({ from, to, date: { $gte: startDate} })
        .exec()
        .then((flights) => res.status(200).json(flights))
        .catch((err) => res.status(500).json("Error: " + err));
});

exports.belgradeSearchFlight = async (req, res, next) => {
    const { destination } = req.params;
    try {
        const regex = new RegExp(destination, 'i'); // i flag makes it case-insensitive
        const flights = await Flight.find({ from: 'Belgrade', to: regex }).exec();
        res.json(flights);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};




