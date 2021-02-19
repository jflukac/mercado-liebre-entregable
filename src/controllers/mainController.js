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
		.catch( error => { 
			console.log(error)
			throw new Error('Error al acceder a la base de datos')
		})
	},
	search: (req, res) => {
		db.Products.findAll({
			where: {
			  title: { [Op.like]: '%'+ req.query.keywords + '%'}
			},
			order: [
			  ['created_at', 'DESC']
			],
			limit: 20,		
		})
		.then(products => {
			res.render('results', {products, keywords: req.query.keywords})
		})
		.catch( error => { 
			console.log(error)
			throw new Error('Error al acceder a la base de datos')
		})
	},
};

module.exports = controller;
