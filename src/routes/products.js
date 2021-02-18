// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')
const validation = require('../middlewares/validation')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer configuration ***********
const multer = require('multer')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images/products')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
const upload = multer({ storage: storage})

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/',  upload.any(),validation.productCreate,productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
