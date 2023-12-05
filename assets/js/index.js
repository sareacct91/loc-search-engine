// DOM selectors
const formInputEl = document.querySelector('#userSearchInput');
const searchTopicEl = document.querySelector('#searchInput');
const selectFormatEl = document.querySelector("#formatSelect");


formInputEl.addEventListener("submit", (event) => {
  event.preventDefault();

  document.location.href =
    `./search-results.html?q=${searchTopicEl.value.trim()}&format=${selectFormatEl.value === 'Please select a format...' ? '' : selectFormatEl.value}`;
})