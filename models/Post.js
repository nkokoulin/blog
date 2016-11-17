var pool = require('../database/pool');

function Post(content, publishDate, postStatusId) {
	this.content = content;
	this.publishDate = publishDate,
	this.postStatusId = postStatusId
}

Post.prototype.findAll = function(callback) {
	pool.query('SELECT * from post', function(err, rows, fields) {
		if (err) throw err;
		if (typeof callback === 'function') {
			callback(rows);
		}
	});
}

Post.prototype.findAllStatuses = function() {
	pool.query('SELECT * from postStatus', function(err, rows, fields) {
		rows.forEach(function(row, i) {
			console.log(row.label);
		});
	});
}

// return indertId to callback if success
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
		return false;
	}
}

Post.prototype.log = function() {
	console.log('It works!');
}

module.exports = Post;