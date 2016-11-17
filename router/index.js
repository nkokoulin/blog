var router = require('express').Router();

router.use('/admin', require('./routes/admin'));


module.exports = router;