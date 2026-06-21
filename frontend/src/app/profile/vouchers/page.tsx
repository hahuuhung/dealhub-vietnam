"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { DH_DATA } from "@/lib/data";

export default function MyVouchersPage() {
  const [tab, setTab] = useState("active");
  const vouchers = DH_DATA.deals.slice(0, 3); // Mock user vouchers

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Kho Voucher Của Tôi</h1>
        
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-light)', marginBottom: '2rem' }}>
          <button 
            onClick={() => setTab("active")}
            style={{ padding: '1rem', background: 'none', borderBottom: tab === 'active' ? '2px solid var(--primary)' : 'none', fontWeight: tab === 'active' ? 'bold' : 'normal', color: tab === 'active' ? 'var(--primary)' : 'var(--text-light)' }}>
            Chưa sử dụng (3)
          </button>
          <button 
            onClick={() => setTab("used")}
            style={{ padding: '1rem', background: 'none', borderBottom: tab === 'used' ? '2px solid var(--primary)' : 'none', fontWeight: tab === 'used' ? 'bold' : 'normal', color: tab === 'used' ? 'var(--primary)' : 'var(--text-light)' }}>
            Đã sử dụng
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tab === "active" ? (
            vouchers.map(v => (
              <div key={v.id} style={{ display: 'flex', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ fontSize: '4rem', background: 'var(--bg)', padding: '1rem', borderRadius: '12px' }}>{v.emoji}</div>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>{v.biz}</p>
                  <span style={{ display: 'inline-block', background: '#e6f7ff', color: '#005BAA', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                    Hết hạn: 31/12/2026
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link href={`/profile/vouchers/${v.id}`} className="btn btn--primary" style={{ textAlign: 'center' }}>
                    Dùng Ngay (Mã QR)
                  </Link>
                  <Link href={`/bookings/${v.id}`} className="btn btn--ghost" style={{ textAlign: 'center' }}>
                    Đặt lịch (Booking)
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--text-light)' }}>Chưa có voucher nào đã sử dụng.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
