"use client";

import React from "react";

export default function MerchantBookingCalendar() {
  const schedule = [
    { time: "09:00", customer: "Nguyễn Văn A", service: "Spa VIP", status: "confirmed", color: "#e6f7ff", borderColor: "#91caff" },
    { time: "10:30", customer: "", service: "", status: "available", color: "transparent", borderColor: "#eaeaea" },
    { time: "13:00", customer: "Trần Thị B", service: "Massage Đá Nóng", status: "pending", color: "#fffbe6", borderColor: "#ffe58f" },
    { time: "15:00", customer: "Lê Văn C", service: "Spa VIP", status: "confirmed", color: "#e6f7ff", borderColor: "#91caff" },
    { time: "17:30", customer: "", service: "", status: "available", color: "transparent", borderColor: "#eaeaea" },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Lịch Hẹn Hôm Nay</h1>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        
        {/* Calendar Grid */}
        <div style={{ flex: '1 1 60%', background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {schedule.map((slot, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '60px', fontWeight: 'bold', color: 'var(--text-light)' }}>{slot.time}</div>
                <div style={{ 
                  flexGrow: 1, 
                  background: slot.color, 
                  border: `1px solid ${slot.borderColor}`, 
                  padding: '1rem', 
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  {slot.status === "available" ? (
                    <span style={{ color: '#ccc' }}>Trống</span>
                  ) : (
                    <>
                      <div>
                        <span style={{ fontWeight: 'bold', display: 'block' }}>{slot.customer}</span>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>{slot.service}</span>
                      </div>
                      <div>
                        <span style={{ background: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', border: `1px solid ${slot.borderColor}` }}>
                          {slot.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Details */}
        <div style={{ flex: '1 1 30%', background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>Chi tiết Lịch hẹn</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Khách hàng</p>
              <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Nguyễn Văn A</p>
              <p style={{ color: 'var(--primary)' }}>0901 234 567</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Thời gian</p>
              <p style={{ fontWeight: 'bold' }}>09:00 - 21/06/2026</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Dịch vụ</p>
              <p style={{ fontWeight: 'bold' }}>Spa VIP (Đã thanh toán qua DealHub)</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Ghi chú</p>
              <p style={{ background: '#f5f7fa', padding: '0.8rem', borderRadius: '8px', fontSize: '0.9rem' }}>"Mình đi 2 người nhé"</p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button className="btn btn--primary" style={{ flex: 1, padding: '0.8rem' }}>Check-in Khách</button>
              <button className="btn btn--ghost" style={{ flex: 1, padding: '0.8rem', color: '#ff4d4f', borderColor: '#ff4d4f' }}>Hủy lịch</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
