const express = require('express');
const router = express.Router();
const YAML = require('yaml');
const FS = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  const languages = [ "pt_br", "es", "fr", "de", "da", "zh", "ru", "hu", "ms", "vi" ];
  let langData = {};
  langData.en = loadLanguage("en");
  for (let i=0; i<languages.length; i++) {
      if (languages[i] === "en") {
          continue;
      }
      langData[languages[i]] = loadLanguage(languages[i]);
  }
  res.render('index', { title: 'Civs - Home', langProgress: calcProgress(langData) });
});

function loadLanguage(lang) {
  return YAML.parse(FS.readFileSync(__dirname + "/translations/" + lang + ".yml", 'utf8'));
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

module.exports = router;
