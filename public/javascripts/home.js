// 'Chewie is a cute Yorkshire Terrier with brown fur and black eyes. She loves to play fetch in a small to medium sized yard. She is also friendly around other dogs!'

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {

});


$(".search").on('keyup', function (e) {
    if (e.keyCode == 13) {
      console.log({query: $(".search").val()});
        $.post("/parse", {query: $(".search").val()}, function(result){
          for(var i = 0; i < result.length; i++) {
            console.log(result[i].name, result[i].salience);
          }
        });
    }
});
var dropdown = $('.dropdown');
var item = $('.item');

item.on('click', function() {
  item.toggleClass('collapse');

  if (dropdown.hasClass('dropped')) {
    dropdown.toggleClass('dropped');
  } else {
    setTimeout(function() {
      dropdown.toggleClass('dropped');
    }, 150);
  }
})

function getPageId(n) {
	return 'article-page-' + n;
}

function getDocumentHeight() {
	const body = document.body;
	const html = document.documentElement;

	return Math.max(
		body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight
	);
};

function getScrollTop() {
	return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function getArticleImage() {
	const hash = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	const image = new Image;
	image.className = 'article-list__item__image article-list__item__image--loading';
	image.src = 'http://api.adorable.io/avatars/250/' + hash;

	image.onload = function() {
		image.classList.remove('article-list__item__image--loading');
	};

	return image;
}

function clearList() {
  while (articleList.hasChildNodes()) {
   articleList.removeChild(articleList.lastChild);
  }
  while (articleListPagination.hasChildNodes()) {
   articleListPagination.removeChild(articleListPagination.lastChild);
  }
  page = 0;
}

function repopulateList() {
  addPage(++page);
}

function getArticle() {
  $.get("https://console.cloud.google.com/storage/homeward_bound/", function(result){
      console.log(result);
  });
	const articleImage = getArticleImage();
	const article = document.createElement('article');
  const holder = document.createElement('div');
  holder.className = 'imageholder';
	article.className = 'article-list__item';
  const button = document.createElement('button');
  button.className = 'like';
  // button.id =
	holder.appendChild(articleImage);
  holder.appendChild(button);
  article.appendChild(holder);
  const text = document.createElement('text');
  text.className = "petName";
  text.innerHTML = "Doggo";
  article.appendChild(text);
  if (true) { //if urgency
    const urgency = document.createElement('img');
    urgency.src = 'https://cdn4.iconfinder.com/data/icons/online-menu/64/attencion_exclamation_mark_circle_danger-128.png';
    urgency.className = "notification";
    article.appendChild(urgency);
  }
  if (true) { //if from shelter
    const shelter = document.createElement('img');
    shelter.src = 'https://cdn0.iconfinder.com/data/icons/layout-and-location/24/Untitled-2-02-128.png';
    shelter.className = "notification";
    article.appendChild(shelter);
  } else { // if not from shelter
    const nonshelter = document.createElement('img');
    nonshelter.src = 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png';
    nonshelter.className = "notification";
    article.appendChild(nonshelter);
  }
  const details = document.createElement('div');
  details.className = "petDetails";
  details.innerHTML = "Rarest pupper this side of the valley of doggos. Sleep tight.";
  article.appendChild(details);

	return article;
}

function getArticlePage(page, articlesPerPage = 16) {
	const pageElement = document.createElement('div');
	pageElement.id = getPageId(page);
	pageElement.className = 'article-list__page';

	while (articlesPerPage--) {
		pageElement.appendChild(getArticle());
	}

	return pageElement;
}

function addPaginationPage(page) {
	const pageLink = document.createElement('a');
	pageLink.href = '#' + getPageId(page);
	pageLink.innerHTML = page;

	const listItem = document.createElement('li');
	listItem.className = 'article-list__pagination__item';
	listItem.appendChild(pageLink);

	articleListPagination.appendChild(listItem);

	if (page === 2) {
		articleListPagination.classList.remove('article-list__pagination--inactive');
	}
}

function fetchPage(page) {
	articleList.appendChild(getArticlePage(page));
}

function addPage(page) {
	fetchPage(page);
	addPaginationPage(page);
}

const articleList = document.getElementById('article-list');
const articleListPagination = document.getElementById('article-list-pagination');
var page = 0;

addPage(++page);

window.onscroll = function() {
	if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
	addPage(++page);
};

var s = $('.search'),
    f  = $('form'),
    a = $('.after'),
		m = $('h4');

s.focus(function(){
  if( f.hasClass('open') ) return;
  f.addClass('in');
  setTimeout(function(){
    f.addClass('open');
    f.removeClass('in');
  }, 1300);
});

a.on('click', function(e){
  e.preventDefault();
  if( !f.hasClass('open') ) return;
   s.val('');
  f.addClass('close');
  f.removeClass('open');
  setTimeout(function(){
    f.removeClass('close');
  }, 1300);
})

f.submit(function(e){
  e.preventDefault();
  m.html('Thanks, high five!').addClass('show');
  f.addClass('explode');
  setTimeout(function(){
    s.val('');
    f.removeClass('explode');
    m.removeClass('show');
  }, 3000);
})
