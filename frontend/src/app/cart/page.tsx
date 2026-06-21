"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DH_DATA } from "@/lib/data";
import Link from "next/link";

export default function CartPage() {
  // Simulate cart with the first 2 deals
  const [cartItems, setCartItems] = useState(DH_DATA.deals.slice(0, 2).map(d => ({ ...d, qty: 1 })));
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.newPrice * item.qty), 0);
  const fmtVND = (n: number) => n.toLocaleString("vi-VN") + "₫";

  const updateQty = (id: string, delta: number) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1 1 60%' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Giỏ hàng của bạn</h1>
          
          {cartItems.length === 0 ? (
            <p>Giỏ hàng trống. <Link href="/" style={{ color: 'var(--primary)' }}>Tiếp tục mua sắm</Link></p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: '16px', marginBottom: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '3rem' }}>{item.emoji}</div>
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.1rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{item.biz}</p>
                  <div style={{ fontWeight: 'bold', color: 'var(--primary)', marginTop: '0.5rem' }}>{fmtVND(item.newPrice)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', border: '1px solid var(--border-light)', borderRadius: '8px', overflow: 'hidden' }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ padding: '0.5rem 1rem', background: 'transparent' }}>-</button>
                    <span style={{ padding: '0.5rem', minWidth: '40px', textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ padding: '0.5rem 1rem', background: 'transparent' }}>+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} style={{ color: '#ff4d4f', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem' }}>🗑</button>
                </div>
              </div>
            ))
          )}
        </div>

        <aside style={{ flex: '1 1 30%', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Tóm tắt đơn hàng</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-light)' }}>Tạm tính</span>
            <span>{fmtVND(subtotal)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ color: 'var(--text-light)' }}>Giảm giá</span>
            <span>0₫</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Tổng cộng</span>
            <span style={{ color: 'var(--primary)' }}>{fmtVND(subtotal)}</span>
          </div>
          
          <Link href="/checkout" className="btn btn--primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
            Tiến hành Thanh toán
          </Link>
        </aside>

      </main>
      <Footer />
    </>
  );
}
