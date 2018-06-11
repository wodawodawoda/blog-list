// Views Backbone
import Backbone from 'backbone'
import _ from 'underscore'
import * as models from './models'

// Collections
import * as collections from './collectionsInstances.js'

export const BlogView = Backbone.View.extend({
	model: new models.Blog(),
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



export const BlogsView = Backbone.View.extend({
	model: collections.blogs,
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
