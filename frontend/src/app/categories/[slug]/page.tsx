"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DealCard from "@/components/deals/DealCard";
import { DH_DATA } from "@/lib/data";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryMap: Record<string, string> = {
    spa: "Spa & Làm đẹp",
    restaurant: "Nhà hàng & Ăn uống",
    travel: "Du lịch & Khách sạn",
    golf: "Golf & Sức khỏe"
  };

  const categoryName = categoryMap[params.slug] || "Danh mục chung";
  
  // Fake filter for demo
  const categoryDeals = DH_DATA.deals;

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{categoryName}</h1>
          <p style={{ color: 'var(--text-light)' }}>Khám phá các deal tốt nhất trong danh mục này</p>
        </div>

        <div className="deal-grid">
          {categoryDeals.map((d, i) => <DealCard key={d.id} deal={d} index={i} />)}
        </div>
      </main>
      <Footer />
    </>
  );
}
