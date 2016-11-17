var express = require('express');
var router = express.Router();
var handler = require('../handlers/admin');

router.get('/', function (req,res) {
	handler.forGetRoot(req,res);
});

router.get('/add', function(req,res) {
	handler.forGetAdd(req, res);
});

router.post('/add', function(req,res) {
	handler.forPostAdd(req, res);
});

module.exports = router;