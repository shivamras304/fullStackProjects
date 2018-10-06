const mongoose = require('mongoose');

const server = '127.0.0.1:27017'
const database = 'tododb'

mongoose.connect(`mongodb://${server}/${database}`)
	.then(() => {
		console.log('Database connection successful')
	})
	.catch(err => console.error('Database connection error ', err))

const todoSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	done: {
		type: Boolean,
		required: true,
		default: false
	}
})

module.exports = mongoose.model('Todo', todoSchema);