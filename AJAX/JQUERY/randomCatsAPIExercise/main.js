
//Al click del tasto rimpiazzo l'attributo
//src dell'immagine
$('#cerca').click(function () {
  $.get(' http://aws.random.cat/meow')
  .done(function (data) {
    $('#cat').attr('src', data.file).removeClass('hidden');
  })
  .fail(function () {
    console.log('error');
  });
});
