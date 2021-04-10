// Defining a baseURL and token to as part of the request URL

const baseURL = 'https://api-ssl.bitly.com/v4/shorten';
const token = 'dc95214bb1e708659bad95230db67b876c6df93d';
let url;

// Grab references to all the DOM elements you'll need to manipulate

const longURL = document.querySelector('.search');
const searchForm = document.querySelector('form');

const section = document.querySelector('section');

// Event listeners to control the functionality
searchForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    // Use preventDefault() to stop the form submitting
    e.preventDefault();
    
    var raw = "{\n    \"long_url\": \"<string>\",\n    \"group_guid\": \"<string>\",\n    \"domain\": \"bit.ly\"\n}";

    var requestOptions = {
      method: 'POST',
      body: raw,
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      Authorization: 'dc95214bb1e708659bad95230db67b876c6df93d',
    };
    
    fetch("https://api-ssl.bitly.com/v4/shorten", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

}

function displayResults(json) {

    const link = json.response.docs;

    const article = document.createElement('article');
    const heading = document.createElement('h2');
    const para2 = document.createElement('p');
    const clearfix = document.createElement('div');

    article.href = link.long_url;

    clearfix.setAttribute('class', 'clearfix');

    article.appendChild(heading);
    heading.appendChild(link);
    article.appendChild(para2);
    article.appendChild(clearfix);
    section.appendChild(article);

}
