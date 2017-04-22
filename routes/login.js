var express = require('express'),
    router = express.Router();

router.get('/sign-in', function(req, res) {
    res.render('user/login.html');
});

module.exports = router;
