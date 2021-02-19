// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

const validation = require('../middlewares/validation')

/* GET LOGIN FORM */
router.get('/login', usersController.login);

/* LOGIN */
router.post('/login', validation.userLogin, usersController.loginProcess);

/* GET REGISTER FORM */
router.get('/register', usersController.register);

/* CREATE USER */
router.post('/register', validation.userRegister, usersController.saveUser);

/* GET PROFILE */
router.get('/profile', usersController.profile);  

/* EDIT USER */
router.patch('/edit/:id', usersController.editUser);

/* GET UPLOAD AVATAR FORM */
router.get('/avatar/upload', usersController.avatarForm);

/* UPLOAD AVATAR */
router.patch('/avatar/upload', usersController.avatar);

/* DELETE USER */
router.delete('/', usersController.deleteUser);

module.exports = router;
