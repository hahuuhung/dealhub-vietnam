"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NearbyPage() {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasMapKey = mapsApiKey && mapsApiKey !== "AIzaSyPlaceholderKey_DO_NOT_USE_IN_PROD";

  return (
    <>
      <Header />
      <main style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1rem', background: 'var(--bg-card)', zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ fontSize: '1.5rem' }}>Bản Đồ Deal Quanh Đây</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Tìm kiếm ưu đãi trong bán kính 5km</p>
        </div>

        <div style={{ flexGrow: 1, background: '#e5e3df', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!hasMapKey ? (
            <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <h3>Chưa cấu hình Google Maps API</h3>
              <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Vui lòng thêm NEXT_PUBLIC_GOOGLE_MAPS_API_KEY vào file .env.local</p>
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              [ Bản đồ Google Maps Loading... ]
            </div>
          )}
          
          {/* Mock Marker */}
          <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '24px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(255,0,102,0.4)', marginBottom: '0.5rem' }}>
              Spa VIP - 399k
            </div>
            <div style={{ width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid var(--primary)' }}></div>
          </div>
        </div>
      </main>
    </>
  );
}
