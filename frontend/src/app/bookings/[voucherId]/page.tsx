"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DH_DATA } from "@/lib/data";

export default function BookingPage({ params }: { params: { voucherId: string } }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const deal = DH_DATA.deals.find(d => d.id === params.voucherId) || DH_DATA.deals[0];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          <h1 style={{ color: 'var(--primary)' }}>Đặt lịch thành công!</h1>
          <p style={{ marginTop: '1rem' }}>Bạn đã đặt chỗ cho {deal.title} vào {time} ngày {date}.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Đặt Lịch Sử Dụng</h1>
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
            <div style={{ fontSize: '3rem' }}>{deal.emoji}</div>
            <div>
              <h3>{deal.title}</h3>
              <p style={{ color: 'var(--text-light)' }}>{deal.biz}</p>
            </div>
          </div>

          <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Chọn Ngày</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Chọn Giờ</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {["09:00", "10:30", "13:00", "15:00", "17:30", "19:00"].map(t => (
                  <button 
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    style={{ padding: '0.8rem', border: `1px solid ${time === t ? 'var(--primary)' : 'var(--border-light)'}`, background: time === t ? 'var(--primary)' : 'transparent', color: time === t ? 'white' : 'inherit', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Ghi chú cho doanh nghiệp</label>
              <textarea rows={3} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} placeholder="Ví dụ: Dị ứng đồ hải sản..."></textarea>
            </div>

            <button type="submit" className="btn btn--primary" style={{ padding: '1rem' }} disabled={!date || !time}>Xác Nhận Đặt Lịch</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
