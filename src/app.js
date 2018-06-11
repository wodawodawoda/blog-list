import _ from 'underscore'
import Backbone from 'backbone/backbone.js'

// Backbone Models
const Blog = Backbone.Model.extend({
	default: {
		author: '',
		title: '',
		url: '',
	}
})

// Backbone Collections
const Blogs = Backbone.Collection.extend({});

// Blog model instances
// const blog1 = new Blog({
// 	author: 'Andrzej',
// 	title: 'Andrzejs blog',
// 	url: 'http://andrzej.pl',
// })
//
// const blog2 = new Blog({
// 	author: 'Janusz',
// 	title: 'Januszs blog',
// 	url: 'http://janusz.pl',
// })
//
// const blog3 = new Blog({
// 	author: 'Janusz',
// 	title: 'Januszs blog',
// 	url: 'http://janusz.pl',
// })

// Collection instances
const blogs = new Blogs()


// Views Backbone
const BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function () {
		console.log({self: this})
		this.template = _.template($('.blog-list-template').html())
	},
	events: {
		'click .edit-blog': 'edit',
		'click .update-blog': 'update',
		'click .cancel-blog': 'cancel',
		'click .delete-blog': 'delete',
	},
	edit: function () {
		this.$('.edit-blog, .delete-blog, .update-blog, .cancel-blog').toggleClass('hidden')

		const author = this.$('.author').html()
		const title = this.$('.title').html()
		const url = this.$('.url').html()

		this.$('.author').html(`<input type='text' class='form-control author-update' value='${author}' form="temp-form" />`)
		this.$('.title').html(`<input type='text' class='form-control title-update' value='${title}' form="temp-form" />`)
		this.$('.url').html(`<input type='text' class='form-control url-update' value='${url}' form="temp-form" />`)
	},
	update: function () {
		this.model.set({
			author: $('.author-update').val(),
			title: $('.title-update').val(),
			url: $('.url-update').val(),
		})
	},
	cancel: function () {
		this.render()
	},
	delete: function () {
		this.model.destroy()
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()))
		return this;
	}
})

const BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function () {
		this.model.on('add', this.render, this);
		this.model.on('change', this.render, this);
		this.model.on('remove', this.render, this);
	},
	render: function () {
		this.$el.html('');
		this.model.toArray().forEach(blog => {
			this.$el.append(new BlogView({model: blog}).render().$el)
		})
		return this;
	}
})
// View instance
const blogsView = new BlogsView()

// DOM events handlers
$(document).ready(function () {
	$('.add-blog').on('click', function (e) {
		e.preventDefault()
		const blog = new Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val(),
		})
		blogs.add(blog)
	})
})
