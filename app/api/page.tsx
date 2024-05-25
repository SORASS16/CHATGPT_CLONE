import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAohTnWETbq0JEDHh8cXB23URyK_Kq8yfs");

export default async function handler(req:any,res:any){
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    const { message } = req.body;
        
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const response = result.response;
      const text = await response.text();
  
      res.status(200).json({ reply: text });
    } catch (error) {
      console.error("Error fetching Gemini API response:", error);
      res.status(500).json({ reply: "Sorry, something went wrong." });
    }
  }
