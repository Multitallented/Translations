$('select.lang-select').change(function(event) {
  var selectedLang = $('select.lang-select').val();
  $('.lang').addClass('hide');
  $('.lang.' + selectedLang).removeClass('hide');
});

$('a.toggle-finished').click(function(event) {
  event.preventDefault();
  if ($('.translation.edit.hide').length < 1) {
    $('.translation.edit').addClass('hide');
    $('a.toggle-finished').text('Show Finished Translations');
  } else {
    $('.translation.edit').removeClass('hide');
    $('a.toggle-finished').text('Hide Finished Translations');
  }
});