"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold' }}>
            N
          </div>
          <div>
            <h1 style={{ marginBottom: '0.5rem' }}>Nguyễn Văn A</h1>
            <p style={{ color: 'var(--text-light)' }}>0901 234 567</p>
            <span style={{ display: 'inline-block', marginTop: '0.5rem', background: '#fff2e8', color: '#fa8c16', padding: '0.3rem 0.8rem', borderRadius: '24px', fontSize: '0.9rem', fontWeight: 'bold' }}>
              Thành viên Vàng
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <Link href="/profile/vouchers" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', textDecoration: 'none', color: 'inherit', display: 'block', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>3</h3>
            <p>Voucher chưa dùng</p>
          </Link>
          <Link href="/cart" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', textDecoration: 'none', color: 'inherit', display: 'block', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>2</h3>
            <p>Sản phẩm giỏ hàng</p>
          </Link>
          <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', textDecoration: 'none', color: 'inherit', display: 'block', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>0</h3>
            <p>Deal đang chờ thanh toán</p>
          </div>
        </div>

        <h3 style={{ marginBottom: '1.5rem' }}>Cài đặt tài khoản</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, background: 'var(--bg-card)', borderRadius: '16px', overflow: 'hidden' }}>
          <li style={{ borderBottom: '1px solid var(--border-light)' }}>
            <button style={{ width: '100%', textAlign: 'left', padding: '1.5rem', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>Lịch sử giao dịch</button>
          </li>
          <li style={{ borderBottom: '1px solid var(--border-light)' }}>
            <button style={{ width: '100%', textAlign: 'left', padding: '1.5rem', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>Sổ địa chỉ</button>
          </li>
          <li>
            <button style={{ width: '100%', textAlign: 'left', padding: '1.5rem', background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', color: '#ff4d4f' }}>Đăng xuất</button>
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
