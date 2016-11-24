var router = require('express').Router();
//Используемые модели
var Post = require('../../models/Post');
var PostStatus = require('../../models/PostStatus');

router.get('/', function (req,res) {
	Post.findAll( function(rows) {
		for (var i=0; i < rows.length; i++) {
			rows[i].publishDate = rows[i].publishDate.toLocaleDateString();
		}
		res.render('public/index', {posts: rows});
	});
});

router.get('/post/:id', function (req,res) {
	let postId = req.params.id;
	Post.findById(postId, function(post) {
		post.publishDate = post.publishDate.toLocaleDateString();
		res.render('public/post', {post: post});
	});
});



module.exports = router;