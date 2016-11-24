var router = require('express').Router();
//Используемые модели
var Post = require('../../models/Post');
var PostStatus = require('../../models/PostStatus');

router.get('/', function (req,res) {
	Post.findAll( function(rows) {
		res.render('post/index', {posts: rows});
	});
});

router.get('/add', function(req,res) {
	PostStatus.findAll( function(rows) {
		res.render('post/add', {statuses: rows});	
	});	
});

router.post('/add', function(req,res) {
	var post = new Post.createFromReq(req);
	//Сохраняем пост
	post.save(function(indertId) {
		//Выбираем все посты и переходим на главную страницу
		//InsertId понадобится в будущем
		Post.findAll( function(rows) {
			res.render('post/index', {posts: rows});
		});
	})
});

router.get('/change/:post_id', function(req,res) {
	//Находим пост по ID
	Post.findById(req.params.post_id, function(post) {
		//Выбираем все статусы для составления select'a
		PostStatus.findAll( function(statuses) {
			//На страницу изменения поста
			res.render('post/change', {post: post, statuses: statuses});	
		});
	});
});

router.post('/change/:post_id', function(req, res) {
	var post = Post.createFromReq(req);
	//обновляем пост
	post.update(function() {
		//Отправляем на главную
		Post.findAll( function(rows) {
			res.render('post/index', {posts: rows});
		});
	});
});

router.get('/delete/:post_id', function(req, res) {
	//Удаляем пост
	Post.delete(req.params.post_id, function() {
		//Рендерем главную страницу админки
		Post.findAll( function(rows) {
			res.render('post/index', {posts: rows});
		});
	});
});

module.exports = router;