const cityController = require('../controllers/cityController')
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();




router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCity);

router.use(authController.protect);
router.use(authController.restrictTo('admin'))
router.post('/', cityController.createCity)
router.patch('/:id', cityController.updateCity);
router.delete('/:id', cityController.deleteCity);




module.exports = router;