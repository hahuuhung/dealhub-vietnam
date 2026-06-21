"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("vnpay");
  const router = useRouter();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      router.push("/checkout/success");
    }, 1000);
  };

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        <form onSubmit={handleCheckout} style={{ flex: '1 1 60%' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Thanh toán an toàn</h1>
          
          <section style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Phương thức thanh toán</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `1px solid ${paymentMethod === 'vnpay' ? 'var(--primary)' : 'var(--border-light)'}`, borderRadius: '12px', cursor: 'pointer' }}>
                <input type="radio" name="payment" checked={paymentMethod === 'vnpay'} onChange={() => setPaymentMethod('vnpay')} />
                <span style={{ fontWeight: 600 }}>Thanh toán qua VNPay</span>
                <span style={{ marginLeft: 'auto', background: '#005BAA', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>VNPAY</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `1px solid ${paymentMethod === 'momo' ? 'var(--primary)' : 'var(--border-light)'}`, borderRadius: '12px', cursor: 'pointer' }}>
                <input type="radio" name="payment" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} />
                <span style={{ fontWeight: 600 }}>Ví MoMo</span>
                <span style={{ marginLeft: 'auto', background: '#A50064', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>MoMo</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `1px solid ${paymentMethod === 'card' ? 'var(--primary)' : 'var(--border-light)'}`, borderRadius: '12px', cursor: 'pointer' }}>
                <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <span style={{ fontWeight: 600 }}>Thẻ tín dụng / Ghi nợ</span>
                <span style={{ marginLeft: 'auto', background: '#1A1F71', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>VISA</span>
              </label>
            </div>
          </section>

          <section style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Thông tin liên hệ</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input type="text" placeholder="Họ và tên" required style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
              <input type="tel" placeholder="Số điện thoại" required style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
            </div>
            <input type="email" placeholder="Email nhận voucher" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
          </section>
          
          <button type="submit" className="btn btn--primary" style={{ marginTop: '1.5rem', width: '100%', padding: '1.2rem', fontSize: '1.1rem' }}>
            Xác nhận thanh toán
          </button>
        </form>

        <aside style={{ flex: '1 1 30%', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Đơn hàng (2)</h3>
          <div style={{ borderBottom: '1px dashed var(--border-light)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Spa VIP 90 phút (x1)</span>
              <span>399.000₫</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Buffet Tôm Hùm (x1)</span>
              <span>899.000₫</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <input type="text" placeholder="Mã giảm giá" style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
            <button className="btn btn--ghost" style={{ background: 'var(--bg)' }}>Áp dụng</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Tổng thanh toán</span>
            <span style={{ color: 'var(--primary)' }}>1.298.000₫</span>
          </div>
        </aside>

      </main>
      <Footer />
    </>
  );
}
