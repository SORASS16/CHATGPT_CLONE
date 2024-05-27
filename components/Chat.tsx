"use client";
import { useState , useEffect , useRef } from "react";
import InputForm from "./InputForm";
import {Card} from "@/components/ui/card";
import { genAI } from "@/utils/gemini";
import LogoutButton from "./logoutButton";


const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: string, role: string) => {
    const newMessage = { role, content: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]); // Append the new message
  };

  // const handleFormSubmit = async (values) => {
  //   const userMessage = values.username;
  //   addMessage(userMessage, "user");

  //   try {
  //     const response = await fetch("/api/gemini", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message: userMessage }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     addMessage(data.reply, "bot");
  //   } catch (error) {
  //     console.error("Error fetching API response:", error);
  //     addMessage("Sorry, something went wrong.", "bot");
  //   }
  // };

  const handleFormSubmit = async (values) => {
    const userMessage = values.username;
    addMessage(userMessage, "user");
    try{
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = values.username;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response);
    const text =await response.text();
    addMessage(text,"bot");
    }
    catch{
      console.error("error occured");
    }

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-4 space-y-4 overscroll-none">
        <div className="flex flex-col space-y-4 overflow-auto h-96">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-200 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {message.content}
              <div ref={messagesEndRef} />
            </div>
          ))}
        </div>
        <InputForm onSubmit={handleFormSubmit} />
      </Card>
      <LogoutButton />
    </div>
  );
};

export default Chat;
