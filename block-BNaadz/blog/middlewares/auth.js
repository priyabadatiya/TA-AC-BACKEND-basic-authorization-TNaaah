let User = require('../models/users');

module.exports = {
    loggedInUser: (req, res, next) => {
        if(req.session && req.session.userId) {
            next();
        } else {
            req.flash('error', 'Login/Register First');
            res.redirect('/users/login');
        }
    },

    userInfo: (req, res, next) => {
        let userId = req.session && req.session.userId;
        if(userId) {
            User.findById(userId, "firstName email", (err, user) => {
                if(err) return next(err);
                req.user = user;
                res.locals.user = user;
                next();
            })
        } else {
            req.user = null;
            res.locals.user = null;
            next();
        }
    }
}
