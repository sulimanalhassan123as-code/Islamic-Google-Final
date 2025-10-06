// This is the backend function for Gemini AI
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    const { question } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const prompt = `As an Islamic knowledge assistant, answer the following question in a respectful and informative way. Question: "${question}"`;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).json({ answer: text });
  } catch (error) {
    console.error("Error with Gemini API:", error);
    res.status(500).json({ error: "Sorry, I could not process your question at this time." });
  }
};
