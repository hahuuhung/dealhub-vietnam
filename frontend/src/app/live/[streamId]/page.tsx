"use client";

import React, { useState } from "react";
import { DH_DATA } from "@/lib/data";
import Link from "next/link";

export default function LivestreamPage({ params }: { params: { streamId: string } }) {
  const [chat, setChat] = useState(["Wow deal rẻ quá!", "Spa này ở đâu vậy ạ?", "Cho mình 1 suất"]);
  const [msg, setMsg] = useState("");
  const deal = DH_DATA.deals[0]; // Featured deal in stream

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if(msg) {
      setChat([...chat, msg]);
      setMsg("");
    }
  };

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Video Placeholder */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333' }}>
        <video 
          autoPlay loop muted playsInline 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          poster="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
        />
        <div style={{ position: 'absolute', top: '2rem', left: '1rem', background: 'rgba(255,0,102,0.8)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
          🔴 LIVE 1.2k
        </div>
        <Link href="/" style={{ position: 'absolute', top: '2rem', right: '1rem', color: 'white', fontSize: '1.5rem', textDecoration: 'none', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ✕
        </Link>
      </div>

      {/* Floating Deal Card */}
      <div style={{ position: 'absolute', bottom: '100px', left: '1rem', right: '1rem', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <div style={{ fontSize: '2.5rem' }}>{deal.emoji}</div>
        <div style={{ flexGrow: 1 }}>
          <h4 style={{ margin: 0, fontSize: '1rem' }}>{deal.title}</h4>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{deal.newPrice.toLocaleString()}₫</span>
          <span style={{ color: '#999', textDecoration: 'line-through', marginLeft: '0.5rem', fontSize: '0.8rem' }}>{deal.oldPrice.toLocaleString()}₫</span>
        </div>
        <Link href={`/deals/${deal.id}`} className="btn btn--primary" style={{ padding: '0.5rem 1rem' }}>
          Mua Ngay
        </Link>
      </div>

      {/* Chat Area */}
      <div style={{ position: 'absolute', bottom: '10px', left: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingBottom: '0.5rem' }}>
          {chat.map((c, i) => (
            <div key={i} style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', fontSize: '0.9rem' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>User{i+1}: </span>{c}
            </div>
          ))}
        </div>
        <form onSubmit={sendMsg} style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="Bình luận..." 
            value={msg} onChange={e => setMsg(e.target.value)}
            style={{ flexGrow: 1, padding: '0.8rem', borderRadius: '24px', border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(5px)' }}
          />
          <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer' }}>➤</button>
        </form>
      </div>

    </main>
  );
}
