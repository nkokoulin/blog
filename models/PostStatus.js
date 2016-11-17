var pool = require('../database/pool');

function postStatus() {}

postStatus.findAll = function(callback) {
	pool.query('SELECT * from postStatus', function(err, rows, fields) {
		rows.forEach(function(row, i) {
			console.log(row.label);
		});
		
		if (typeof callback === 'function') {
			callback(rows);
		}
	});
}

module.exports = postStatus;