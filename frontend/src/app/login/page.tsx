"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
    } else {
      router.push("/");
    }
  };

  return (
    <main style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '1rem' }}>
      <div style={{ background: 'var(--bg-card)', padding: '3rem 2rem', borderRadius: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>DealHub</h1>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Đăng nhập để nhận ưu đãi</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!otpSent ? (
            <input 
              type="tel" 
              placeholder="Nhập số điện thoại..." 
              value={phone} onChange={e => setPhone(e.target.value)}
              required 
              style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontSize: '1.1rem', textAlign: 'center' }}
            />
          ) : (
            <>
              <p style={{ fontSize: '0.9rem', color: 'green' }}>Mã OTP đã gửi đến {phone}</p>
              <input 
                type="text" 
                placeholder="Nhập mã OTP 6 số" 
                required 
                style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)', fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.5rem' }}
                maxLength={6}
              />
            </>
          )}

          <button type="submit" className="btn btn--primary" style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
            {!otpSent ? "Gửi mã OTP" : "Xác nhận Đăng Nhập"}
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
          <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>Hoặc đăng nhập bằng</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--border-light)', background: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Google</button>
            <button style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: 'none', background: '#0068FF', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Zalo</button>
          </div>
        </div>
      </div>
    </main>
  );
}
