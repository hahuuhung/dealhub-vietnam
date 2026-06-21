"use client";

import React, { useState } from "react";

export default function MerchantWalletPage() {
  const [amount, setAmount] = useState("");

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đã gửi yêu cầu rút tiền thành công!");
    setAmount("");
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Ví Tiền & Đối Soát</h1>
      
      <div style={{ background: 'var(--primary)', color: 'white', padding: '2rem', borderRadius: '16px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 20px rgba(255,0,102,0.3)' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'normal' }}>Số Dư Khả Dụng</h3>
          <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>45.000.000₫</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ marginBottom: '0.5rem' }}>Đang chờ đối soát: 5.200.000₫</p>
          <p>Kỳ đối soát tiếp theo: Thứ Hai</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1, background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Rút tiền về ngân hàng</h3>
          <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#f5f7fa', padding: '1rem', borderRadius: '8px', border: '1px solid #eaeaea' }}>
              <p style={{ fontWeight: 'bold' }}>Vietcombank - Chi nhánh HCM</p>
              <p style={{ color: 'var(--text-light)' }}>*** *** 8888</p>
            </div>
            
            <input 
              type="number" 
              placeholder="Nhập số tiền cần rút..." 
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              min="100000"
              style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #eaeaea', fontSize: '1.1rem' }}
            />
            
            <button type="submit" className="btn btn--primary" style={{ padding: '1rem' }}>Yêu cầu rút tiền</button>
          </form>
        </div>

        <div style={{ flex: 1, background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Lịch sử giao dịch</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>Cộng tiền bán Voucher</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Mã: V-889922</p>
              </div>
              <span style={{ color: 'green', fontWeight: 'bold' }}>+399.000₫</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>Cộng tiền bán Voucher</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Mã: V-889921</p>
              </div>
              <span style={{ color: 'green', fontWeight: 'bold' }}>+399.000₫</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
              <div>
                <p style={{ fontWeight: 'bold' }}>Rút tiền (Đã hoàn tất)</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Ngày: 15/06/2026</p>
              </div>
              <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>-10.000.000₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
