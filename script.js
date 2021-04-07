// Defining a baseURL and token to as part of the request URL
const baseURL = 'https://api.shrtco.de/v2/shorten';
let url;

// Select the DOM elements
const longURL = document.querySelector('.long-url');
const searchForm = document.querySelector('form');
const waitMsg = document.querySelector('.message')
const resultDiv = document.querySelector('.result');
const resultSection = document.querySelector('section');

// Submit form
searchForm.addEventListener('submit', fetchResults);

// create a 'p' element to display a wait message
const para = document.createElement('p');


function fetchResults(e) {

  // Use preventDefault() to stop the form submitting
  e.preventDefault();

  // display a wait message
  para.innerText = "Please wait a few moments to get your link..."
  waitMsg.appendChild(para)

  // assemble the request url
  url = `${baseURL}?url=${longURL.value}`

  // retrieve the JSON response
  fetch(url)
    .then(response => response.json())
    .then(json => displayResults(json))
    .catch(error => console.log('error', error));

}

function displayResults(json) {

  // remove wait message
  para.style.display = 'none'

  // Retrieve the original & shortened link from the JSON response
  const shortLink = json.result.full_short_link;
  const originalLink = json.result.original_link;

  // ?
  const clearfix = document.createElement('div');
  clearfix.setAttribute('class', 'clearfix');

  // display the results to the user
  resultSection.innerHTML = `
  <div class="response">
    <span class="long-link">${originalLink}</span>
    <div class="row-right">
      <p class="short-link">${shortLink}</p>
      <button class="copy-btn" id="copy-btn" data-link="link-">Copy!</button>
    <div>
  </div>`;

  // add copy to clipboard functionality to button
  const copyBtn = document.querySelector('.copy-btn')
  copyBtn.addEventListener('click', copyLink)

  // clear the input field
  longURL.value = ""

  // clear?
  article.appendChild(clearfix);

}

function copyLink() {

  // change color when copied to clipboard -> indicates change to user
  let copyBtnColor = this.style.backgroundColor;
  this.style.backgroundColor = copyBtnColor ? '' : "#323232";
  this.innerText = 'Copied!';

  // As the link is in a 'p' tag, place its text in a textarea in order to copy to the clipboard
  const shortLinkCopied = this.previousElementSibling.innerText;
  var textArea = document.createElement('textarea');
  textArea.value = shortLinkCopied;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();

}
