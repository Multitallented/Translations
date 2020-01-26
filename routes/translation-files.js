const express = require('express');
const router = express.Router();

router.get('/:file', function(req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    }
    res.download('routes/translations/' + req.params['file']);
});

module.exports = router;
