var getLocation = function(href) {
	var l = document.createElement("a");
	l.href = href;
	return l;
};

var newURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
var l = getLocation(currentURL);
console.debug(l.hostname)
console.debug(l.pathname)
System.out.println(l);


// $.post('/getAnimal', {query:})
// document.getElementById('image').sr

$('.button').click(function(){
  var buttonId = $(this).attr('id');
  $('#modal-container').removeAttr('class').addClass(buttonId);
  $('body').addClass('modal-active');
})

$('#modal-container').click(function(){
  $(this).addClass('out');
  $('body').removeClass('modal-active');
});