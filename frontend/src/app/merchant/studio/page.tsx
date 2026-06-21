"use client";

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Video, Mic, MicOff, VideoOff, Settings, Users, MessageSquare, Plus, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LivestreamStudio() {
  const router = useRouter();
  const streamId = "merchant-stream-123"; // MVP Hardcoded
  
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      // Cleanup camera
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const toggleLive = () => {
    if (!isLive) {
      initCamera();
      setIsLive(true);
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
      setIsLive(false);
    }
  };

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => track.enabled = !micOn);
      setMicOn(!micOn);
    }
  };

  const toggleCam = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => track.enabled = !camOn);
      setCamOn(!camOn);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !socket) return;
    
    socket.emit('sendMessage', {
      streamId,
      userName: 'HOST',
      text: inputText
    });
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col md:flex-row gap-6">
      {/* Studio Area */}
      <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-indigo-500" />
              Creator Studio
            </h1>
          </div>
          <button 
            onClick={toggleLive}
            className={`px-6 py-2 rounded-lg font-bold text-white transition-colors ${isLive ? 'bg-rose-600 hover:bg-rose-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isLive ? 'End Stream' : 'Go Live'}
          </button>
        </div>

        {/* Video Preview */}
        <div className="flex-1 bg-black relative flex items-center justify-center">
          {!isLive && (
            <div className="text-neutral-500 flex flex-col items-center">
              <VideoOff className="w-12 h-12 mb-2" />
              <p>Camera is off. Click "Go Live" to start.</p>
            </div>
          )}
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            playsInline
            className={`w-full h-full object-cover ${!isLive && 'hidden'}`}
          />
          
          {isLive && (
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div> LIVE
              </div>
              <div className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <Users className="w-3 h-3" /> 124
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/50 flex justify-center gap-4">
          <button onClick={toggleMic} disabled={!isLive} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${!isLive ? 'bg-neutral-800 text-neutral-600' : micOn ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-rose-600 text-white'}`}>
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button onClick={toggleCam} disabled={!isLive} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${!isLive ? 'bg-neutral-800 text-neutral-600' : camOn ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-rose-600 text-white'}`}>
            {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
          <button className="w-12 h-12 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar Area */}
      <div className="w-full md:w-80 flex flex-col gap-6">
        {/* Deal Pinner */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
          <h2 className="text-white font-bold mb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            Pin Deals
          </h2>
          <div className="space-y-2">
            <div className="bg-neutral-900 p-2 rounded-lg border border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Combo Massage 90p</p>
                <p className="text-emerald-400 text-xs">199.000đ</p>
              </div>
              <button className="text-indigo-400 hover:text-indigo-300">
                <CheckCircle2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button className="w-full mt-3 py-2 border border-dashed border-neutral-700 rounded-lg text-neutral-400 text-sm flex items-center justify-center gap-2 hover:bg-neutral-900 hover:text-white transition-colors">
            <Plus className="w-4 h-4" /> Add Deal to Stream
          </button>
        </div>

        {/* Live Chat */}
        <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col min-h-[300px]">
          <div className="p-3 border-b border-neutral-800">
            <h2 className="text-white font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Live Chat
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className="text-sm">
                <span className={`font-bold mr-2 ${msg.userName === 'HOST' ? 'text-rose-400' : 'text-indigo-400'}`}>{msg.userName}:</span>
                <span className="text-neutral-300">{msg.text}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t border-neutral-800 flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Reply to viewers..." 
              className="flex-1 bg-neutral-900 border border-neutral-800 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-indigo-700">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
