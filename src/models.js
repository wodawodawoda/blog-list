// Backbone Models
import Backbone from 'backbone'

Backbone.Model.prototype.idAttribute = '_id';

export const Blog = Backbone.Model.extend({
	default: {
		author: '',
		title: '',
		url: '',
	}
})

