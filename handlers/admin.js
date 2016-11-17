var Post = require('../models/Post');
var PostStatus = require('../models/PostStatus');

function adminHandler() {}

//for admin router
adminHandler.prototype.forGetRoot = function(req, res) {
	const post = new Post();
	post.findAll( function(rows) {
		res.render('post/index', {posts: rows});
	});
}

adminHandler.prototype.forPostAdd = function(req,res) {
	let today = new Date();
	var postParams = [
		req.body.content,
		today,
		req.body.publishStatus
	];
	var newPost = new Post(...postParams);
	newPost.save(function(insertId) {
		handler.forGetRoot(req, res);
	});
}

adminHandler.prototype.forGetAdd = function(req,res) {
	var postStatus = new PostStatus();
	postStatus.findAll( function(rows) {
		res.render('post/add', {statuses: rows});	
	});	
}
var handler = new adminHandler();
module.exports = handler;