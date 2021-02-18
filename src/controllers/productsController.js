const { validationResult } = require('express-validator');
const path = require('path')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*Database configuration */
const { Sequelize } = require('../db/models');
const db = require('../db/models');
const Op = Sequelize.Op

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
			res.render('./products/detail', {productToShow, title: productToShow.title});
		})
		.catch(error => {res.send(error)})
	},

	// Create - Form to create
	create: (req, res) => {
		let brandRequest = db.Brands.findAll()
		let categoryRequest = db.Categories.findAll()

		Promise.all([brandRequest, categoryRequest])
		.then(([brands, categories]) => {
			res.render('./products/product-create-form', {brands,categories, previousData: {}, errors:[]});
		})
		.catch(error => {res.send(error)})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let errors = validationResult(req)
		return res.send(req.body)
		if (req.files.length == 0 ){
			let errorImagen = {
				msg: 'Es obligatorio cargar una imagen',
				param: 'photo',
				location: 'files',
			}
			errors.errors.push (errorImagen)
		}
		//return res.send(errors)
		if (errors.isEmpty()){
			db.Products.create({
				title: req.body.name,
				description: req.body.description,
				photo: '/images/products/' + req.files[0].filename,
				price: req.body.price,
				stock: req.body.stock,
				brand_id: req.body.brand,
				category_id: req.body.category
			})
			.then(product => {
				res.redirect('/products/' + product.id)
			})
			.catch(error => {res.send(error)})
		} else {
			let brandRequest = db.Brands.findAll()
			let categoryRequest = db.Categories.findAll()

			Promise.all([brandRequest, categoryRequest])
			.then(([brands, categories]) => {
				return res.render('./products/product-create-form', {brands,categories, previousData:{...req.body,}, errors: errors.mapped()});
			})
			.catch(error => {res.send(error)})
			}
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
		db.Products.destroy({
			where:{
				id: req.params.id
			}
		})
		.then(()=> {
			res.redirect('/')
		})
		.catch(error => {res.send(error)})
	}
};

module.exports = controller;