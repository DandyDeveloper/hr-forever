var mysql           = require('mysql');
var jwt             = require('jsonwebtoken');
var _               = require('lodash'); 


var dbConfiguration = require('../config/database.js')
var config          = require('../config/config');
var connection      = mysql.createConnection(dbConfiguration);

let domain = 'http://localhost:5000';

module.exports = function(app, passport) {
    function createToken(user) {
      return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*5 });
    }

    app.post('/api/auth/login', passport.authenticate('local-login'), function(req, res) { 
        res.status(201).send({
            id_token: createToken(res.username)
        });
    });

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