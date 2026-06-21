"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DH_DATA } from "@/lib/data";

export default function VoucherQRPage({ params }: { params: { id: string } }) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes validity
  const deal = DH_DATA.deals.find(d => d.id === params.id) || DH_DATA.deals[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: 'var(--primary)', padding: '3rem 2rem', borderRadius: '24px', textAlign: 'center', color: 'white', maxWidth: '500px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{deal.title}</h2>
          <p style={{ marginBottom: '2rem', opacity: 0.9 }}>{deal.biz}</p>
          
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', position: 'relative' }}>
            <div style={{ width: '250px', height: '250px', background: '#ccc', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              [ QR Code Placeholder ]
            </div>
            
            {/* Anti-screenshot moving line simulation */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255, 0, 102, 0.5)', animation: 'scan 2s infinite linear' }} />
          </div>

          <p style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Mã này sẽ hết hạn sau:</p>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
            {mins}:{secs < 10 ? `0${secs}` : secs}
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>Vui lòng đưa mã này cho nhân viên để quét.</p>

          <style>{`
            @keyframes scan {
              0% { top: 0%; }
              50% { top: 100%; }
              100% { top: 0%; }
            }
          `}</style>
        </div>
      </main>
      <Footer />
    </>
  );
}
