var pool = require('../database/pool');

function Post() {}

/*
 * Статические методы
*/ 

//Найти все посты
Post.findAll = function(callback) {
	pool.query('SELECT * from post', function(err, rows) {
		if (err) throw err;
		if (typeof callback === 'function') {
			callback(rows);
		}
	});
}

//Найти пост по ID
Post.findById = function(id, callback) {
	pool.query('SELECT * from post WHERE id = ?', [id], function(err, rows) {
		if (err) throw err;
		if (typeof callback === 'function') {
			callback(rows[0]);
		}
	});
}

//Создать пост из req (данные реквеста)
Post.createFromReq = function(req) {
	var post = new Post();
	post.title = req.body.title;
	post.content = req.body.content;
	post.publishDate = new Date();
	post.postStatusId = req.body.publishStatus;
	if (req.params.post_id > 0) {
		post.id = req.params.post_id;
	}
	return post;
}

Post.delete = function(id, callback) {
	pool.query('DELETE FROM post WHERE id = ?', id, function(err, res) {
		if (err) throw err;

		if(typeof callback === 'function') {
			callback();
		}
	});
}

/*
 * Методы
 */

// Изменение
Post.prototype.update = function(callback) {
	if (this.title !== undefined && this.content !== undefined && this.publishDate !== undefined && this.postStatusId !== undefined && this.id !== undefined) {
		var post = {title: this.title, content: this.content, publishDate: this.publishDate, postStatusId: this.postStatusId};
		pool.query('UPDATE post SET ? WHERE id = ?', [post, this.id], function(err, result) {
			if (err) throw err;
			if (typeof callback === 'function') {
				callback();
			}
		});

	} else {
		console.log('Невозможно сохранить, т.к. что-то не добавлено');
	}
}

// Добавление (return indertId to callback if success)
Post.prototype.save = function(callback) {
	if (this.title !== undefined && this.content !== undefined && this.publishDate !== undefined && this.postStatusId !== undefined) {
		var post = {title: this.title, content: this.content, publishDate: this.publishDate, postStatusId: this.postStatusId};
		pool.query('INSERT INTO post SET ?', post, function(err, result) {
			if (err) throw err;
			if (typeof callback === 'function') {
				callback(result.insertId);
			}
		});
	} else {
		console.log('Невозможно сохранить, т.к. что-то не добавлено');
	}
}

module.exports = Post;