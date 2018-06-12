'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('./mongoConfig.js');

var _blog = require('./models/blog');

var _blog2 = _interopRequireDefault(_blog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 5000;

var app = (0, _express2.default)();
var server = _http2.default.Server(app);

app.use(_bodyParser2.default.json());

// API
app.get('/api/blogs', function (req, res) {
	_blog2.default.find(function (err, docs) {
		docs.forEach(function (item) {
			console.log('Recived a GET request for blog _id: ' + item._id);
		});
		res.send(docs);
	});
});

app.post('/api/blogs', function (req, res) {
	console.log('Received a POST request');
	console.log(req.body);
	var blog = new _blog2.default(req.body);
	blog.save(function (err, doc) {
		res.send(doc);
	});
});

app.delete('/api/blogs/:id', function (req, res) {
	console.log('Received a DELETE request for _id: ' + req.params.id);
	_blog2.default.remove({ _id: req.params.id }, function (err) {
		return res.send({ _id: req.params.id });
	});
});

app.put('/api/blogs/:id', function (req, res) {
	console.log('Received an UPDATE request for _id: ' + req.params.id);
	_blog2.default.update({ _id: req.params.id }, req.body, function (err) {
		return res.send({ _id: req.params.id });
	});
});

app.use(_express2.default.static(__dirname + '/../../client/dist'));

server.listen(port, function () {
	console.log('server listens on port: ' + port);
});