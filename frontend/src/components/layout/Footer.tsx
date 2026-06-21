import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <div className="logo logo--light">
            <span className="logo__mark">DH</span>
            <span className="logo__text">
              DealHub<span className="logo__accent">.vn</span>
            </span>
          </div>
          <p>
            Nền tảng giao dịch địa phương: Groupon + Foody + TikTok + Booking cho thị trường Việt Nam.
          </p>
        </div>
        <div className="footer__col">
          <h4>Người dùng</h4>
          <Link href="/nearby">Deal gần tôi</Link>
          <Link href="/profile/vouchers">Voucher của tôi</Link>
          <Link href="/videos">Video review</Link>
          <Link href="/live">Livestream</Link>
        </div>
        <div className="footer__col">
          <h4>Doanh nghiệp</h4>
          <Link href="/merchant/register">Đăng ký đối tác</Link>
          <Link href="/merchant/deals/new">Tạo deal</Link>
          <Link href="/merchant/live">Livestream bán hàng</Link>
          <Link href="/merchant/analytics">Báo cáo & AI</Link>
        </div>
        <div className="footer__col">
          <h4>Danh mục</h4>
          <Link href="/categories/travel">Du lịch</Link>
          <Link href="/categories/restaurant">Nhà hàng</Link>
          <Link href="/categories/spa">Spa & Làm đẹp</Link>
          <Link href="/categories/golf">Golf · Sức khỏe · Sự kiện</Link>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>© 2026 DealHub Vietnam — Thương mại.</span>
          <span>Mô hình: Deal + Social + Video + Booking</span>
        </div>
      </div>
    </footer>
  );
}
