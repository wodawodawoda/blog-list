// Models
import * as models from './models.js'

// Views
import * as views from './views.js'

import * as collections from './collectionsInstances.js'


// View instance
const blogsView = new views.BlogsView()

// DOM events handlers
$(document).ready(function () {
	$('.add-blog').on('click', function (e) {
		e.preventDefault()
		const blog = new models.Blog({
			author: $('.author-input').val(),
			title: $('.title-input').val(),
			url: $('.url-input').val(),
		})
		collections.blogs.add(blog)

		blog.save(null, {
			success: res => {
				console.log(`Successfully saved blog with _id: ${res.toJSON()._id}!`)
			},
			error: () => {
				console.log('Failed to save blog!')
			}
		})
	})
})
