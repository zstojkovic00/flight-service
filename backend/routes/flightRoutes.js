const flightController = require('../controllers/flightController')
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();




router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlight);
router.post('/search', flightController.searchFlight);
router.get('/destination/:destination', flightController.belgradeSearchFlight);

router.use(authController.protect);
router.use(authController.restrictTo('admin'))
router.post('/', flightController.createFlight)
router.patch('/:id', flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight);




module.exports = router;