var Post = require('../models/Post');
var PostStatus = require('../models/PostStatus');

function adminHandler() {}

//for admin router
adminHandler.prototype.forGetRoot = function(req,res) {
	//const post = new Post();
	Post.findAll( function(rows) {
		res.render('post/index', {posts: rows});
	});
}

adminHandler.prototype.forPostAdd = function(req,res) {
	var post = new Post();
	post.saveFromReq(req, handler.forGetRoot(req, res));
}

adminHandler.prototype.forGetAdd = function(req, res) {
	var postStatus = new PostStatus();
	postStatus.findAll( function(rows) {
		res.render('post/add', {statuses: rows});	
	});	
}

adminHandler.prototype.forGetChangeId = function(req, res, postId) {
	var post = new Post();
	
	post.findById(postId, function(post) {
		var postStatus = new PostStatus();
		
		postStatus.findAll( function(rows) {
			res.render('post/change', {post: post, statuses: rows});	
		});
	});
}

adminHandler.prototype.forPostChangeId = function(req, res, postId) {
	var post = new Post();
	post.fillFromReq(req, post.update(postId, function(req,res) {
		handler.forGerChangeId(req, res, postId);
	}));
}

var handler = new adminHandler();
module.exports = handler;