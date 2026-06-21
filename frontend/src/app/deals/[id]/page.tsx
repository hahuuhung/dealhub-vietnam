import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DH_DATA } from "@/lib/data";

// Since we are not using 'params' for data fetching yet (using mock data), we just define it to satisfy Next.js page props
export default function DealDetailPage({ params }: { params: { id: string } }) {
  const dealId = params.id;
  const deal = DH_DATA.deals.find((d) => d.id === dealId) || DH_DATA.deals[0];

  const fmtVND = (n: number) => n.toLocaleString("vi-VN") + "₫";

  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem' }}>
        <div className="deal-detail">
          <div className="deal-detail__header" style={{ marginBottom: '2rem' }}>
            <h1>{deal.title}</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem' }}>{deal.biz} - {deal.city}</p>
          </div>
          
          <div className="deal-detail__content" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div className="deal-detail__visual" style={{ flex: '1 1 400px', background: 'var(--bg-card)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', minHeight: '300px' }}>
              {deal.emoji}
            </div>
            
            <div className="deal-detail__info" style={{ flex: '1 1 300px', padding: '1rem', background: 'var(--bg-card)', borderRadius: '16px' }}>
              <div className="price-block" style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>{fmtVND(deal.newPrice)}</span>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-light)', marginLeft: '1rem' }}>{fmtVND(deal.oldPrice)}</span>
              </div>
              
              <div className="stats-block" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span className="tag-chip">⭐ {deal.rating}</span>
                <span className="tag-chip">🔥 Đã bán {deal.sold}</span>
                <span className="tag-chip">⚡ Còn {deal.left}</span>
              </div>
              
              <button className="btn btn--primary" style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }}>
                Mua Ngay
              </button>
              <button className="btn btn--ghost" style={{ width: '100%', padding: '1rem' }}>
                Thêm vào Giỏ Hàng
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
