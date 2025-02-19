import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message,
      });
      const botText = response.data.response;

      setTimeout(() => {
        let currentText = "";
        const botMessage = { sender: "bot", text: currentText };

        setChatHistory((prev) => [...prev, botMessage]);

        botText.split("").forEach((char, index) => {
          setTimeout(() => {
            currentText += char;
            setChatHistory((prev) => {
              const updatedHistory = [...prev];
              updatedHistory[updatedHistory.length - 1] = {
                sender: "bot",
                text: currentText,
              };
              return updatedHistory;
            });
          }, index * 50);
        });
      }, 2200);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
    }

    setMessage("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }, 100);
    }
  }, [chatHistory]);

  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div>
      <div className="bg-primary mb-16 bg-cb bg-cover bg-center bg-no-repeat w-full">
        <div className="max-padd-container py-10">
          <h1 className="h1 text-center text-black bold-36">
            <span className="font-bold text-blue-900">Furnio</span>
            <span className="font-semibold"> Assistant</span>
          </h1>
          <h5 className="h5 text-center text-gray-700 mt-2 mb-4">
            Your personal 24/7 AI assistant for all your furniture needs
          </h5>
          <div className="bg-white h-[700px] p-5 border-purple-500 border-2 rounded-2xl shadow-md w-full max-w-[394px] mx-auto relative flex flex-col">
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-2"
              style={{
                maxHeight: "450px",
                minHeight: "300px",
                scrollbarWidth: "thin",
                scrollbarColor: "#cbd5e0 #edf2f7",
              }}
            >
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-end my-1 max-w-[80%] ${
                    msg.sender === "user"
                      ? "ml-auto flex-row-reverse"
                      : "mr-auto"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <img
                      src="/src/assets/chatbot.png"
                      alt="Bot"
                      className="w-8 h-8 rounded-full mr-2 bg-white border-blue-700 border-2 p-1"
                    />
                  )}

                  <div
                    className={`p-2 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-blue-200 text-blue-900 font-semibold w-96 text-right"
                        : "bg-gray-300 text-gray-700 font-semibold text-left"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className=" bottom-0 left-0 right-0 p-4 bg-white border-t">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask from Furnio"
                className="w-full p-2 border rounded-md"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={sendMessage}
                  className="flex-1 p-2 bg-blue-500 text-white rounded-xl"
                >
                  Send
                </button>
                <button
                  onClick={clearChat}
                  className="flex-1 p-2 bg-red-500 text-white rounded-xl"
                >
                  Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Rules for cash on delivery?",
                  "How long does delivery take?",
                  "Can I customize furniture?",
                  "Show me modern sofas",
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(suggestion)}
                    className="px-3 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatBot;
