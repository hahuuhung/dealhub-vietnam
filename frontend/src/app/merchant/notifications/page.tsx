"use client";

import React from "react";

export default function MerchantNotificationsPage() {
  const notifs = [
    { id: 1, title: "Khách hàng Nguyễn Văn A vừa mua deal", desc: "Deal: Combo Spa VIP. Số tiền: 399.000₫", time: "5 phút trước", read: false },
    { id: 2, title: "Lịch hẹn mới", desc: "Trần Thị B đã đặt lịch vào 14:00 hôm nay. Vui lòng xác nhận.", time: "1 tiếng trước", read: false },
    { id: 3, title: "Đối soát thành công", desc: "DealHub đã chuyển 10.000.000₫ vào tài khoản VCB của bạn.", time: "Hôm qua", read: true },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Thông báo hệ thống</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifs.map(n => (
          <div key={n.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', gap: '1.5rem', alignItems: 'center', borderLeft: n.read ? '4px solid transparent' : '4px solid var(--primary)' }}>
            <div style={{ fontSize: '2rem' }}>{n.title.includes('mua') ? '💰' : n.title.includes('hẹn') ? '📅' : '🏦'}</div>
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', fontWeight: n.read ? 'normal' : 'bold' }}>{n.title}</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{n.desc}</p>
              <span style={{ fontSize: '0.8rem', color: '#999' }}>{n.time}</span>
            </div>
            {!n.read && (
              <button style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}>Đánh dấu đã đọc</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
