// 'Chewie is a cute Yorkshire Terrier with brown fur and black eyes. She loves to play fetch in a small to medium sized yard. She is also friendly around other dogs!'
var pets = [];
var id = 0;
var zip = 94306; //heh hardcoded heh
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

var dropdown2 = $('.dropdown2');
var item2 = $('.item2');

item2.on('click', function() {
  item2.toggleClass('collapse2');

  if (dropdown2.hasClass('dropped')) {
    dropdown2.toggleClass('dropped');
  } else {
    setTimeout(function() {
      dropdown2.toggleClass('dropped');
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
	const image = new Image;
	image.className = 'article-list__item__image article-list__item__image--loading';
	image.src = pets[id].animalPictures[0].urlSecureFullsize;

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
  id = 0;
}

function repopulateList() {
  addPage(++page);
}

function reSort(query, callback) {
  var maxIndex = 0;
  var indexToSwapTo = 0;
  while (indexToSwapTo < pets.length) {
    maxIndex = 0;
    for (i = indexToSwapTo; i < pets.length; i++) {
      if (compare(pets[i], pets[maxIndex], query)) {
        maxIndex = i;
      }
      console.log("at index " + i);
    }
    var temp = pets[maxIndex];
    pets[maxIndex] = pets[indexToSwapTo];
    pets[indexToSwapTo] = temp;
    indexToSwapTo ++;
  }
  callback();
}

function compare(p1, p2, query) {
  switch (query) {
    case 1: //age
      if (parseAge(p2.animalAgeString) < parseAge(p1.animalAgeString)) {
        return true;
      }
      if (parseAge(p2.animalAgeString) == parseAge(p1.animalAgeString)) {
        if (p2.animalID < p1.animalID) {
          return true;
        } else {
          return false;
        }
      }
      return false;
      break;
    case 2: //size
      if (p2.animalSizeCurrent < p1.animalSizeCurrent) {
        return true;
      }
      if (p2.animalSizeCurrent == p1.animalSizeCurrent) {
        if (p2.animalID < p1.animalID) {
          return true;
        } else {
          return false;
        }
      }
      return false;
      break;
    case 3: //Price
      if (p2.animalAdoptionFee < p1.animalAdoptionFee) {
        return true;
      }
      if (p2.animalAdoptionFee == p1.animalAdoptionFee) {
        if (p2.animalID < p1.animalID) {
          return true;
        } else {
          return false;
        }
      }
      return false;
      break;
    default:
      return false;
  }
}

function zipToLatLong(zipcode) {
  var url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zipcode;
  $.post(url, function (result) {
    console.log(result.results[0].geometry.location);
  });
}

function parseAge(string) {
  var str = string.split(" ");
  var age = 0;
  for(i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {
      if (i + 1 < str.length) {
        if (str[i + 1].includes("Year")) {
          age += 12 * parseInt(str[i]);
        } else if (str[i + 1].includes("Month")) {
          age += parseInt(str[i]);
        }
      }
    }
  }
  // console.log("string " + string + " parsed to " + age);
  if (age == 0) {
    return 999;
  }
  return age;
}


function getArticle() {
	const articleImage = getArticleImage();
	const article = document.createElement('article');
  const holder = document.createElement('div');
  article.id = "article" + id;
  holder.className = 'imageholder';
	article.className = 'article-list__item';
  const button = document.createElement('button');
  button.className = 'like';
  button.id = 'likeButton' + id;
	holder.appendChild(articleImage);
  holder.appendChild(button);
  article.appendChild(holder);
  const petBasicInfo = document.createElement('div');
  petBasicInfo.className = 'petBasicInfo';
  const text = document.createElement('text');
  text.className = "petName";
  text.innerHTML = pets[id].animalName;
  petBasicInfo.append(text);
  var today = new Date();
  if (pets[id].animalKillDate != null  && today.getTime() < pets[id].animalKillDate.getTime() + 604800000) { //one week
    const urgency = document.createElement('img');
    urgency.src = 'https://cdn4.iconfinder.com/data/icons/online-menu/64/attencion_exclamation_mark_circle_danger-128.png';
    urgency.className = "notification";
    petBasicInfo.appendChild(urgency);
  }
  if (!pets[id].animalMixedBreed) { //heh shelter heh
    const shelter = document.createElement('img');
    shelter.src = 'https://cdn0.iconfinder.com/data/icons/layout-and-location/24/Untitled-2-02-128.png';
    shelter.className = "notification";
    petBasicInfo.appendChild(shelter);
  } else { // if not from shelter
    const nonshelter = document.createElement('img');
    nonshelter.src = 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png';
    nonshelter.className = "notification";
    petBasicInfo.appendChild(nonshelter);
  }
  article.appendChild(petBasicInfo);
  const details = document.createElement('div');
  details.className = "petDetails";
  var detailString = "";
  if (pets[id].animalAgeString != null && pets[id].animalAgeString.length > 0) {
    detailString += pets[id].animalAgeString.trim();
    if (pets[id].animalSex != null && pets[id].animalSex.length > 0) {
      detailString += ", ";
    }
  }
  if (pets[id].animalSex != null && pets[id].animalSex.length > 0) {
    detailString += pets[id].animalSex;
  }
  details.innerHTML = detailString;
  article.appendChild(details);

  id++;
	return article;
}

function setButtons() {
  for (i = 0; i < id; i++) {
    var button = "#likeButton" + i;
    $(button).click(function(){
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
    });
  }
}

function reQuery(query) {
  reSort(query, function() {
    clearList();
    repopulateList();
  });
}

function init() {
  $("#sneaky_toggle").click(function(){
    zipToLatLong(zip);
  });
  $("#sneaky_toggle2").click(function(){
    reQuery(2);
  });
  $("#sneaky_toggle3").click(function(){
    reQuery(3);
  });
  $.post("/getAllAnimals", function(result){
    pets = result.animals;
    addPage(++page);
  });
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
  setButtons();
}

const articleList = document.getElementById('article-list');
const articleListPagination = document.getElementById('article-list-pagination');
var page = 0;

window.onscroll = function() {
	if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
	addPage(++page);
};

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeModal")[0];

span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var s = $('.search'),
    f  = $('.searchform'),
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

init();
