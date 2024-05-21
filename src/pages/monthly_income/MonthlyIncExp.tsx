import React, { useState } from 'react';
import axios from 'axios';

const MonthlyIncExp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setError(null);

    try {
      const response = await axios.post(
        '',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: input }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ${""}',
          },
        }
      );

      const botMessage = { sender: 'bot', text: response.data.choices[0].message.content };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setError('You have reached the rate limit. Please try again later.');
      } else {
        setError('An error occurred while sending the message.');
      }
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col space-y-2 overflow-y-auto h-96 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-900 self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default MonthlyIncExp;



;