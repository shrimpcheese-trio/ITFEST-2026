const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL ?? "llama-3.1-8b-instant";
const guardModel = process.env.GROQ_GUARD_MODEL ?? "llama-3.1-8b-instant";

export const groq = {
  apiKey,
  model,
  guardModel,
  baseUrl: "https://api.groq.com/openai/v1",
} as const;