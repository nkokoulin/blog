var router = require('express').Router();

router.use('/admin', require('./routes/admin'));
router.use('/', require('./routes/public'));

module.exports = router;