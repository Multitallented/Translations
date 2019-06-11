$('select.lang-select').change(function(event) {
  var selectedLang = $('select.lang-select').val();
  console.log(selectedLang);
  $('.lang').hide();
  $('.lang.' + selectedLang).show();
});
