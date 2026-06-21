"use client";

import { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { apiClient as api } from '@/lib/api';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Xin chào! Tôi là Trợ lý AI DealHub. Tôi có thể giúp bạn tìm voucher hoặc nhà hàng gần bạn.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/ai/chat', { query: userMsg });
      setMessages(prev => [
        ...prev, 
        { role: 'ai', text: res.data.message }
      ]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Xin lỗi, AI đang gặp sự cố kết nối.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 z-50 ${isOpen ? 'hidden' : ''}`}
      >
        <Bot className="w-7 h-7" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-white">
              <Bot className="w-5 h-5" />
              <span className="font-bold">DealHub AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-indigo-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-80 overflow-y-auto flex flex-col gap-3 bg-neutral-50 dark:bg-neutral-950">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'ai' ? 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 self-start text-neutral-900 dark:text-white' : 'bg-indigo-600 text-white self-end'}`}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 self-start p-3 rounded-2xl flex gap-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bạn muốn tìm gì..." 
              className="flex-1 bg-neutral-100 dark:bg-neutral-800 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none"
            />
            <button type="submit" className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 hover:bg-indigo-700">
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
