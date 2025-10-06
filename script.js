const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results-container');
const loadingMessage = document.getElementById('loading-message');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const query = searchInput.value;
  if (query) {
    fetchResults(query);
  }
});

async function fetchResults(query) {
  loadingMessage.textContent = 'Searching...';
  resultsContainer.innerHTML = '';

  const apiUrl = `/.netlify/functions/search?q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    loadingMessage.textContent = 'Failed to fetch search results.';
  }
}

function displayResults(data) {
  loadingMessage.textContent = '';

  if (data.items && data.items.length > 0) {
    data.items.forEach(item => {
      const resultElement = document.createElement('div');
      resultElement.classList.add('search-result-item');
      resultElement.innerHTML = `
        <a href="${item.link}" target="_blank" class="result-title">${item.htmlTitle}</a>
        <p class="result-url">${item.formattedUrl}</p>
        <p class="result-snippet">${item.htmlSnippet}</p>
      `;
      resultsContainer.appendChild(resultElement);
    });
  } else {
    loadingMessage.textContent = 'No results found for your query.';
  }
}
