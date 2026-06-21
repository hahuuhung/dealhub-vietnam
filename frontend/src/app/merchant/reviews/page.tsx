"use client";

import React from "react";

export default function MerchantReviewsPage() {
  const reviews = [
    { id: 1, customer: "Hương Giang", rating: 5, date: "20/06/2026", comment: "Dịch vụ rất tốt, nhân viên nhiệt tình.", reply: "" },
    { id: 2, customer: "Minh Tuấn", rating: 4, date: "19/06/2026", comment: "Đồ ăn ngon nhưng lên món hơi chậm.", reply: "Cảm ơn bạn đã góp ý, nhà hàng sẽ khắc phục ạ." },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Quản lý Đánh giá</h1>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center', flex: 1 }}>
          <h2 style={{ fontSize: '3rem', color: '#faad14', margin: 0 }}>4.8</h2>
          <p style={{ color: 'var(--text-light)' }}>Đánh giá trung bình</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', flex: 2 }}>
          <p style={{ marginBottom: '0.5rem' }}>5 Sao: <progress value="80" max="100" style={{ width: '70%' }}></progress></p>
          <p style={{ marginBottom: '0.5rem' }}>4 Sao: <progress value="15" max="100" style={{ width: '70%' }}></progress></p>
          <p>3 Sao: <progress value="5" max="100" style={{ width: '70%' }}></progress></p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {reviews.map(r => (
          <div key={r.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>{r.customer}</span>
                <span style={{ color: '#faad14' }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
              </div>
              <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{r.date}</span>
            </div>
            <p style={{ marginBottom: '1rem' }}>"{r.comment}"</p>
            
            {r.reply ? (
              <div style={{ background: '#f5f7fa', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                <p style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Phản hồi của bạn:</p>
                <p style={{ fontSize: '0.9rem' }}>{r.reply}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" placeholder="Viết phản hồi..." style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
                <button className="btn btn--primary" style={{ padding: '0 1rem' }}>Gửi</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
