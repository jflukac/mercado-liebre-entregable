const path = require('path')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*Database configuration */
const { Sequelize } = require('../db/models');
const db = require('../db/models');
const Op = Sequelize.Op

/*Multer configuration */
const multer = require('multer')
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, './images/products'))
	},
	filename: (req, file, cb) => {
		cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
	}
})
const upload = multer({ storage: storage})

const controller = {
	// Root - Show all products
	index: (req, res) => {
		db.Products.findAll()
		.then(products => {
			return res.render('./products/products', {products})
		})
		.catch( error => { res.send(error)})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		db.Products.findByPk(req.params.id)
		.then(productToShow => {
			res.render('./products/detail', {productToShow});
		})
		.catch(error => {res.send(error)})
	},

	// Create - Form to create
	create: (req, res) => {
		let brandRequest = db.Brands.findAll()
		let categoryRequest = db.Categories.findAll()

		Promise.all([brandRequest, categoryRequest])
		.then(([brands, categories]) => {
			res.render('./products/product-create-form', {brands,categories});
		})
		.catch(error => {res.send(error)})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('./products/product-edit-form');
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;