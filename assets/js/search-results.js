// DOM selectors
const formInputEl = document.querySelector('#userSearchInput');
const searchTopicEl = document.querySelector('#searchInput');
const selectFormatEl = document.querySelector("#formatSelect");
const searchBtn = document.querySelector("#searchBtn");
const backBtn = document.querySelector("#backBtn");
const topicTxt = document.querySelector("#topicSpan");
const searchResultsEl = document.querySelector('#searchResults');



function displayResult(resultsArr) {
  
}

function getAPIurl() {
  /* 
    /search-results.html?q=dog&format=photos
  0  ?q=dog
    &
  1  format=photos
  */
  const queryParamArr = document.location.search.split('&');
  const searchTopic = queryParamArr[0].split('=')[1];
  const format = queryParamArr[1].split('=')[1] || 'search';

  console.log(searchTopic);
  console.log(format);

  return `https://www.loc.gov/${format}/?q=${searchTopic}&fo=json`;
}

function fetchAPIdata(url) {
  fetch(url).then(response => response.json()).then(data => {
    console.log(data.results);
    displayResult(data.results);
  })
}







// Init IIFE
(onDOMContentLoaded = () => {
  fetchAPIdata(getAPIurl());
})();