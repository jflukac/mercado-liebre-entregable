const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { Sequelize } = require('../db/models');
const db = require('../db/models');
const Op = Sequelize.Op

const controller = {
	index: (req, res) => {
		db.Products.findAll()
		.then(products => {
			//return res.send(products)
			return res.render('index', {products})
		})
		.catch( error => { res.send(error)})
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
