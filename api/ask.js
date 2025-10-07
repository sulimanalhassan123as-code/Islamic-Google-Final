// This is the final, correct backend function for Gemini AI on Vercel
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (request, response) => {
  // Security: Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // Make sure you have added your NEW GEMINI_API_KEY from AI Studio to Vercel
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    const { question } = request.body;
    
    // Safety check for empty questions
    if (!question || typeof question !== 'string') {
      return response.status(400).json({ error: 'Invalid question provided.' });
    }

    const prompt = `As an Islamic knowledge assistant, answer the following question in a respectful, informative, and neutral way, based on general Islamic teachings. Question: "${question}"`;
    
    // Using the most stable, standard model that works with AI Studio keys
    const model = genAI.getGenerativeAI({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const geminiResponse = await result.response;
    
    // Check if the AI provided a response
    if (!geminiResponse) {
      throw new Error("The AI did not provide a response.");
    }
    
    const text = geminiResponse.text();
    response.status(200).json({ answer: text });

  } catch (error) {
    console.error("Error in /api/ask:", error);
    // Provide a more helpful error message in the logs
    console.error("Full error object:", JSON.stringify(error, null, 2));
    response.status(500).json({ error: "Sorry, I could not process your question at this time." });
  }
};
