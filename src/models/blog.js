import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const blogSchema = new Schema({
	author: String,
	title: String,
	url: String,
})

export default mongoose.model('Blog', blogSchema)
