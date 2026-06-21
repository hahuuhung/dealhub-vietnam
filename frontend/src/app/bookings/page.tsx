import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function BookingsPage() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '4rem 1rem', minHeight: '60vh' }}>
        <h1>Đặt Lịch (Booking)</h1>
        <p style={{ marginTop: '1rem', color: 'var(--text-light)' }}>
          Hệ thống chọn giờ và quản lý đặt lịch đang được triển khai...
        </p>
      </main>
      <Footer />
    </>
  );
}
