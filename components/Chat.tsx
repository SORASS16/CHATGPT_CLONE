"use client";
import { useState } from "react";
import InputForm from "./InputForm";
import {Card} from "@/components/ui/card";
const Chat = () => {
  const [messages, setMessages] = useState([] as any);

  const addMessage = (message:string, role:string) => {
    const prevAdd = {role , content:message};
    setMessages([ prevAdd , ...messages]);
  };

  const handleFormSubmit = async (values) => {
    const userMessage = values.username;
    addMessage(userMessage, "user");

    try {
      const response = await fetch("/api/gemini", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })
      // }) .then((response) => response.json())
      //       .then((data) => {
      //           console.log(data);
      //       })
      //       .catch((error) => {
      //           console.error(error);
      //       });
      const data = await response.json();
      addMessage(data.reply, "bot");
    } catch (error) {
      console.error("Error fetching API response:", error);
      addMessage("Sorry, something went wrong.", "bot");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-4 space-y-4">
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
            </div>
          ))}
        </div>
        <InputForm onSubmit={handleFormSubmit} />
      </Card>
    </div>
  );
};

export default Chat;
