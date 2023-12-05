// DOM selectors
const formInputEl = document.querySelector('#userSearchInput');
const backBtn = document.querySelector("#backBtn");
const topicTxt = document.querySelector("#topicSpan");
const searchResultsEl = document.querySelector('#searchResults');

// Display the result from API call
function displayResult(resultsArr) {
  console.log(resultsArr);
  console.log(resultsArr[1].image_url);

  resultsArr.forEach(data => {
    const htmlStr =
      `<li class="list-group-item bg-dark text-light">
      <h2>${data.title}</h2>
      <img src="${data.image_url}">
      <p>Click <a href="${data.id}" target="_blank">Here</a> for more information.</p>
      </li>`
    searchResultsEl.insertAdjacentHTML('beforeend', htmlStr);
  });
  
}

// Create a url for an API call with user selections
function getAPIurl(onLoad = false) {
  // Use this block of code when the page load
  if (onLoad) {
    // If there's no queryParam in the url, go back to index.html
    if (!document.location.search) {
      document.location.href = './index.html';
    }

    // Extract the query params from the url
    const queryParamArr = document.location.search.split('&');
    const searchTopic = queryParamArr[0].split('=')[1];
    const format = queryParamArr[1].split('=')[1] || 'search';

    return `https://www.loc.gov/${format}/?q=${searchTopic}&fo=json`;
  }

  // DOM Selectors
  const searchTopicEl = document.querySelector('#searchInput');
  const selectFormatEl = document.querySelector("#formatSelect");

  // Get user search parameters
  const searchTopic = searchTopicEl.value.trim();
  const format = selectFormatEl.value === 'Please select a format...'
    ? 'search'
    : selectFormatEl.value;
 
  return `https://www.loc.gov/${format}/?q=${searchTopic}&fo=json`;
}

// Fetch the data from API
async function fetchAPIdata(url) {
  try {
    const reponse = await fetch(url)

    if (!reponse.ok) {
      const reponseError = new Error(`reponse.status: ${reponse.status}`);
      reponseError.name = 'Fetch Error';

      throw reponseError;
    }

    const data = await reponse.json();
    displayResult(data.results);

  } catch (error) {
    console.log(error);
    alert(`Error: ${error.name}`);
  }
}

// Event listner for form submittion 
formInputEl.addEventListener("submit", (event) => {
  event.preventDefault();

  fetchAPIdata(getAPIurl())
});

backBtn.addEventListener('click', () => {
  document.location.href = `./index.html`;
})

// Init IIFE
(onDOMContentLoaded = () => {
  fetchAPIdata(getAPIurl(true));
})();