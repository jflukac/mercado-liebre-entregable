// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

const validation = require('../middlewares/validation')

const multer = require('multer')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images/users')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
const upload = multer({ storage: storage})


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
router.patch('/avatar/upload/:id', upload.any(),usersController.avatar);

/* DELETE USER */
router.delete('/:id', usersController.deleteUser);

module.exports = router;
