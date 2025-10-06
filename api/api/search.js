// This is the backend function for Google Search
const fetch = require('node-fetch'); // Vercel requires this for this type of function

module.exports = async (req, res) => {
  const { q: query } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query || 'islam')}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        // Forward the error from Google's API if possible
        const errorData = await response.json();
        return res.status(response.status).json(errorData);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: 'Failed to fetch search results.' });
  }
};
