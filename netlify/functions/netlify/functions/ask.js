const { GoogleGenerativeAI } = require("@google/generative-ai");

// Get your new secret key from the environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { question } = JSON.parse(event.body);

    // For safety, let's make sure the question is about Islam
    const prompt = `As an Islamic knowledge assistant, answer the following question in a respectful and informative way. Question: "${question}"`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ answer: text }),
    };
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Sorry, I could not process your question at this time." }),
    };
  }
};
