"use client";

import React, { useState } from "react";
import { DH_DATA } from "@/lib/data";

export default function MerchantStudioPage() {
  const [isLive, setIsLive] = useState(false);
  const deals = DH_DATA.deals.slice(0, 3);
  const [pinnedDeal, setPinnedDeal] = useState<string | null>(null);

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  return (
    <div style={{ height: 'calc(100vh - 120px)', display: 'flex', gap: '2rem' }}>
      
      {/* Broadcaster Area */}
      <div style={{ flex: '1 1 70%', background: '#111', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          {!isLive ? (
            <p style={{ color: 'white' }}>Camera Preview Offline. Nhấn "Bắt đầu Livestream" để kết nối.</p>
          ) : (
            <video 
              autoPlay loop muted playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              poster="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
            />
          )}
        </div>

        {isLive && (
          <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,0,102,0.8)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold' }}>
            🔴 LIVE - Đang phát (1.2k Viewers)
          </div>
        )}

        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={toggleLive}
            style={{ 
              background: isLive ? '#ff4d4f' : 'var(--primary)', 
              color: 'white', 
              border: 'none', 
              padding: '1rem 3rem', 
              borderRadius: '24px', 
              fontSize: '1.2rem', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {isLive ? 'KẾT THÚC LIVESTREAM' : 'BẮT ĐẦU LIVESTREAM'}
          </button>
        </div>
      </div>

      {/* Control Panel Area */}
      <div style={{ flex: '1 1 30%', background: 'white', borderRadius: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* Deal Pinner */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eaeaea' }}>
          <h3 style={{ marginBottom: '1rem' }}>Sản phẩm trong Live</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {deals.map(d => (
              <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f5f7fa', padding: '0.8rem', borderRadius: '8px', border: pinnedDeal === d.id ? '2px solid var(--primary)' : '1px solid transparent' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{d.title} - {d.newPrice.toLocaleString()}₫</div>
                <button 
                  onClick={() => setPinnedDeal(d.id)}
                  style={{ background: pinnedDeal === d.id ? 'var(--primary)' : 'white', color: pinnedDeal === d.id ? 'white' : '#333', border: '1px solid #eaeaea', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  {pinnedDeal === d.id ? 'Đang ghim' : 'Ghim'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Chat Panel */}
        <div style={{ flexGrow: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1rem' }}>Bình luận trực tiếp</h3>
          <div style={{ flexGrow: 1, background: '#f5f7fa', borderRadius: '8px', padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--primary)' }}>Nguyễn A:</strong> Còn suất 2 người không shop?</div>
            <div style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--primary)' }}>Trần B:</strong> Deal ngon quá!</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <input type="text" placeholder="Phản hồi khách..." style={{ flexGrow: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
            <button className="btn btn--primary" style={{ padding: '0 1rem' }}>Gửi</button>
          </div>
        </div>

      </div>

    </div>
  );
}
