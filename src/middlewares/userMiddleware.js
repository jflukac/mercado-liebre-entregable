module.exports = {
    userToLogin: (req, res, next) => {
        if (req.session.user) {
            next()
        } else {
            return res.redirect('/users/login')
        }
    },
    userLogged: (req, res, next) => {
        if (req.session.user) {
            return res.redirect('/users/profile')
        } else {
            next()
        }
    },
    userAdmin: (req, res, next) => {
       
        if (res.locals.user.role == 'admin') {
            next()
        } else {
            res.redirect('/')
        }
    },
    sameUser: (req, res, next) => {
        if (req.params.id == req.session.user.id) {
            next()
        } else {
            return res.redirect('/users/login')
        }
    }
}