// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var mysql           = require('mysql');
var sha3            = require('sha3');

var dbConfiguration = require('../config/database.js')
var connection = mysql.createConnection(dbConfiguration);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      connection.query("select * from hr_users where id = "+ id, function(err,user) {
  		  done(err, user[0]);
  		});
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
      },
      function(req, email, password, done) {
        connection.query("select * from hr_users where email = '"+ email +"'", 
          function(err,user) {
            console.log(user);
            console.log("above row object");
            if (err)
                return done(err);
            if (user.length) {
                return done(null, false);
            } else {
                var passwordHash = sha3(req.body.password)
                var newUserMysql = new Object();
                newUserMysql.username     = req.body.username;
                newUserMysql.email    = req.body.email;
                newUserMysql.password = passwordHash;
                newUserMysql.group_id = req.body.group_id;

                var insertQuery = "INSERT INTO hr_users (username, email, password, group_id) values ('"+ req.body.name +"','"+ passwordHash +"','"+ req.body.email +"','"+ req.body.group_id +"')";
                console.log(insertQuery);

                connection.query(insertQuery,function(err,user){
                  newUserMysql.id = user.insertId;

                  return done(null, newUserMysql);
                });
            }
          });
      }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
      },
      function(req, email, password, done) { // callback with email and password from our form
        var passwordHash = sha3(password);
        connection.query("SELECT * FROM `hr_users` WHERE `email` = '" + email + "'",function(err,user) {
			     if (err)
              return done(err);
           if (!user.length) {
              return done(null, false, { message: "No user found."}); 
           }

  			// if the user is found but the password is wrong
           if (!( user[0].password == passwordHash))
              return done(null, false, { message: "Incorrect Password."}); 
        // all is well, return successful user
              return done(null, user[0]);
		     });
      })
    );


 
};
