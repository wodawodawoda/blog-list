// Backbone Models
import Backbone from 'backbone'

export const Blog = Backbone.Model.extend({
	default: {
		author: '',
		title: '',
		url: '',
	}
})

