let domain = 'http://localhost:5000';

var mysql           = require('mysql');
var dbConfiguration = require('../config/database.js')

var connection      = mysql.createConnection(dbConfiguration);

module.exports = function(app, passport) {
    app.post('/api/auth/login', passport.authenticate('local-login', {//User Login
        successRedirect : domain + '/profile', 
        failureRedirect : domain + '/login'
    }));

    app.post('/api/auth/signup', passport.authenticate('local-signup', {//User Signup
      successRedirect : domain + '/profile', 
      failureRedirect : domain + '/signup'
    }));

    app.get('/api/auth/logout', function(req, res) {//User logout
        	req.logout(function(){
                if(err){
                    console.log(err);
                }
            });
            res.status(200).send({ message: "User signed out" });
    });
};