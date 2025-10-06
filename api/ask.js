// This is the correct backend function for Gemini AI on Vercel
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (request, response) => {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    const { question } = request.body;
    const prompt = `As an Islamic knowledge assistant, answer the following question in a respectful and informative way. Question: "${question}"`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);
    const geminiResponse = await result.response;
    const text = geminiResponse.text();
    response.status(200).json({ answer: text });
  } catch (error)
  {
    console.error("Error in /api/ask:", error);
    response.status(500).json({ error: "Sorry, I could not process your question at this time." });
  }
};
