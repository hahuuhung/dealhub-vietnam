"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotificationsPage() {
  const notifs = [
    { id: 1, title: "Livestream sắp bắt đầu!", desc: "Spa VIP đang live với deal sốc giảm 70%, vào xem ngay!", time: "10 phút trước", read: false },
    { id: 2, title: "Voucher sắp hết hạn", desc: "Voucher 'Buffet Tôm Hùm' của bạn sẽ hết hạn vào ngày mai.", time: "1 ngày trước", read: false },
    { id: 3, title: "Thanh toán thành công", desc: "Đơn hàng #DH-98765432 trị giá 1.298.000₫ đã được ghi nhận.", time: "2 ngày trước", read: true },
  ];

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem', maxWidth: '600px', margin: '0 auto', minHeight: '60vh' }}>
        <h1 style={{ marginBottom: '2rem' }}>Thông báo</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {notifs.map(n => (
            <div key={n.id} style={{ background: n.read ? 'transparent' : 'var(--bg-card)', border: n.read ? '1px solid var(--border-light)' : '1px solid var(--primary)', padding: '1.5rem', borderRadius: '16px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: n.read ? 'transparent' : 'var(--primary)', flexShrink: 0 }}></div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{n.title}</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{n.desc}</p>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
