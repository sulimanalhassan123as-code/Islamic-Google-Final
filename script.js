// This is the new, correct script for Vercel
const googleSearchSection = document.getElementById('google-search-section');
const aiSection = document.getElementById('ai-section');
const showAiBtn = document.getElementById('show-ai-btn');
const showSearchBtn = document.getElementById('show-search-btn');

showAiBtn.addEventListener('click', () => {
    googleSearchSection.classList.add('hidden');
    aiSection.classList.remove('hidden');
});

showSearchBtn.addEventListener('click', () => {
    aiSection.classList.add('hidden');
    googleSearchSection.classList.remove('hidden');
});

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results-container');
const loadingMessage = document.getElementById('loading-message');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const query = searchInput.value;
  if (query) { fetchResults(query); }
});

async function fetchResults(query) {
  loadingMessage.textContent = 'Searching...';
  resultsContainer.innerHTML = '';
  const apiUrl = `/api/search?q=${encodeURIComponent(query)}`; // Vercel standard URL
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    loadingMessage.textContent = 'Failed to fetch search results.';
  }
}

function displayResults(data) { /* ... same as before ... */ }

const aiForm = document.getElementById('ai-form');
const aiQuestionInput = document.getElementById('ai-question-input');
const aiAnswerContainer = document.getElementById('ai-answer-container');
const aiLoadingMessage = document.getElementById('ai-loading-message');

aiForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const question = aiQuestionInput.value;
    if (!question) return;

    aiLoadingMessage.textContent = 'AI is thinking...';
    aiAnswerContainer.innerHTML = '';
    const apiUrl = '/api/ask'; // Vercel standard URL
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ question: question })
        });
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
        const data = await response.json();
        displayAiAnswer(data.answer);
    } catch (error) {
        console.error("Error with AI function:", error);
        aiLoadingMessage.textContent = 'Sorry, there was an error.';
    }
});

function displayAiAnswer(answer) { /* ... same as before ... */ }
// The displayResults and displayAiAnswer functions are the same as the last version.
// To save space, they are omitted here, but you should copy the full script.js from the previous message.
