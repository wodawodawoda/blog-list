import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;

const app = express();
const server = http.Server(app);

app.use(bodyParser.json());

import './mongoConfig.js'
import Blog from './models/blog'

// API
app.get('/api/blogs', (req, res) => {
	Blog.find((err, docs) => {
		docs.forEach(item => {
			console.log(`Recived a GET request for blog _id: ${item._id}`)
		})
		res.send(docs)
	})
})

app.post('/api/blogs', (req, res) => {
	console.log(`Received a POST request`)
	console.log(req.body)
	const blog = new Blog(req.body);
	blog.save((err, doc) => {
		res.send(doc)
	})
})

app.delete('/api/blogs/:id', (req, res) => {
	console.log(`Received a DELETE request for _id: ${req.params.id}`)
	Blog.remove(
		{_id: req.params.id},
		err => res.send({_id: req.params.id})
	)
})

app.put('/api/blogs/:id', (req, res) => {
	console.log(`Received an UPDATE request for _id: ${req.params.id}`);
	Blog.update(
		{_id: req.params.id},
		req.body,
		err => res.send({_id: req.params.id})
	)
})

app.use(express.static(`${__dirname}/../../client/dist`))

server.listen(port, () => {console.log(`server listens on port: ${port}`)});
