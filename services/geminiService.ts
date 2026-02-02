
import { GoogleGenAI, Type } from "@google/genai";

// Always use process.env.API_KEY directly for initialization as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBabygirlMantra(mood: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Give me a daily mantra for someone who is feeling "${mood}". 
    The tone should be "2011 girly internet vibe", using words like "slay", "babygirl", "aesthetic", "king/queen", "sparkle". 
    Keep it short and sweet, under 30 words. Include some cute kaomoji like (｡♥‿♥｡) or ✨.`,
    config: {
      temperature: 0.9,
    }
  });
  return response.text || "You are always a star! ✨(◕‿◕✿)";
}

export async function getAestheticAdvice(question: string): Promise<string> {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Oracle of the OMG It's So Sick Babygirl Kingdom. 
      Answer this question: "${question}" using 2011-era girly internet slang. 
      Be supportive, funny, and ultra-aesthetic.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text || "The vibes say... YES! 💖";
}

export async function getAestheticAdviceWithImage(imageB64: string, question: string): Promise<string> {
  const base64Data = imageB64.includes(',') ? imageB64.split(',')[1] : imageB64;
  
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Data,
    },
  };
  
  const textPart = {
    text: `You are the Oracle of the OMG It's So Sick Babygirl Kingdom. 
    Analyze this image and the question/context: "${question || 'What do you think of this aesthetic?'}"
    Give ultra-aesthetic 2011-era girly internet advice. Use words like "slay", "babygirl", "aesthetic", "coquette", "ribbons", "soft-girl". 
    Be supportive, slightly dramatic, and funny. Mention specific visual details if you see them!`
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: [imagePart, textPart] },
    config: {
      temperature: 0.8,
    }
  });
  
  return response.text || "This image is pure magic! ✨";
}
