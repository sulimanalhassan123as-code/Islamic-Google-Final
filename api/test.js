// This is a special test file to find available models.
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (request, response) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    // This is a special, undocumented way to list models with this library.
    // We are going to try to get the list directly.
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // We need a model to get the service object

    // This is a deep dive into the library to find the list function
    const models = await model.generativeModel._serviceClient.listModels();
    
    // We will return the list of models as a JSON response.
    response.status(200).json(models);

  } catch (error) {
    console.error("Error listing models:", error);
    response.status(500).json({ 
        error: "Failed to list models.",
        details: error.message 
    });
  }
};
