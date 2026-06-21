import React from "react";
import Link from "next/link";

export default function DealCard({ deal, index }: { deal: any; index: number }) {
  const discountPct = Math.round((1 - deal.newPrice / deal.oldPrice) * 100);
  const dist = deal.distance > 0 ? `${deal.distance}km` : deal.city;

  const fmtVND = (n: number) => n.toLocaleString("vi-VN") + "₫";
  const fmtNum = (n: number) => n.toLocaleString("vi-VN");

  return (
    <Link href={`/deals/${deal.id}`} className="deal-card" prefetch={false}>
      <div className="deal-card__media">
        <span className="deal-card__badge">-{discountPct}%</span>
        {deal.emoji}
        <div className="deal-card__fomo">
          <span>⚡ Còn {deal.left}</span>
          <span className="timer">02:15:30</span> {/* Static for now */}
        </div>
      </div>
      <div className="deal-card__body">
        <h3 className="deal-card__title">{deal.title}</h3>
        <div className="deal-card__biz">{deal.biz}</div>
        <div className="deal-card__price">
          <span className="new">{fmtVND(deal.newPrice)}</span>
          <span className="old">{fmtVND(deal.oldPrice)}</span>
        </div>
        <div className="deal-card__meta">
          <span className="deal-card__rating">
            <span className="star">★</span> {deal.rating} ({fmtNum(deal.reviews)})
          </span>
          <span className="deal-card__dist">📍 {dist}</span>
        </div>
        <div className="deal-card__sold">🔥 Đã bán {fmtNum(deal.sold)}</div>
      </div>
    </Link>
  );
}
