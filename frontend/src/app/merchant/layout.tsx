"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MerchantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { name: "Tổng quan", path: "/merchant", icon: "📊" },
    { name: "Quản lý Deal", path: "/merchant/deals", icon: "🏷️" },
    { name: "Lịch hẹn", path: "/merchant/bookings", icon: "📅" },
    { name: "Quét QR Voucher", path: "/merchant/scanner", icon: "📱" },
    { name: "Phòng Livestream", path: "/merchant/studio", icon: "🎥" },
    { name: "Đánh giá", path: "/merchant/reviews", icon: "⭐" },
    { name: "Ví tiền", path: "/merchant/wallet", icon: "💰" },
    { name: "Cài đặt Cửa hàng", path: "/merchant/settings", icon: "⚙️" },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f5f7fa', color: '#333' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'white', borderRight: '1px solid #eaeaea', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #eaeaea' }}>
          <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.5rem' }}>DealHub <span style={{ color: '#000', fontSize: '1rem', fontWeight: 'normal' }}>Merchant</span></h2>
        </div>
        
        <nav style={{ flexGrow: 1, padding: '1rem 0', overflowY: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menu.map(item => {
              const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== "/merchant");
              return (
                <li key={item.path}>
                  <Link href={item.path} style={{ 
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1.5rem', 
                    textDecoration: 'none', color: isActive ? 'var(--primary)' : '#666',
                    background: isActive ? '#fff2f5' : 'transparent', borderRight: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                    fontWeight: isActive ? 'bold' : 'normal'
                  }}>
                    <span>{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div style={{ padding: '1.5rem', borderTop: '1px solid #eaeaea' }}>
          <Link href="/" style={{ display: 'block', textDecoration: 'none', color: '#666', fontSize: '0.9rem' }}>← Về trang khách hàng</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Header */}
        <header style={{ height: '70px', background: 'white', borderBottom: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Cửa hàng: Spa VIP 5 Sao</span>
            <span style={{ background: '#e6f7ff', color: '#005BAA', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Đang mở cửa</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/merchant/notifications" style={{ textDecoration: 'none', fontSize: '1.5rem', position: 'relative' }}>
              🔔
              <span style={{ position: 'absolute', top: 0, right: 0, background: 'var(--primary)', width: '10px', height: '10px', borderRadius: '50%' }}></span>
            </Link>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
              M
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main style={{ flexGrow: 1, overflowY: 'auto', padding: '2rem' }}>
          {children}
        </main>
      </div>

    </div>
  );
}
