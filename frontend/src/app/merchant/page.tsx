"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MerchantDashboard() {
  const data = [
    { name: "T2", sales: 4000 },
    { name: "T3", sales: 3000 },
    { name: "T4", sales: 2000 },
    { name: "T5", sales: 2780 },
    { name: "T6", sales: 1890 },
    { name: "T7", sales: 2390 },
    { name: "CN", sales: 3490 },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Tổng quan kinh doanh</h1>
      
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', marginBottom: '0.5rem' }}>Doanh thu hôm nay</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#005BAA' }}>12.500.000₫</p>
          <span style={{ color: 'green', fontSize: '0.9rem' }}>↑ 15% so với hôm qua</span>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', marginBottom: '0.5rem' }}>Lượt mua Voucher</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>45</p>
          <span style={{ color: 'green', fontSize: '0.9rem' }}>↑ 5% so với tuần trước</span>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ color: 'var(--text-light)', fontSize: '1rem', marginBottom: '0.5rem' }}>Lịch hẹn sắp tới</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fa8c16' }}>12</p>
          <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Trong 24h tới</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Chart */}
        <div style={{ flex: '1 1 60%', background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Doanh thu 7 ngày qua</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ flex: '1 1 30%', background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Hoạt động gần đây</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>Quét mã QR thành công</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Nguyễn Văn A - Spa VIP</p>
              </div>
              <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>5 phút trước</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>Booking mới</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Trần Thị B - 14:00 Hôm nay</p>
              </div>
              <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>10 phút trước</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>Voucher được mua</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Combo Massage x2</p>
              </div>
              <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>30 phút trước</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
