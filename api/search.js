// Google Search backend function for Vercel
const fetch = require("node-fetch");

module.exports = async (request, response) => {
  const query = request.query.q || "islam";
  const apiKey = process.env.API_KEY;
  const searchEngineId = process.env.CX;

  console.log("🔍 Debug info:", { apiKeySet: !!apiKey, searchEngineIdSet: !!searchEngineId });

  if (!apiKey || !searchEngineId) {
    console.error("Missing API key or Search Engine ID environment variables.");
    return response.status(500).json({ error: "Missing API credentials." });
  }

  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
  console.log("➡️ Fetching:", apiUrl);

  try {
    const fetchResponse = await fetch(apiUrl);
    const data = await fetchResponse.json();
    console.log("✅ Google API responded:", data);

    if (!data.items) {
      console.error("⚠️ No search results:", data);
      return response.status(404).json({ error: "No results found." });
    }

    response.status(200).json(data);
  } catch (error) {
    console.error("💥 Error in /api/search:", error);
    response.status(500).json({ error: "Failed to fetch search results." });
  }
};
  
