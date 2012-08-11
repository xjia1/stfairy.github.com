$(function(){
  $.get('index.md', function(text){
    var converter = new Showdown.converter();
    var html = converter.makeHtml(text);
    $('#main_content').html(html);
  });
});