var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('main/home.html');
});

module.exports = router;
