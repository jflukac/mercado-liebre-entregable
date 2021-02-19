// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

const validation = require('../middlewares/validation')

/* GET LOGIN FORM */
router.get('/login', usersController.login);

/* LOGIN */
router.post('/login', usersController.loginProcess);

/* GET REGISTER FORM */
router.get('/register', usersController.register);

/* CREATE USER */
router.post('/register', validation.userRegister, usersController.saveUser);

/* GET PROFILE */
router.get('/', usersController.profile);  

/* EDIT USER */
router.patch('/edit/:id', usersController.editUser);

/* UPLOAD AVATAR */
router.patch('/avatar/:id', usersController.avatar);

/* DELETE USER */
router.delete('/:id', usersController.deleteUser);

module.exports = router;
