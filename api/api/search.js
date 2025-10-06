module.exports = async (request, response) => {
  const query = request.query.q || 'islam';
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

  try {
    const fetchResponse = await fetch(apiUrl);
    const data = await fetchResponse.json();
    response.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/search:", error);
    response.status(500).json({ error: 'Failed to fetch search results.' });
  }
};
