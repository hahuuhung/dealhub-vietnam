import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '4rem 1rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '600px', width: '100%' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>Thanh toán thành công!</h1>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Cảm ơn bạn đã mua hàng. Mã voucher đã được gửi vào email và lưu trong tài khoản của bạn.
          </p>
          
          <div style={{ background: 'var(--bg)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-light)' }}>Mã đơn hàng</span>
              <span style={{ fontWeight: 'bold' }}>#DH-98765432</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-light)' }}>Thời gian</span>
              <span style={{ fontWeight: 'bold' }}>21/06/2026 10:45</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-light)' }}>Tổng tiền</span>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>1.298.000₫</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/profile/vouchers" className="btn btn--primary">
              Xem Voucher Ngay
            </Link>
            <Link href="/" className="btn btn--ghost">
              Về Trang Chủ
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
