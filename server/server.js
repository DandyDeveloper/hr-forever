var express         = require('express');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var passport        = require('passport');
var session         = require('express-session');
var path            = require('path')
var engines         = require('consolidate');

var app             = express();
var port            = 8888;


//Session handling and form parsing
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'hrForever4lyfe' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

//Resolving cross origin policy errors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var router = express.Router();  
    app.use('/api', router);
    router.use(function (req, res, next) {  //For logging  
        next(); 
    });

//Configration and Routes
require('./config/initialConnection');
require('./config/passport')(passport);
require('./routes/auth.js')(app, passport);

app.listen(port,'0.0.0.0', function(){
      console.log("Server is now running on " + port + ". Good luck!");
  });
