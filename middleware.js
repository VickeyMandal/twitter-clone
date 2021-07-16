//Checks if user is logged in or not
//if not then redirects to login page

const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

module.exports = {
    isLoggedIn
}