"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DealCard from "@/components/deals/DealCard";
import { DH_DATA } from "@/lib/data";

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState(1000000);
  const [rating, setRating] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDeals = DH_DATA.deals.filter(d => 
    d.newPrice <= priceRange &&
    d.rating >= rating &&
    (d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     d.biz.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem', display: 'flex', gap: '2rem' }}>
        
        {/* Left Sidebar Filter */}
        <aside style={{ width: '250px', flexShrink: 0, background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1rem' }}>Bộ Lọc (Filters)</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Khoảng giá (Max)</label>
            <input 
              type="range" 
              min="0" max="5000000" step="100000"
              value={priceRange} 
              onChange={e => setPriceRange(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ marginTop: '0.5rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
              Dưới {priceRange.toLocaleString()}₫
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Đánh giá (Min)</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[3, 4, 4.5, 5].map(r => (
                <button 
                  key={r}
                  onClick={() => setRating(r)}
                  style={{ 
                    padding: '0.3rem 0.6rem', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border-light)',
                    background: rating === r ? 'var(--primary)' : 'transparent',
                    color: rating === r ? '#fff' : 'inherit',
                    cursor: 'pointer'
                  }}
                >
                  {r}+ ⭐
                </button>
              ))}
            </div>
          </div>

          <button className="btn btn--primary" style={{ width: '100%' }}>Áp dụng</button>
        </aside>

        {/* Main Content Area */}
        <div style={{ flexGrow: 1 }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '1.8rem' }}>Kết quả tìm kiếm</h1>
            <input 
              type="text" 
              placeholder="Tìm tên deal, doanh nghiệp..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', width: '300px' }}
            />
          </div>

          <div className="deal-grid">
            {filteredDeals.length > 0 ? (
              filteredDeals.map((d, i) => <DealCard key={d.id} deal={d} index={i} />)
            ) : (
              <p style={{ color: 'var(--text-light)' }}>Không tìm thấy deal phù hợp.</p>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
