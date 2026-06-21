"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateDealPage() {
  const router = useRouter();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Deal đã được tạo thành công!");
    router.push("/merchant/deals");
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/merchant/deals" style={{ textDecoration: 'none', color: 'var(--text-light)' }}>← Quay lại</Link>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Tạo Deal Mới</h1>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Basic Info */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Thông tin cơ bản</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Tên Deal (Tiêu đề)</label>
              <input type="text" placeholder="VD: Combo Massage Thái 90 phút" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Danh mục</label>
                <select required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea', background: 'white' }}>
                  <option value="">Chọn danh mục</option>
                  <option value="spa">Spa & Làm đẹp</option>
                  <option value="food">Nhà hàng & Ẩm thực</option>
                  <option value="travel">Du lịch & Nghỉ dưỡng</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Biểu tượng (Emoji)</label>
                <input type="text" placeholder="VD: 💆‍♀️" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Mô tả chi tiết</label>
              <textarea rows={4} placeholder="Mô tả nội dung dịch vụ, điều kiện áp dụng..." style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }}></textarea>
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Giá bán & Số lượng</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Giá gốc (VNĐ)</label>
              <input type="number" placeholder="500000" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary)' }}>Giá khuyến mãi (VNĐ)</label>
              <input type="number" placeholder="299000" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--primary)', background: '#fff2f5' }} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Số lượng Voucher phát hành (Tồn kho)</label>
            <input type="number" placeholder="100" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <Link href="/merchant/deals" className="btn btn--ghost" style={{ background: 'white' }}>Hủy bỏ</Link>
          <button type="submit" className="btn btn--primary" style={{ padding: '1rem 3rem' }}>Lưu Deal</button>
        </div>

      </form>
    </div>
  );
}
