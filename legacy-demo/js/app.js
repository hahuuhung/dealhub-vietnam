/* ============================================================
   DealHub Vietnam — App Logic
   Render, search, filter, cart, booking, livestream, biz dashboard
   ============================================================ */

(function () {
  "use strict";

  const DATA = window.DH_DATA;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- State ---------- */
  const state = {
    city: "Hồ Chí Minh",
    query: "",
    activeCategory: "all",
    sort: "distance",
    cart: [], // {dealId, qty}
    bookingDealId: null,
    bookingSlot: null,
    bookingDate: null,
  };

  /* ---------- Helpers ---------- */
  const fmtVND = (n) => n.toLocaleString("vi-VN") + "₫";
  const fmtNum = (n) => n.toLocaleString("vi-VN");
  const discountPct = (oldP, newP) => Math.round((1 - newP / oldP) * 100);

  function dealById(id) {
    return DATA.deals.find((d) => d.id === id);
  }

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => (t.hidden = true), 2200);
  }

  /* ---------- Countdown (FOMO) ---------- */
  function randomEndOffset() {
    // each deal ends in 1-12 hours
    return (dealIndex) => 1 + (dealIndex % 12) + Math.floor(Math.random() * 2);
  }
  const endOffsets = DATA.deals.map((_, i) => Date.now() + (1 + (i % 11)) * 3600 * 1000 + (i * 137) * 1000);

  function fmtCountdown(ms) {
    if (ms <= 0) return "Hết hạn";
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  function tickTimers() {
    $$(".timer-cell").forEach((el) => {
      const idx = parseInt(el.dataset.idx, 10);
      const ms = endOffsets[idx] - Date.now();
      el.textContent = fmtCountdown(ms);
    });
  }

  /* ---------- Render: Category nav strip ---------- */
  function renderCatnav() {
    const wrap = $("#catnavInner");
    const items = [{ id: "all", name: "Tất cả", emoji: "🔥" }, ...DATA.categories];
    wrap.innerHTML = items
      .map(
        (c) => `
      <button class="catnav__item ${state.activeCategory === c.id ? "is-active" : ""}" data-cat="${c.id}">
        <span class="emoji">${c.emoji}</span>${c.name}
      </button>`
      )
      .join("");
    wrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".catnav__item");
      if (!btn) return;
      state.activeCategory = btn.dataset.cat;
      renderCatnav();
      runSearch(state.query, true);
    });
  }

  /* ---------- Render: Category grid ---------- */
  function renderCatgrid() {
    const wrap = $("#catgrid");
    // count deals per category
    const counts = {};
    DATA.deals.forEach((d) => (counts[d.category] = (counts[d.category] || 0) + 1));
    wrap.innerHTML = DATA.categories
      .map(
        (c) => `
      <div class="catcard" data-cat="${c.id}">
        <div class="catcard__icon">${c.emoji}</div>
        <div class="catcard__name">${c.name}</div>
        <div class="catcard__count">${counts[c.id] || 0} deal</div>
      </div>`
      )
      .join("");
    wrap.addEventListener("click", (e) => {
      const card = e.target.closest(".catcard");
      if (!card) return;
      state.activeCategory = card.dataset.cat;
      renderCatnav();
      runSearch("", true);
      $("#allDeals").scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ---------- Render: Deal card ---------- */
  function dealCardHTML(deal, idx) {
    const pct = discountPct(deal.oldPrice, deal.newPrice);
    const dist = deal.distance > 0 ? `${deal.distance}km` : deal.city;
    return `
    <article class="deal-card" data-deal="${deal.id}">
      <div class="deal-card__media">
        <span class="deal-card__badge">-${pct}%</span>
        ${deal.emoji}
        <div class="deal-card__fomo">
          <span>⚡ Còn ${deal.left}</span>
          <span class="timer timer-cell" data-idx="${idx}">--:--:--</span>
        </div>
      </div>
      <div class="deal-card__body">
        <h3 class="deal-card__title">${deal.title}</h3>
        <div class="deal-card__biz">${deal.biz}</div>
        <div class="deal-card__price">
          <span class="new">${fmtVND(deal.newPrice)}</span>
          <span class="old">${fmtVND(deal.oldPrice)}</span>
        </div>
        <div class="deal-card__meta">
          <span class="deal-card__rating"><span class="star">★</span> ${deal.rating} (${fmtNum(deal.reviews)})</span>
          <span class="deal-card__dist">📍 ${dist}</span>
        </div>
        <div class="deal-card__sold">🔥 Đã bán ${fmtNum(deal.sold)}</div>
      </div>
    </article>`;
  }

  function renderFeatured() {
    const featured = DATA.deals.filter((d) => d.featured);
    $("#featuredRow").innerHTML = featured
      .map((d) => {
        const idx = DATA.deals.indexOf(d);
        return dealCardHTML(d, idx);
      })
      .join("");
  }

  function renderNearby() {
    let list = [...DATA.deals].sort((a, b) => (a.distance || 99) - (b.distance || 99));
    $("#nearbyGrid").innerHTML = list
      .map((d) => {
        const idx = DATA.deals.indexOf(d);
        return dealCardHTML(d, idx);
      })
      .join("");
  }

  function sortDeals(list, sort) {
    const arr = [...list];
    switch (sort) {
      case "distance":
        return arr.sort((a, b) => (a.distance || 99) - (b.distance || 99));
      case "discount":
        return arr.sort((a, b) => discountPct(b.oldPrice, b.newPrice) - discountPct(a.oldPrice, a.newPrice));
      case "rating":
        return arr.sort((a, b) => b.rating - a.rating);
      case "price":
        return arr.sort((a, b) => a.newPrice - b.newPrice);
      default:
        return arr;
    }
  }

  function renderRecommended() {
    // simulate personalization: mix categories, prefer high rating + high discount
    const list = [...DATA.deals]
      .sort((a, b) => b.rating + discountPct(b.oldPrice, b.newPrice) / 20 - (a.rating + discountPct(a.oldPrice, a.newPrice) / 20))
      .slice(0, 8);
    $("#recommendedGrid").innerHTML = list
      .map((d) => {
        const idx = DATA.deals.indexOf(d);
        return dealCardHTML(d, idx);
      })
      .join("");
  }

  /* ---------- Render: Livestream ---------- */
  function renderLivestreams() {
    $("#liveRow").innerHTML = DATA.livestreams
      .map(
        (l) => `
      <div class="live-card" data-live="${l.id}">
        <div class="live-card__tag"><span class="dot"></span> LIVE</div>
        <div class="live-card__viewers">👁 ${fmtNum(l.viewers)}</div>
        <div class="live-card__emoji">${l.emoji}</div>
        <div class="live-card__title">${l.title}</div>
        <div class="live-card__biz">${l.biz}</div>
        <div class="live-card__deal">${l.dealTitle} · <b>${fmtVND(l.dealPrice)}</b></div>
      </div>`
      )
      .join("");
  }

  /* ---------- Render: Videos ---------- */
  function renderVideos() {
    $("#videoRow").innerHTML = DATA.videos
      .map(
        (v) => `
      <div class="video-card" data-video="${v.id}">
        <div class="video-card__thumb">
          ${v.emoji}
          <div class="video-card__play">▶</div>
          <div class="video-card__dur">${v.duration}</div>
        </div>
        <div class="video-card__body">
          <div class="video-card__title">${v.title}</div>
          <div class="video-card__author">${v.avatar} ${v.author} · ${v.views} lượt xem</div>
        </div>
      </div>`
      )
      .join("");
  }

  /* ---------- Render: Stats ---------- */
  function renderStats() {
    const totalDeals = DATA.deals.length;
    const totalCities = new Set(DATA.deals.map((d) => d.city)).size;
    const totalSaved = DATA.deals.reduce((s, d) => s + (d.oldPrice - d.newPrice) * d.sold, 0) / 1_000_000;
    animateCount("#statDeals", totalDeals);
    animateCount("#statCities", totalCities);
    animateCount("#statSaved", Math.round(totalSaved));
  }

  function animateCount(sel, target) {
    const el = $(sel);
    if (!el) return;
    const dur = 900;
    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / dur);
      const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = fmtNum(val);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Search & Filter ---------- */
  function runSearch(query, fromCat = false) {
    state.query = query.trim();
    const q = state.query.toLowerCase();
    let list = DATA.deals.filter((d) => {
      const matchQ =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.biz.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      const matchCat = state.activeCategory === "all" || d.category === state.activeCategory;
      return matchQ && matchCat;
    });

    list = sortDeals(list, state.sort);

    const section = $("#allDeals");
    const grid = $("#resultsGrid");
    const empty = $("#emptyState");

    if (q || state.activeCategory !== "all" || fromCat) {
      section.hidden = false;
      const catName = state.activeCategory === "all" ? "" : DATA.categories.find((c) => c.id === state.activeCategory)?.name + " · ";
      $("#resultsTitle").textContent = state.query ? `Kết quả cho "${state.query}"` : catName + "Tất cả deal";
      $("#resultsCount").textContent = `${list.length} deal`;
      renderFilterBar();
      if (list.length === 0) {
        grid.innerHTML = "";
        empty.hidden = false;
      } else {
        empty.hidden = true;
        grid.innerHTML = list
          .map((d) => {
            const idx = DATA.deals.indexOf(d);
            return dealCardHTML(d, idx);
          })
          .join("");
      }
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      section.hidden = true;
    }
    tickTimers();
  }

  function renderFilterBar() {
    const bar = $("#filterBar");
    const sorts = [
      { id: "distance", label: "Gần nhất" },
      { id: "discount", label: "Giảm nhiều" },
      { id: "rating", label: "Đánh giá" },
      { id: "price", label: "Giá thấp" },
    ];
    bar.innerHTML = sorts
      .map(
        (s) => `<button class="filter-chip ${state.sort === s.id ? "is-active" : ""}" data-sort="${s.id}">${s.label}</button>`
      )
      .join("");
  }

  /* ---------- Deal Detail Modal ---------- */
  function openDealDetail(id) {
    const deal = dealById(id);
    if (!deal) return;
    const idx = DATA.deals.indexOf(deal);
    const pct = discountPct(deal.oldPrice, deal.newPrice);
    const save = deal.oldPrice - deal.newPrice;
    const body = $("#dealModalBody");
    body.innerHTML = `
      <div class="detail__hero">
        <span class="detail__badge">-${pct}%</span>
        ${deal.emoji}
      </div>
      <div class="detail__content">
        <div class="detail__biz">${deal.biz} · 📍 ${deal.distance > 0 ? deal.distance + "km" : deal.city}</div>
        <h2 class="detail__title">${deal.title}</h2>
        <div class="detail__rating">
          <span class="star">★</span> <strong>${deal.rating}</strong> (${fmtNum(deal.reviews)} đánh giá)
          · 🔥 ${fmtNum(deal.sold)} đã bán
        </div>
        <div class="detail__pricebox">
          <div>
            <span class="new">${fmtVND(deal.newPrice)}</span>
            <span class="old">${fmtVND(deal.oldPrice)}</span>
          </div>
          <div style="text-align:right">
            <div class="save">Tiết kiệm ${fmtVND(save)}</div>
          </div>
        </div>
        <div class="detail__fomo">
          <div class="fomo-box"><div class="label">Còn lại</div><div class="val">${deal.left}</div></div>
          <div class="fomo-box"><div class="label">Đã bán</div><div class="val">${fmtNum(deal.sold)}</div></div>
          <div class="fomo-box"><div class="label">Kết thúc trong</div><div class="val timer timer-cell" data-idx="${idx}">--:--:--</div></div>
        </div>
        <div class="detail__section">
          <h4>📝 Mô tả</h4>
          <p>${deal.desc}</p>
        </div>
        <div class="detail__section">
          <h4>✨ Điểm nổi bật</h4>
          <ul class="detail__highlights">
            ${deal.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>
        </div>
        <div class="detail__section">
          <h4>🎬 Video review</h4>
          <p>Xem video trải nghiệm thật từ cộng đồng tại mục Video review phía trên.</p>
        </div>
      </div>
      <div class="detail__actions">
        <button class="btn btn--ghost btn--block" id="bookBtn">📅 Đặt lịch</button>
        <button class="btn btn--primary btn--block" id="addCartBtn">🛒 Mua voucher ${fmtVND(deal.newPrice)}</button>
      </div>
    `;
    openModal("#dealModal");
    tickTimers();

    $("#addCartBtn").addEventListener("click", () => addToCart(deal.id));
    $("#bookBtn").addEventListener("click", () => openBooking(deal.id));
  }

  /* ---------- Cart ---------- */
  function addToCart(dealId) {
    const existing = state.cart.find((c) => c.dealId === dealId);
    if (existing) existing.qty += 1;
    else state.cart.push({ dealId, qty: 1 });
    updateCartCount();
    toast("✅ Đã thêm voucher vào giỏ hàng");
    closeModal("#dealModal");
  }

  function updateCartCount() {
    const count = state.cart.reduce((s, c) => s + c.qty, 0);
    $("#cartCount").textContent = count;
    $("#cartCount").style.display = count > 0 ? "grid" : "none";
  }

  function renderCart() {
    const body = $("#cartModalBody");
    if (state.cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon">🛒</div>
          <h3>Giỏ hàng trống</h3>
          <p>Thêm deal yêu thích để bắt đầu tiết kiệm!</p>
        </div>`;
      return;
    }
    const items = state.cart
      .map((c) => {
        const d = dealById(c.dealId);
        return `
        <div class="cart-item" data-deal="${d.id}">
          <div class="cart-item__emoji">${d.emoji}</div>
          <div class="cart-item__info">
            <div class="cart-item__title">${d.title}</div>
            <div class="cart-item__price">${fmtVND(d.newPrice)}</div>
            <div class="cart-item__qty">
              <button class="qty-btn" data-act="dec">−</button>
              <span>${c.qty}</span>
              <button class="qty-btn" data-act="inc">+</button>
            </div>
            <button class="cart-item__remove" data-act="remove">Xóa</button>
          </div>
        </div>`;
      })
      .join("");

    const subtotal = state.cart.reduce((s, c) => {
      const d = dealById(c.dealId);
      return s + d.newPrice * c.qty;
    }, 0);
    const original = state.cart.reduce((s, c) => {
      const d = dealById(c.dealId);
      return s + d.oldPrice * c.qty;
    }, 0);
    const save = original - subtotal;

    body.innerHTML = `
      <div class="cart-body">${items}</div>
      <div class="cart-summary">
        <div class="cart-summary__row"><span>Tạm tính</span><span>${fmtVND(original)}</span></div>
        <div class="cart-summary__row" style="color:var(--c-accent)"><span>Giảm giá</span><span>−${fmtVND(save)}</span></div>
        <div class="cart-summary__row cart-summary__total"><span>Tổng</span><b>${fmtVND(subtotal)}</b></div>
        <button class="btn btn--primary btn--block btn--lg" id="checkoutBtn" style="margin-top:12px">Thanh toán · One-click</button>
      </div>`;
  }

  /* ---------- Booking ---------- */
  function openBooking(dealId) {
    const deal = dealById(dealId);
    if (!deal) return;
    state.bookingDealId = dealId;
    state.bookingSlot = null;
    state.bookingDate = null;
    const today = new Date();
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
    const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30", "20:00"];
    const disabled = [1, 4]; // index of disabled slots

    const body = $("#bookingModalBody");
    body.innerHTML = `
      <div class="booking-body">
        <h3>Đặt lịch</h3>
        <div class="sub">${deal.title}</div>
        <div class="field">
          <label>Chọn ngày</label>
          <div class="slot-grid" id="dateGrid">
            ${dates
        .map((d, i) => {
          const dd = d.getDate();
          const mm = d.getMonth() + 1;
          const wd = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][d.getDay()];
          return `<button class="slot" data-date="${d.toISOString()}">${wd} ${dd}/${mm}</button>`;
        })
        .join("")}
          </div>
        </div>
        <div class="field">
          <label>Chọn giờ</label>
          <div class="slot-grid" id="slotGrid">
            ${slots
        .map(
          (s, i) =>
            `<button class="slot ${disabled.includes(i) ? "is-disabled" : ""}" data-slot="${s}" ${disabled.includes(i) ? "disabled" : ""}>${s}</button>`
        )
        .join("")}
          </div>
        </div>
        <div class="field">
          <label>Họ tên</label>
          <input type="text" id="bookName" placeholder="Nguyễn Văn A" />
        </div>
        <div class="field">
          <label>Số điện thoại</label>
          <input type="tel" id="bookPhone" placeholder="09xx xxx xxx" />
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="confirmBooking">Xác nhận đặt lịch</button>
      </div>`;

    openModal("#bookingModal");
    closeModal("#dealModal");

    body.addEventListener("click", (e) => {
      if (e.target.closest("#dateGrid")) {
        const btn = e.target.closest(".slot");
        if (!btn) return;
        $$("#dateGrid .slot").forEach((s) => s.classList.remove("is-active"));
        btn.classList.add("is-active");
        state.bookingDate = btn.dataset.date;
      }
      if (e.target.closest("#slotGrid")) {
        const btn = e.target.closest(".slot");
        if (!btn || btn.disabled) return;
        $$("#slotGrid .slot").forEach((s) => s.classList.remove("is-active"));
        btn.classList.add("is-active");
        state.bookingSlot = btn.dataset.slot;
      }
    });

    $("#confirmBooking").addEventListener("click", () => {
      if (!state.bookingDate) return toast("Vui lòng chọn ngày");
      if (!state.bookingSlot) return toast("Vui lòng chọn giờ");
      const name = $("#bookName").value.trim();
      const phone = $("#bookPhone").value.trim();
      if (!name) return toast("Vui lòng nhập họ tên");
      if (!phone) return toast("Vui lòng nhập số điện thoại");
      toast(`📅 Đặt lịch thành công! ${name} - ${state.bookingSlot}`);
      closeModal("#bookingModal");
    });
  }

  /* ---------- Business Dashboard ---------- */
  function openBizDashboard() {
    const body = $("#bizModalBody");
    const bars = [40, 65, 50, 80, 72, 95, 88];
    const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    body.innerHTML = `
      <div class="biz-body">
        <h3>Dashboard đối tác</h3>
        <div class="sub">Annam Spa Premium · Hồ Chí Minh</div>
        <div class="biz-stats">
          <div class="biz-stat"><div class="label">Doanh thu tháng</div><div class="val">428.5M₫</div></div>
          <div class="biz-stat"><div class="label">Voucher đã bán</div><div class="val">1.240</div></div>
          <div class="biz-stat"><div class="label">Khách mới</div><div class="val up">+312 ↑</div></div>
          <div class="biz-stat"><div class="label">Tỷ lệ lấp đầy</div><div class="val up">86% ↑</div></div>
        </div>
        <div class="biz-chart">
          <h5>Doanh thu 7 ngày qua</h5>
          <div class="biz-bars">
            ${bars.map((h) => `<i style="height:${h}%"></i>`).join("")}
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:10px;color:var(--c-text-mute)">
            ${days.map((d) => `<span>${d}</span>`).join("")}
          </div>
        </div>
        <div class="biz-tools">
          <div class="biz-tool"><span class="ic">⚡</span><div><strong>Tạo deal mới</strong><div style="color:var(--c-text-mute);font-size:11px">Tạo voucher trong 2 phút</div></div></div>
          <div class="biz-tool"><span class="ic">🔴</span><div><strong>Livestream bán hàng</strong><div style="color:var(--c-text-mute);font-size:11px">Bán trực tiếp, tương tác khách</div></div></div>
          <div class="biz-tool"><span class="ic">🤖</span><div><strong>AI gợi ý khách hàng</strong><div style="color:var(--c-text-mute);font-size:11px">Tìm khách tiềm năng theo hành vi</div></div></div>
          <div class="biz-tool"><span class="ic">📊</span><div><strong>Báo cáo & dữ liệu</strong><div style="color:var(--c-text-mute);font-size:11px">Lưu lượng, chuyển đổi, retention</div></div></div>
          <div class="biz-tool"><span class="ic">📢</span><div><strong>Chạy quảng cáo</strong><div style="color:var(--c-text-mute);font-size:11px">Target theo vị trí & sở thích</div></div></div>
        </div>
      </div>`;
    openModal("#bizModal");
  }

  /* ---------- Modal helpers ---------- */
  function openModal(sel) {
    const m = $(sel);
    m.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal(sel) {
    const m = $(sel);
    m.hidden = true;
    if (!$$(".modal:not([hidden])").length) document.body.style.overflow = "";
  }
  function closeAllModals() {
    $$(".modal").forEach((m) => (m.hidden = true));
    document.body.style.overflow = "";
  }

  /* ---------- Event wiring ---------- */
  function wireEvents() {
    // Search forms
    $("#searchForm").addEventListener("submit", (e) => {
      e.preventDefault();
      runSearch($("#searchInput").value);
    });
    $("#heroSearchForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = $("#heroSearchInput").value;
      $("#searchInput").value = v;
      runSearch(v);
    });

    // Hero tags
    $("#heroTags").addEventListener("click", (e) => {
      const chip = e.target.closest(".tag-chip");
      if (!chip) return;
      const word = chip.textContent.replace(/^[^\s]+\s/, "").trim();
      $("#searchInput").value = word;
      $("#heroSearchInput").value = word;
      runSearch(word);
    });

    // Location
    $("#locationBtn").addEventListener("click", () => {
      const idx = DATA.cities.indexOf(state.city);
      state.city = DATA.cities[(idx + 1) % DATA.cities.length];
      $("#locationLabel").textContent = state.city;
      toast(`📍 Đã chuyển đến ${state.city}`);
    });

    // Cart
    $("#cartBtn").addEventListener("click", () => {
      renderCart();
      openModal("#cartModal");
    });

    // Cart interactions (delegated, persistent modal body)
    $("#cartModalBody").addEventListener("click", (e) => {
      const item = e.target.closest(".cart-item");
      if (item) {
        const dealId = item.dataset.deal;
        const c = state.cart.find((x) => x.dealId === dealId);
        if (!c) return;
        if (e.target.dataset.act === "inc") c.qty += 1;
        if (e.target.dataset.act === "dec") c.qty = Math.max(1, c.qty - 1);
        if (e.target.dataset.act === "remove") state.cart = state.cart.filter((x) => x.dealId !== dealId);
        updateCartCount();
        renderCart();
        return;
      }
      if (e.target.closest("#checkoutBtn")) {
        toast("🎉 Thanh toán thành công! Voucher đã gửi vào app.");
        state.cart = [];
        updateCartCount();
        closeModal("#cartModal");
      }
    });

    // Booking interactions (delegated, persistent modal body)
    $("#bookingModalBody").addEventListener("click", (e) => {
      if (e.target.closest("#dateGrid")) {
        const btn = e.target.closest(".slot");
        if (!btn) return;
        $$("#dateGrid .slot").forEach((s) => s.classList.remove("is-active"));
        btn.classList.add("is-active");
        state.bookingDate = btn.dataset.date;
        return;
      }
      if (e.target.closest("#slotGrid")) {
        const btn = e.target.closest(".slot");
        if (!btn || btn.disabled) return;
        $$("#slotGrid .slot").forEach((s) => s.classList.remove("is-active"));
        btn.classList.add("is-active");
        state.bookingSlot = btn.dataset.slot;
        return;
      }
      if (e.target.closest("#confirmBooking")) {
        if (!state.bookingDate) return toast("Vui lòng chọn ngày");
        if (!state.bookingSlot) return toast("Vui lòng chọn giờ");
        const name = $("#bookName").value.trim();
        const phone = $("#bookPhone").value.trim();
        if (!name) return toast("Vui lòng nhập họ tên");
        if (!phone) return toast("Vui lòng nhập số điện thoại");
        toast(`📅 Đặt lịch thành công! ${name} - ${state.bookingSlot}`);
        closeModal("#bookingModal");
      }
    });

    // Livestream nav
    $("#livestreamNavBtn").addEventListener("click", () => {
      $("#liveSection").scrollIntoView({ behavior: "smooth" });
    });

    // Business
    $("#bizBtn").addEventListener("click", openBizDashboard);
    $("#bizDemoBtn").addEventListener("click", openBizDashboard);
    $("#bizJoinBtn").addEventListener("click", () => toast("🎉 Cảm ơn! Team DealHub sẽ liên hệ bạn trong 24h."));

    // Login
    $("#loginBtn").addEventListener("click", () => toast("🔐 Đăng nhập bằng SMS / Email / Google (demo)"));

    // Sort bar (nearby)
    $("#sortBar").addEventListener("click", (e) => {
      const btn = e.target.closest(".sort__btn");
      if (!btn) return;
      state.sort = btn.dataset.sort;
      $$("#sortBar .sort__btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const list = sortDeals(DATA.deals, state.sort);
      $("#nearbyGrid").innerHTML = list
        .map((d) => {
          const idx = DATA.deals.indexOf(d);
          return dealCardHTML(d, idx);
        })
        .join("");
      tickTimers();
    });

    // Filter bar (search results)
    $("#filterBar").addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      state.sort = chip.dataset.sort;
      runSearch(state.query, true);
    });

    // Clear filters
    $("#clearFilters").addEventListener("click", () => {
      state.query = "";
      state.activeCategory = "all";
      state.sort = "distance";
      $("#searchInput").value = "";
      $("#heroSearchInput").value = "";
      renderCatnav();
      $("#allDeals").hidden = true;
    });

    // Deal card click (event delegation on main)
    document.querySelector("main").addEventListener("click", (e) => {
      const card = e.target.closest(".deal-card");
      if (card) {
        openDealDetail(card.dataset.deal);
        return;
      }
      const live = e.target.closest(".live-card");
      if (live) {
        toast("🔴 Đang vào phòng livestream... (demo)");
        return;
      }
      const video = e.target.closest(".video-card");
      if (video) {
        toast("▶ Đang phát video review... (demo)");
        return;
      }
    });

    // Modal close (delegation)
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) {
        const modal = e.target.closest(".modal");
        if (modal) closeModal("#" + modal.id);
      }
    });

    // ESC to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllModals();
    });

    // See all live
    $("#seeAllLive").addEventListener("click", (e) => {
      e.preventDefault();
      toast("🔴 Có 12 phiên livestream đang hoạt động (demo)");
    });
  }

  /* ---------- Init ---------- */
  function init() {
    renderCatnav();
    renderCatgrid();
    renderFeatured();
    renderLivestreams();
    renderNearby();
    renderVideos();
    renderRecommended();
    renderStats();
    wireEvents();
    updateCartCount();
    tickTimers();
    setInterval(tickTimers, 1000);
  }

  document.addEventListener("DOMContentLoaded", init);
})();