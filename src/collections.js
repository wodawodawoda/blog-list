// Backbone Collections
import Backbone from 'backbone'

export const Blogs = Backbone.Collection.extend({
	url: 'http://localhost:5000/api/blogs'
});
