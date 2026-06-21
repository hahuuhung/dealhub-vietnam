"use client";

import React from "react";
import Link from "next/link";
import { DH_DATA } from "@/lib/data";

export default function MerchantDealsPage() {
  const deals = DH_DATA.deals.slice(0, 5); // Mock data

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Quản lý Deal</h1>
        <Link href="/merchant/deals/new" className="btn btn--primary">
          + Tạo Deal Mới
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f5f7fa', borderBottom: '1px solid #eaeaea' }}>
            <tr>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-light)' }}>Deal</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-light)' }}>Giá bán</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-light)' }}>Đã bán</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-light)' }}>Tồn kho</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-light)' }}>Trạng thái</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-light)', textAlign: 'right' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((d, i) => (
              <tr key={d.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '2rem', background: '#f5f7fa', padding: '0.5rem', borderRadius: '8px' }}>{d.emoji}</span>
                    <span style={{ fontWeight: 600 }}>{d.title}</span>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                  {d.newPrice.toLocaleString()}₫
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>{d.sold}</td>
                <td style={{ padding: '1rem 1.5rem' }}>{d.left}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ background: i % 2 === 0 ? '#e6f7ff' : '#fff2e8', color: i % 2 === 0 ? '#005BAA' : '#fa8c16', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {i % 2 === 0 ? "Đang chạy" : "Tạm ngưng"}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: '#005BAA', cursor: 'pointer', marginRight: '1rem' }}>Sửa</button>
                  <button style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #eaeaea' }}>
          <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Hiển thị 1-5 của 12 deal</span>
        </div>
      </div>
    </div>
  );
}
