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
    if (languages[i] === "en") {
      continue;
    }
    langData[languages[i]] = loadLanguage(languages[i]);
  }
  res.render('translation', { title: 'Civs - Home',
      languages: languages,
      langData: langData,
      langProgress: calcProgress(langData) });
});

function loadLanguage(lang) {
  return YAML.parse(FS.readFileSync(__dirname + "/translations/" + lang + ".yml", 'utf8'));
}
function saveLanguage(key, lang) {
  FS.writeFileSync(__dirname + "/translations/" + key + ".yml", YAML.stringify(lang), 'utf8');
}

function calcProgress(langData) {
  let max = Object.size(langData.en);
  let progress = {};
  for (let lang in langData) {
    if (lang === "en") { continue; }
    let currentLangProgress = 0;
    for (let key in langData[lang]) {
      if (key && langData[lang][key]) {
        currentLangProgress++;
      }
    }
    progress[lang] = {
        percent: Math.round(currentLangProgress / max * 100) + "%",
        count: currentLangProgress,
        max: max
    };
  }
  return progress;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

router.post('/', function(req, res, next) {
  let key = req.body.lang;
  delete req.body.lang;
  saveLanguage(key, req.body);

  const languages = users[req.session.user].lang;
  let langData = {};
  langData.en = loadLanguage("en");
  for (let i=0; i<languages.length; i++) {
      if (languages[i] === "en") {
          continue;
      }
      langData[languages[i]] = loadLanguage(languages[i]);
  }
  res.render('translation', { title: 'Civs - Home',
      languages: languages,
      langData: langData,
      langProgress: calcProgress(langData),
      message: key + " saved" });
});

module.exports = router;
