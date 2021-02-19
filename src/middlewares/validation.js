const {check, validationResult, body} = require('express-validator')


module.exports = {
    productCreate: [
        check('brand').isInt().withMessage('Debes elegir una marca'),
        check('category').isInt().withMessage('Debes elegir una categoría'),
        check('title').isLength({min:3, max:100}).withMessage('El nombre debe tener mas de 3 caracteres y menos de 100'),
        check('description').isLength({max:1000}).withMessage('La descripción debe ser menor a 1000 caracteres'),
        check('price').isInt({gt:0}).withMessage('El precio debe ser mayor a cero')
    ],
    productEdit: [
        check('brand').isInt().withMessage('Debes elegir una marca'),
        check('title').isLength({min:3, max:100}).withMessage('El nombre debe tener mas de 3 caracteres y menos de 100'),
        check('description').isLength({max:1000}).withMessage('La descripción debe ser menor a 1000 caracteres'),
        check('price').isInt({gt:0}).withMessage('El precio debe ser mayor a cero')
    ],
    userRegister: [
        check('email').isEmail().withMessage('El email ingresado no es valido'),
        check('password').isLength({min:6, max:9}).withMessage('La contraseña debe tener de 6 a 9 caracteres')
    ],
}