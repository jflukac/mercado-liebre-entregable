const { validationResult } = require('express-validator');
const path = require('path')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const bcrypt = require('bcrypt')

/*Database configuration */
const { Sequelize } = require('../db/models');
const db = require('../db/models');
const Op = Sequelize.Op

const controller = {
    login: (req, res) => {
        res.render('./users/login', {errors:[], userAttempt:{}})
    },
    loginProcess: (req, res) => {
        
    },
    register: (req, res) => {
        res.render('./users/register', {errors:[], userAttempt:{}})
    },
    saveUser: (req, res) => {
        let errors = validationResult(req)
		if (errors.isEmpty()) {
            db.Users.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            })
            .then(user => {
                return res.render('./users/profile', {user})
            })
        } else {
            return res.render('./users/register', {errors:errors.mapped(), userAttempt:{...req.body}})
        }
    },
    profile: (req, res) => {
        
    },
    editUser: (req, res) => {
        
    },
    avatar: (req, res) => {
        
    },
    deleteUser: (req, res) => {
        
    }
};

module.exports = controller;