// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8000; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/todo'); // connect to our database
var Todo     = require('./app/models/todo');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/todos')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var todo = new Todo();		// create a new instance of the Todo model
		todo.description = req.body.description;  // set the bears name (comes from the request)
		todo.isComplete = false;

		todo.save(function(err) {
			if (err)
				res.send(err);

			res.json(todo);
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Todo.find(function(err, todos) {
			if (err)
				res.send(err);

			res.json(todos);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/todos/:todo_id')

	// get the bear with that id
	.get(function(req, res) {
		Todo.findById(req.params.todo_id, function(err, todo) {
			if (err)
				res.send(err);
			res.json(todo);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Todo.findById(req.params.todo_id, function(err, todo) {

			if (err)
				res.send(err);

			todo.description = req.body.description;
			todo.isComplete = req.body.isComplete;
			todo.save(function(err) {
				if (err)
					res.send(err);

				res.json(todo);
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Todo.findById(req.params.todo_id, function(err, todo) {
				Todo.remove({
					_id: req.params.todo_id
				}, function(err, bear) {
					if (err)
						res.send(err);

					res.json(todo);
				})
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
