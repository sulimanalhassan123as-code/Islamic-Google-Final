// Google Search backend function for Vercel
const fetch = require("node-fetch");

module.exports = async (request, response) => {
  const query = request.query.q || "islam";
  const apiKey = process.env.API_KEY; // ✅ matches Vercel variable
  const searchEngineId = process.env.CX; // ✅ matches Vercel variable

  if (!apiKey || !searchEngineId) {
    console.error("Missing API key or Search Engine ID environment variables.");
    return response.status(500).json({ error: "Missing API credentials." });
  }

  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

  try {
    const fetchResponse = await fetch(apiUrl);
    const data = await fetchResponse.json();
    response.status(200).json(data);
  } catch (error) {
    console.error("Error in /api/search:", error);
    response.status(500).json({ error: "Failed to fetch search results." });
  }
};
