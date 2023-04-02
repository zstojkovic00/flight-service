const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const express = require("express");

const router = express.Router();




router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)


router.use(authController.protect);

router.patch('/updateMe',userController.uploadUserPhoto,userController.resizeUserPhoto,userController.updateMe);
router.delete('/deleteMe',userController.deleteMe);
router.get('/me',userController.getMe, userController.getUser);



router.use(authController.restrictTo('admin'))

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router;