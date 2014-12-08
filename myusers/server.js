// server.js

// set up ===================================

var express 	= require('express');
var app			= express();

var mongoose 	= require('mongoose');
var morgan 		= require('morgan');

var bodyParser	= require('body-parser');

var methodOverride = require('method-override');

// configuration ====================================

// mongo hosted on mongolabs.com
mongoose.connect('mongodb://codefellow:passw0rd@ds061370.mongolab.com:61370/codefellows');

// set static files location
app.use(express.static(__dirname + '/public'));

// log requests to the console for debugging and tracking
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({'extended':'true'}));

// parse application/json
app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


// define model ===========================================
var User = mongoose.model('User', {
	first_name	: String,
	last_name	: String,
	email		: String,
});

// routes ===============================================

// api ---------------------------
// get all users
app.get('/api/users', function(req, res) {

	// use mongoose to get all users in the database
	User.find(function(err, users) {

		// if there is an error, report it
		if (err)
			res.send(err)

		// return all users in JSON format
		res.json(users);
	});
});

// create user and send back all users after new user created
app.post('/api/users', function(req, res) {
	// create a user, info sent in by Angular
	User.create({
		first_name	: req.body.first_name,
		last_name	: req.body.last_name,
		email		: req.body.email
	}, function(err, user) {
		if (err)
			res.send(err);

		// get all users and return them now that new one has been created
		User.find(function(err, users) {
			if (err)
				res.send(err)
			res.json(users);
		});
	});
});

// delete a user
app.delete('/api/users/:user_id', function(req, res) {
	User.remove({
		_id : req.params.user_id
	}, function(err, user) {
		if(err)
			res.send(err);

		// get and return all users after deleting one
		User.find(function(err, users) {
			if(err)
				res.send(err)
			res.json(users);
		});
	});
});

// application ===========================================

app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

// listen (start app with node server.js) ===========================

app.listen(8080);
console.log('app listening on port 8080');
