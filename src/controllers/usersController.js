const { validationResult } = require('express-validator');
const path = require('path')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*Database configuration */
const { Sequelize } = require('../db/models');
const db = require('../db/models');
const Op = Sequelize.Op

const controller = {

};

module.exports = controller;