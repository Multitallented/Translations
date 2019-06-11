var express = require('express');
var router = express.Router();
var users = require('../bin/users.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    req.session.destroy();
  }
  res.render('login', { title: 'Civs - Login' });
});

router.post('/', function(req, res, next) {
  if(!req.body.id || !req.body.password){
    res.render('login', {message: "Please enter both id and password"});
  } else {
    if (!users[req.body.id] || users[req.body.id].password === req.body.password) {
      res.render('login', {message: "Invalid credentials!"});
    } else {
      req.session.user = req.body.id;
      res.redirect('/translation');
    }
  }
});

module.exports = router;
