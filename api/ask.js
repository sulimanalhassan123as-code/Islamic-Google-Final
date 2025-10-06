// This is the backend function for Gemini AI
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Make sure you have added your GEMINI_API_KEY to your Vercel Environment Variables
  const genAI = new GoogleGener
