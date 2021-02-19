const { validationResult } = require('express-validator');
const path = require('path')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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