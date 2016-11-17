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

//Найти все возможные статусы из таблицы PostStatus
Post.findAllStatuses = function() {
	pool.query('SELECT * from postStatus', function(err, rows, fields) {
		rows.forEach(function(row, i) {
			console.log(row.label);
		});
	});
}

//Создать пост из req (данные реквеста)
Post.createFromReq = function(req) {
	var post = new Post();
	console.log(req.body.content)
	post.content = req.body.content;
	post.publishDate = new Date();
	post.postStatusId = req.body.publishStatus;
	if (req.params.post_id > 0) {
		post.id = req.params.post_id;
	}
	return post;
}

/*
 * Методы
 */

// Изменение
Post.prototype.update = function(callback) {
	if (this.content !== undefined && this.publishDate !== undefined && this.postStatusId !== undefined && this.id !== undefined) {
		var post = {content: this.content, publishDate: this.publishDate, postStatusId: this.postStatusId};
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
	if (this.content !== undefined && this.publishDate !== undefined && this.postStatusId !== undefined) {
		var post = {content: this.content, publishDate: this.publishDate, postStatusId: this.postStatusId};
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