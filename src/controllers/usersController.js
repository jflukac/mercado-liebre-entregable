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
        res.render('./users/login', {userAttempt:{}})
    },
    loginProcess: (req, res) => {
        let errors = validationResult(req)
		if (errors.isEmpty()) {
            db.Users.findOne({
                where: { email: req.body.email}
            })
            .then(userToLogin => {
                if (userToLogin) {
                    if(bcrypt.compareSync(req.body.password, userToLogin.password)) {
                        req.session.user = userToLogin
                        res.locals.user = req.session.user;
                        return res.redirect('/users/profile');
                    } else {
                        let errors = "El usuario o la contraseña ingresados no son validos."
                        return res.render ('./users/login' , {errors, userAttempt:{...req.body}})
                    }
                } else {
                    let errors = "El usuario o la contraseña ingresados no son validos."
                    return res.render ('./users/login' , {errors, userAttempt:{...req.body}})
                }
            })
            .catch(error => {
                console.log(error)
                throw new Error('Error al acceder a la base de datos')
            })
        } else {
            return res.render('./users/login', {errors:errors.mapped(), userAttempt:{...req.body}})
        }
    },
    register: (req, res) => {
        res.render('./users/register', {errors:[], userAttempt:{}})
    },
    saveUser: (req, res) => {
        db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(registerUser => {
            if(registerUser) {
                let errors= {
                    userRegister : {
                        msg: 'El usuario ya existe',
                        param: 'userRegister',
                        location: 'body'
                    }
                }
                return res.render('./users/register', {errors:errors, userAttempt:{...req.body}})
            } else {
                let errors = validationResult(req)
                //return res.send(errors)
                if (errors.isEmpty()) {
                    db.Users.create({
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, 10)
                    })
                    .then(user => {
                        return res.render('./users/login', {userAttempt: user})
                    })
                    .catch(error => {
                        console.log(error)
                        throw new Error('Error al acceder a la base de datos')
                    })
                } else {
                    return res.render('./users/register', {errors:errors.mapped(), userAttempt:{...req.body}})
                }
            }
        })
        .catch(error => {
            console.log(error)
            throw new Error('Error al acceder a la base de datos')
        }) 
    },
    profile: (req, res) => {
        res.render('./users/profile', {title: 'Perfil'})    
    },
    editUser: (req, res) => {
        
    },
    avatar: (req, res) => {
        
    },
    deleteUser: (req, res) => {
        
    }
};

module.exports = controller;