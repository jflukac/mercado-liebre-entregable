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
		.catch( error => { 
			console.log(error)
			throw new Error('Error al acceder a la base de datos')
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		db.Products.findByPk(req.params.id)
		.then(productToShow => {
			res.render('./products/detail', {productToShow, title: productToShow.title});
		})
		.catch(error => {
			console.log(error)
			throw new Error('Error al acceder a la base de datos')
		})
	},

	// Create - Form to create
	create: (req, res) => {
		let brandRequest = db.Brands.findAll()
		let categoryRequest = db.Categories.findAll()

		Promise.all([brandRequest, categoryRequest])
		.then(([brands, categories]) => {
			res.render('./products/product-create-form', {brands,categories, previousData: {}, errors:[]});
		})
		.catch(error => {
			console.log(error)
			throw new Error('Error al acceder a la base de datos')
		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let errors = validationResult(req)
		if (req.files.length == 0 ){
			let errorImagen = {
				msg: 'Es obligatorio cargar una imagen',
				param: 'photo',
				location: 'files',
			}
			errors.errors.push (errorImagen)
		}
		if (errors.isEmpty()){
			if(req.body.stock == ""){
				db.Products.create({
					title: req.body.title,
					description: req.body.description,
					photo: '/images/products/' + req.files[0].filename,
					price: req.body.price,
					brand_id: req.body.brand,
					category_id: req.body.category
				})
				.then(product => {
					res.redirect('/products/' + product.id)
				})
				.catch(error => {
					console.log(error)
					throw new Error('Error al acceder a la base de datos')
				})
			} else {
				db.Products.create({
					title: req.body.title,
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
				.catch(error => {
					console.log(error)
					throw new Error('Error al acceder a la base de datos')
				})
			}
			
		} else {
			let brandRequest = db.Brands.findAll()
			let categoryRequest = db.Categories.findAll()

			Promise.all([brandRequest, categoryRequest])
			.then(([brands, categories]) => {
				return res.render('./products/product-create-form', {brands,categories, previousData:{...req.body,}, errors: errors.mapped()});
			})
			.catch(error => {
				console.log(error)
				throw new Error('Error al acceder a la base de datos')
			})
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productRequest = db.Products.findByPk(req.params.id,{
			include: [
				{association: 'category'}
			]
		})
		let brandRequest = db.Brands.findAll()
		let categoryRequest = db.Categories.findAll()

		Promise.all([productRequest, brandRequest, categoryRequest])
		.then(([productToEdit, brands, categories]) => {
		res.render('./products/product-edit-form', {productToEdit,categories, brands, title: 'Editando ' + productToEdit.title,  errors:[]})
		})
		.catch(error => {
			console.log(error)
			throw new Error('Error al acceder a la base de datos')
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let errors = validationResult(req)
		if (errors.isEmpty()){
			if (req.files.length == 0) {
				db.Products.update({
					title: req.body.title,
					description: req.body.description,
					price: req.body.price,
					stock: req.body.stock,
					brand_id: req.body.brand
				}, {
					where: {
						id: req.params.id
					}
				})
				.then(() => {
					db.Products.findByPk(req.params.id)
					.then(product => {
						res.redirect('/products/' + product.id)
					})
					.catch( error => { 
						console.log(error)
						throw new Error('Error al acceder a la base de datos')
					})
				})
				.catch(error => {
					console.log(error)
					throw new Error('Error al acceder a la base de datos')
				})
			} else {
				console.log('viajó por acá');
				db.Products.update({
					title: req.body.title,
					description: req.body.description,
					photo: '/images/products/' + req.files[0].filename,
					price: req.body.price,
					stock: req.body.stock,
					brand_id: req.body.brand
				}, {
					where: {
						id: req.params.id
					}
				})
				.then(() => {
					db.Products.findByPk(req.params.id)
					.then(product => {
						res.redirect('/products/' + product.id)
					})
					.catch( error => { 
						console.log(error)
						throw new Error('Error al acceder a la base de datos')
					})
				})
				.catch(error => {
					console.log(error)
					throw new Error('Error al acceder a la base de datos')
				})
			}
		} else {
			let brandRequest = db.Brands.findAll()
			let categoryRequest = db.Categories.findAll()
			Promise.all([ brandRequest, categoryRequest])
			.then(([brands, categories]) => {
				let productToEdit = {...req.body}
				return res.render('./products/product-edit-form', {brands,categories, productToEdit, errors: errors.mapped(), title: 'Editando ' + productToEdit.title});
			})
			.catch(error => {
				console.log(error)
				throw new Error('Error al acceder a la base de datos')
			})
		}

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
			res.redirect('/products/')
		})
		.catch(error => {
			console.log(error)
			throw new Error('Error al acceder a la base de datos')
		})
	}
};

module.exports = controller;