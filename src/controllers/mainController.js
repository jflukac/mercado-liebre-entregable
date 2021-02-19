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
		console.log(req.query.keywords);
		db.Products.count({
			where: {
			  title: { [Op.like]: '%'+ req.query.keywords + '%'}
			}
			})
		.then(total => {
			let pages = Math.ceil(total/10)
			db.Products.findAll({
				where: {
				  title: { [Op.like]: '%'+ req.query.keywords + '%'}
				},
				order: [
				  ['created_at', 'DESC']
				],
				limit: 10,
				offset: (req.params.page-1)*10		
			})
			.then(products => {
				actualPage = req.params.page
				res.render('results', {products, keywords: req.query.keywords, pages, actualPage})
			})
			.catch( error => { 
				console.log(error)
				throw new Error('Error al acceder a la base de datos')
			})
		})
		.catch( error => { 
			console.log(error)
			throw new Error('Error al acceder a la base de datos')
		})
		
	},
};

module.exports = controller;
