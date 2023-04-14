const factory = require("./handlerFactory");
const City = require("../models/cityModel");


exports.getAllCities = factory.getAll(City);
exports.getCity = factory.getOne(City);
exports.updateCity = factory.updateOne(City);
exports.deleteCity = factory.deleteOne(City);
exports.createCity = factory.createOne(City);


