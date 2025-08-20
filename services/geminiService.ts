
import { GoogleGenAI } from "@google/genai";
import { PromptData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getImprovements = async (data: PromptData): Promise<string> => {
  const prompt = `
    Based on these deconstructed requirements for an AI prompt, diagnose potential weaknesses and suggest specific improvements. Focus on adding clarity, specificity, providing context, and defining the format for the output.

    **Deconstructed Requirements:**
    - Core Task: ${data.coreTask || 'Not specified'}
    - Inputs: ${data.inputs || 'Not specified'}
    - Desired Output: ${data.output || 'Not specified'}
    - Critical Features/Constraints: ${data.features || 'Not specified'}
    
    If the initial prompt was provided, here it is for context:
    Initial Prompt: "${data.rawPrompt}"

    Provide your diagnosis and suggestions as a clear, bulleted list of actionable improvements. Do not generate the full prompt, only the improvements.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching improvements from Gemini API:", error);
    throw new Error("Failed to get suggestions from AI. Please check your connection or API key.");
  }
};


export const developPrompt = async (data: PromptData, improvements: string): Promise<string> => {
  const prompt = `
    You are an expert prompt engineer. Your task is to draft a complete, well-structured, and optimized prompt using the 4-D methodology.
    
    **1. Deconstructed Requirements:**
    - Core Task: ${data.coreTask}
    - Inputs: ${data.inputs}
    - Desired Output: ${data.output}
    - Critical Features/Constraints: ${data.features}

    **2. Diagnosed Improvements to Incorporate:**
    ${improvements}

    **Your Task:**
    Synthesize all the information above into a final, polished prompt.
    The prompt must be clear, concise, and follow best practices for prompting AI models.
    Use Markdown for structure (e.g., **Role**, **Task**, **Specifications**, **Validation**) to create a professional and highly effective prompt.
    
    Generate ONLY the final, optimized prompt as a single block of Markdown text. Do not include any other explanatory text before or after the prompt itself.
  `;
    
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error developing prompt with Gemini API:", error);
    throw new Error("Failed to generate the final prompt. Please try again.");
  }
};
