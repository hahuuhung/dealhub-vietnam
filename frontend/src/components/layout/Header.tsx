"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DH_DATA } from "@/lib/data";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Header() {
  const { lang, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setMounted(true);
    setToken(localStorage.getItem('token'));
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/nearby', label: 'Nearby' },
    { href: '/social', label: 'Video Feed' },
    { href: '/bookings', label: 'Bookings' }
  ];

  const categories = [{ id: "all", name: "Tất cả", emoji: "🔥" }, ...DH_DATA.categories];

  return (
    <header className="header" id="header">
      <div className="container header__inner">
        <Link href="/" className="logo" aria-label="DealHub Vietnam">
          <span className="logo__mark">DH</span>
          <span className="logo__text">
            DealHub<span className="logo__accent">.vn</span>
          </span>
        </Link>

        <div className="header__location" id="locationBtn" title="Chọn vị trí">
          <span className="icon">📍</span>
          <span className="header__location-text" id="locationLabel">
            Hồ Chí Minh
          </span>
          <span className="caret">▾</span>
        </div>

        <form className="search" id="searchForm" role="search" autoComplete="off">
          <span className="search__icon" aria-hidden="true">
            🔍
          </span>
          <input
            className="search__input"
            id="searchInput"
            type="text"
            placeholder="Tìm massage, nhà hàng, du lịch, spa..."
            aria-label="Tìm kiếm deal"
          />
          <button className="search__btn" type="submit">
            Tìm
          </button>
        </form>

        <div className="header__actions">
          <button className="icon-btn" id="livestreamNavBtn" title="Livestream" aria-label="Livestream">
            <span className="icon">🔴</span>
            <span className="icon-btn__label">Live</span>
          </button>
          <button className="icon-btn" id="cartBtn" title="Giỏ hàng" aria-label="Giỏ hàng">
            <span className="icon">🛒</span>
            <span className="icon-btn__label">Giỏ</span>
            <span className="badge" id="cartCount">
              0
            </span>
          </button>
          <Link href="/merchant" className="btn btn--ghost" id="bizBtn">
            Doanh nghiệp
          </Link>
          <Link href="/login" className="btn btn--primary" id="loginBtn">
            Đăng nhập
          </Link>
        </div>
      </div>

      <nav className="catnav" aria-label="Danh mục">
        <div className="container catnav__inner" id="catnavInner">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`catnav__item ${activeCategory === c.id ? "is-active" : ""}`}
              onClick={() => setActiveCategory(c.id)}
            >
              <span className="emoji">{c.emoji}</span>
              {c.name}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
