const express = require('express');
const router = express.Router();
const users = require('../bin/users.json');
const YAML = require('yaml');
const FS = require('fs');

router.get('/', function(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  }

  const languages = users[req.session.user].lang;
  let langData = {};
  langData.en = loadLanguage("en");
  for (let i=0; i<languages.length; i++) {
    langData[languages[i]] = loadLanguage(languages[i]);
  }
  res.render('translation', { title: 'Civs - Home', languages: languages, langData: langData });
});

function loadLanguage(lang) {
  return YAML.parse(FS.readFileSync(__dirname + "/translations/" + lang + ".yml", 'utf8'));
}

router.post('/', function(req, res, next) {
  // TODO save the lang data
});

module.exports = router;
