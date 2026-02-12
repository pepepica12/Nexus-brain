
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function askAssistant(prompt: string, context: any) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          text: `You are the Nexus Multirepo Brain Assistant. You help engineers manage their complex infrastructure.
          
          Current System Context:
          ${JSON.stringify(context, null, 2)}
          
          User Question: ${prompt}
          
          Answer concisely and technically based on the context provided. Focus on sync status, forensic findings, and service health.`
        }
      ],
      config: {
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI Brain. Please check your configuration.";
  }
}
