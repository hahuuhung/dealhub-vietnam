"use client";

import React from "react";

export default function MerchantSettingsPage() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đã cập nhật thông tin cửa hàng!");
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Cài đặt Cửa hàng</h1>
      
      <form onSubmit={handleSave} style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#f5f7fa', border: '2px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>+ Đổi Logo</span>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Logo doanh nghiệp</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Định dạng JPG/PNG, kích thước 500x500px.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Tên doanh nghiệp</label>
            <input type="text" defaultValue="Spa VIP 5 Sao" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Số điện thoại Hotline</label>
            <input type="tel" defaultValue="1900 8888" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Mô tả ngắn</label>
          <textarea rows={3} defaultValue="Chuyên cung cấp dịch vụ thư giãn, massage trị liệu hàng đầu." style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }}></textarea>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Địa chỉ kinh doanh</label>
          <input type="text" defaultValue="123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Giờ mở cửa</label>
            <input type="time" defaultValue="09:00" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Giờ đóng cửa</label>
            <input type="time" defaultValue="22:00" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #eaeaea' }} />
          </div>
        </div>

        <div style={{ marginTop: '1rem', borderTop: '1px solid #eaeaea', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn--primary" style={{ padding: '1rem 3rem' }}>Lưu Cài Đặt</button>
        </div>
      </form>
    </div>
  );
}
