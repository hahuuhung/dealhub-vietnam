"use client";

import React, { useState } from "react";

export default function MerchantScannerPage() {
  const [scanned, setScanned] = useState(false);

  const simulateScan = () => {
    setScanned(true);
  };

  const resetScan = () => {
    setScanned(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Quét Mã QR</h1>

      {!scanned ? (
        <div style={{ background: '#111', padding: '2rem', borderRadius: '24px', position: 'relative', overflow: 'hidden', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={simulateScan}>
          <div style={{ width: '250px', height: '250px', border: '4px solid var(--primary)', borderRadius: '16px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary)', boxShadow: '0 0 20px var(--primary)', animation: 'scan 2s infinite linear' }} />
          </div>
          <p style={{ position: 'absolute', bottom: '2rem', color: 'white' }}>Đưa mã QR của khách vào khung hình<br/>(Click để giả lập quét thành công)</p>
          <style>{`
            @keyframes scan {
              0% { top: 0%; }
              50% { top: 100%; }
              100% { top: 0%; }
            }
          `}</style>
        </div>
      ) : (
        <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', padding: '2rem', borderRadius: '24px', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: '#52c41a', marginBottom: '0.5rem' }}>Quét thành công!</h2>
          
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'left', marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '0.5rem' }}><strong>Khách hàng:</strong> Nguyễn Văn A</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Dịch vụ:</strong> Spa VIP 90 Phút</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Mã Voucher:</strong> V-889922</p>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Ngày mua: 20/06/2026</p>
          </div>

          <button onClick={resetScan} className="btn btn--primary" style={{ width: '100%', padding: '1rem' }}>
            Tiếp tục quét
          </button>
        </div>
      )}
    </div>
  );
}
