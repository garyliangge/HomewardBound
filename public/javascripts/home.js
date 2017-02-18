'Chewie is a cute Yorkshire Terrier with brown fur and black eyes. She loves to play fetch in a small to medium sized yard. She is also friendly around other dogs!'

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.text = "";
  $scope.query = "";
  $scope.$watch("query", function(newValue, oldValue) {
    if ($scope.query.length > 0) {
      $.post("/parse", {query: $scope.query}, function(result){
          console.log(result);
      });
      }
  });
});

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
	const articleImage = getArticleImage();
	const article = document.createElement('article');
  const holder = document.createElement('div');
  holder.className = 'imageholder';
	article.className = 'article-list__item';
  const button = document.createElement('button');
  button.className = 'like';
	holder.appendChild(articleImage);
  holder.appendChild(button);
  article.appendChild(holder);
  const text = document.createElement('text');
  text.innerHTML = "Doggo";
  article.appendChild(text);

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
