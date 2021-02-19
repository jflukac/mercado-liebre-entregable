module.exports = (req, res, next) => {
    res.locals.user = false;

    if (req.session.user) {
        res.locals.user = req.session.user
    }
         else if (req.cookies.user) {
        req.session.user = req.cookies.user;
        res.locals.user = req.cookies.user
     }
    next()
}