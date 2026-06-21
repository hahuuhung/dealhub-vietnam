"use client";

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { X, Send, Heart, ShoppingBag, Users, Share2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function LivestreamViewer() {
  const params = useParams();
  const streamId = params.streamId as string;
  const router = useRouter();
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [likes, setLikes] = useState(124);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('joinRoom', streamId);

    newSocket.on('newMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => {
      newSocket.emit('leaveRoom', streamId);
      newSocket.disconnect();
    };
  }, [streamId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !socket) return;
    
    socket.emit('sendMessage', {
      streamId,
      userName: 'Khách hàng', // Should be from auth context
      text: inputText
    });
    setInputText('');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col md:flex-row">
      {/* Video Area */}
      <div className="relative flex-1 bg-neutral-900 h-full flex items-center justify-center">
        {/* Mock Stream Video */}
        <video 
          src="https://www.w3schools.com/html/mov_bbb.mp4" 
          className="w-full h-full object-cover"
          autoPlay loop muted playsInline
        />
        
        {/* Top Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-full pr-4 p-1">
            <img src="/globe.svg" className="w-8 h-8 rounded-full border border-white" alt="avatar" />
            <div>
              <p className="text-white font-bold text-sm">Spa VIP 5 Sao</p>
              <div className="flex items-center gap-1 text-xs text-white/80">
                <Users className="w-3 h-3" /> 1,234
              </div>
            </div>
            <button className="ml-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">Follow</button>
          </div>
          
          <button onClick={() => router.back()} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Floating Actions */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-4">
          <button onClick={() => setLikes(l => l + 1)} className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex flex-col items-center justify-center text-white active:scale-90 transition-transform">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            <span className="text-[10px] mt-0.5">{likes}</span>
          </button>
          <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Pinned Deal */}
        <div className="absolute bottom-4 left-4 right-20 bg-white rounded-xl p-3 flex items-center gap-3 shadow-lg">
          <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-neutral-900 truncate">Combo Massage 90p</p>
            <p className="text-rose-600 font-bold">199.000đ <span className="line-through text-neutral-400 text-xs">500.000đ</span></p>
          </div>
          <button className="bg-rose-600 text-white font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap">
            Mua Ngay
          </button>
        </div>
      </div>

      {/* Chat Area (Right sidebar on desktop, transparent overlay on mobile) */}
      <div className="md:w-80 h-1/2 md:h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-neutral-950 absolute md:relative bottom-0 left-0 right-0 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 mask-image-b">
          <div className="bg-indigo-500/20 text-indigo-200 text-xs px-3 py-2 rounded-lg border border-indigo-500/30">
            Chào mừng bạn đến với Livestream! Vui lòng bình luận lịch sự.
          </div>
          {messages.map((msg) => (
            <div key={msg.id} className="text-sm">
              <span className="font-bold text-white/80 mr-2">{msg.userName}:</span>
              <span className="text-white">{msg.text}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-4 flex gap-2">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nói gì đó..." 
            className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
          />
          <button type="submit" className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 hover:bg-indigo-700">
            <Send className="w-4 h-4 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
