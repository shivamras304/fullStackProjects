const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Todo = require('./db');
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', express.static('public'));
app.use(cors())

//GET request
app.get('/todos', (req, res) => {
	Todo.find()
		.then((allTodos) => {
			res.send(allTodos)
		})
		.catch((err) => {
			res.send(err)
		})
});

//POST request
app.post('/todos', (req, res) => {
	let newTodo = new Todo({
		text: req.body.text,
	})
	newTodo.save()
		.then((savedTodo) => {
			res.send(savedTodo)
		})
		.catch((err) => {
			res.send(err)
		})
});

//PUT request
app.put('/todos/:id', (req, res) => {
	Todo.findOneAndUpdate({
		_id: req.params.id
	}, {
		done: req.body.done
	})
	.then((updatedTodo) => {
		res.send(updatedTodo)
	})
	.catch((err) => {
		res.send(err)
	})
})

//DELETE request
app.delete('/todos/:id', (req, res) => {
	Todo.findOneAndRemove({
		_id: req.params.id
	})
	.then((deletedTodo) => {
		res.send(deletedTodo)
	})
	.catch((err) => {
		res.send(err)
	})
})

app.get('/ignition', (req, res) => res.send("IGNITION... ENGINE STARTED"))

app.listen('3004', () => console.log('Magic happens at port 3004'));
