import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DealCard from "@/components/deals/DealCard";
import { DH_DATA } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  const featuredDeals = DH_DATA.deals.filter((d) => d.featured).slice(0, 4);
  const nearbyDeals = [...DH_DATA.deals]
    .sort((a, b) => (a.distance || 99) - (b.distance || 99))
    .slice(0, 8);

  const fmtNum = (n: number) => n.toLocaleString("vi-VN");

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__copy">
              <h1 className="hero__title">
                Deal ngon gần bạn.<br />
                <span className="hero__title-accent">Xem video. Đặt lịch. Mua voucher.</span>
              </h1>
              <p className="hero__sub">
                Nền tảng giao dịch địa phương kết hợp <strong>Deal + Social + Video + Booking</strong>.
                Biến công suất nhàn rỗi thành doanh thu cho doanh nghiệp — tiết kiệm cho người dùng.
              </p>

              <form className="hero__search" role="search">
                <span className="hero__search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Thử: Spa VIP, ăn tối view sông, golf cuối tuần..."
                  aria-label="Tìm deal"
                />
                <button className="btn btn--primary" type="button">Tìm deal</button>
              </form>

              <div className="hero__tags">
                <span className="tag-chip">🔥 Massage</span>
                <span className="tag-chip">🍣 Buffet</span>
                <span className="tag-chip">⛳ Golf</span>
                <span className="tag-chip">🏝️ Resort</span>
                <span className="tag-chip">💉 Khám sức khỏe</span>
                <span className="tag-chip">🎫 Concert</span>
              </div>

              <div className="hero__stats">
                <div className="hero__stat"><strong>{DH_DATA.deals.length}</strong><span>Deal đang mở</span></div>
                <div className="hero__stat"><strong>{DH_DATA.cities.length}</strong><span>Thành phố</span></div>
                <div className="hero__stat"><strong>1,240</strong><span>Đã tiết kiệm (triệu ₫)</span></div>
              </div>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="float-card float-card--1">
                <div className="float-card__img">💆‍♀️</div>
                <div className="float-card__body">
                  <strong>Spa VIP 90 phút</strong>
                  <div className="float-card__price"><s>1.000.000₫</s> <b>399.000₫</b></div>
                  <div className="float-card__meta">⭐ 4.8 · 1.2km · -60%</div>
                </div>
              </div>
              <div className="float-card float-card--2">
                <div className="float-card__img">🍣</div>
                <div className="float-card__body">
                  <strong>Buffet Nhật 80 món</strong>
                  <div className="float-card__price"><s>850.000₫</s> <b>459.000₫</b></div>
                  <div className="float-card__meta">⭐ 4.7 · 3.5km · -46%</div>
                </div>
              </div>
              <div className="live-pill"><span className="dot"></span> {DH_DATA.livestreams.length} đang livestream</div>
            </div>
          </div>
        </section>

        {/* FEATURED DEALS */}
        <section className="section section--alt">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">🔥 Deal nổi bật</h2>
              <span className="section__hint">Cập nhật mỗi 10 phút</span>
            </div>
            <div className="deal-row">
              {featuredDeals.map((d, i) => (
                <DealCard key={d.id} deal={d} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* LIVESTREAM */}
        <section className="section">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">🔴 Livestream đang bán</h2>
              <Link href="/live" className="section__link">Xem tất cả →</Link>
            </div>
            <div className="live-row">
              {DH_DATA.livestreams.map((l) => (
                <Link href={`/live/${l.id}`} key={l.id} className="live-card">
                  <div className="live-card__tag"><span className="dot"></span> LIVE</div>
                  <div className="live-card__viewers">👁 {fmtNum(l.viewers)}</div>
                  <div className="live-card__emoji">{l.emoji}</div>
                  <div className="live-card__title">{l.title}</div>
                  <div className="live-card__biz">{l.biz}</div>
                  <div className="live-card__deal">{l.dealTitle} · <b>{l.dealPrice.toLocaleString("vi-VN")}₫</b></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEARBY DEALS */}
        <section className="section section--alt">
          <div className="container">
            <div className="section__head">
              <h2 className="section__title">📍 Deal gần bạn</h2>
              <div className="sort">
                <button className="sort__btn is-active">Gần nhất</button>
                <button className="sort__btn">Giảm nhiều</button>
                <button className="sort__btn">Đánh giá</button>
                <button className="sort__btn">Giá thấp</button>
              </div>
            </div>
            <div className="deal-grid">
              {nearbyDeals.map((d, i) => (
                <DealCard key={d.id} deal={d} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
