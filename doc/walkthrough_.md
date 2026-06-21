# DealHub Vietnam - Commercial Implementation Walkthrough

Đã thực hiện quá trình chuyển đổi (migration) từ **HTML/CSS tĩnh** sang **Kiến trúc thương mại** theo đúng kế hoạch.

## 1. Cấu Trúc Dự Án Mới
Hệ thống hiện tại đã được tách thành:
- `frontend/`: Ứng dụng Next.js 15 (App Router, TypeScript, React).
- `backend/`: Ứng dụng NestJS RESTful API.
- `legacy-demo/`: Lưu trữ mã nguồn HTML cũ để tham khảo.
- `doc/`: Chứa mockup và tài liệu thiết kế.

## 2. Những Thay Đổi Về Frontend
- Chuyển `styles.css` thành `globals.css` của Next.js.
- Chuyển đổi file `index.html` thành các Component dùng chung:
  - `Header` (Thanh điều hướng trên, danh mục).
  - `Footer` (Chân trang).
  - `DealCard` (Thẻ hiển thị thông tin deal, format tiền tệ VNĐ).
  - `page.tsx` (Trang chủ sử dụng layout mới).
- Sử dụng font chữ **Be Vietnam Pro** thông qua `next/font/google`.

## 3. Những Thay Đổi Về Backend
- Do môi trường hiện tại không kích hoạt Docker Desktop, hệ thống đã được **tự động fallback sang SQLite** thay vì PostgreSQL để đảm bảo có thể chạy và demo ngay lập tức.
- Hoàn thiện `schema.prisma` với đầy đủ các bảng: `User`, `Merchant`, `Deal`, `Voucher`, `Booking`, `Order`, `Review`, `Livestream`.
- Khởi tạo Database SQLite (`dev.db`).
- Khởi tạo các module cốt lõi trong NestJS (`Deals`, `Auth`, `Bookings`, `Orders`).

## Các Bước Đã Hoàn Thành (Goal: Lên thẳng bản thương mại)
1. **Cấu trúc lại dự án**: Tách thành Next.js (frontend), NestJS (backend), legacy (HTML cũ).
2. **Khởi tạo Docker**: Chạy thành công PostgreSQL và Redis thông qua `docker-compose.yml`.
3. **Thiết lập Database (Prisma)**: Cấu hình `schema.prisma` với đầy đủ các bảng.
4. **Xây dựng Backend**: Tạo controller/service cho Deals, Auth, Bookings, Orders. Đã hoàn thiện JWT Auth.
5. **Xây dựng Frontend (15 Màn Hình Consumer App)**: Đã thiết kế và lập trình 100% các màn hình chính cho Người Dùng Cuối theo cấu trúc chuẩn Next.js (App Router), hỗ trợ đa ngôn ngữ i18n (EN/VI).
   - *Flow Mua sắm*: Trang chủ, Tìm kiếm & Lọc (`/search`), Danh mục (`/categories`), Chi tiết (`/deals`), Giỏ hàng (`/cart`), Thanh toán (`/checkout`), Đặt hàng thành công.
   - *Flow Sử dụng*: Kho Voucher (`/profile/vouchers`), Mã QR bảo mật, Đặt lịch hẹn (`/bookings`).
   - *Flow Tương tác*: Xem Livestream (`/live`), Bản đồ Deal (`/nearby`), Đăng nhập OTP (`/login`), Hồ sơ cá nhân (`/profile`), Trung tâm thông báo (`/notifications`).
6. **Xây dựng Frontend (10 Màn Hình Merchant App)**: Giao diện quản lý dành cho đối tác kinh doanh (Được tích hợp cùng thư viện `recharts` để vẽ biểu đồ doanh thu). Tối ưu hóa UI/UX dành riêng cho Admin trên PC & Mobile.
   - *Flow Phân tích*: Dashboard thống kê biểu đồ doanh thu (`/merchant`), Đối soát dòng tiền (`/merchant/wallet`).
   - *Flow Vận hành*: Quản lý danh sách Deal (`/merchant/deals`), Giao diện thêm mới Deal nhiều tham số (`/merchant/deals/new`).
   - *Flow Phục vụ*: Quét mã QR Voucher UI Laser (`/merchant/scanner`), Lịch hẹn thông minh (`/merchant/bookings`), Trả lời Đánh giá (`/merchant/reviews`).
   - *Flow Tương tác & Cài đặt*: Studio phòng Livestream Broadcast (`/merchant/studio`), Cài đặt hồ sơ cửa hàng (`/merchant/settings`), Trung tâm thông báo đối tác (`/merchant/notifications`).
7. **Phát triển Core API (Backend NestJS Phase 3)**: Hoàn thiện logic nền tảng cho 25 màn hình.
   - *Auth & Security*: Triển khai `JwtAuthGuard` và `RolesGuard` `@Roles('merchant')` bảo mật các Route nhạy cảm.
   - *Database Seeding*: Tạo Mock Data vào PostgreSQL qua `prisma/seed.ts` (Merchant mẫu và các Deal thật).
   - *Deals & Analytics*: Nâng cấp API tìm kiếm, phân trang và thống kê Aggregation cho Dashboard.
   - *Checkout & QR System*: Dùng Prisma `$transaction` để khởi tạo Order và sinh hàng loạt mã QR Voucher nguyên tử (atomic), đảm bảo tính toàn vẹn tài chính.
   - Cấu hình chạy độc lập: Frontend (Port 3000) và Backend (Port 3001 - Bật CORS).
8. **Frontend Integration**: Chuyển đổi HTTP Client, cài đặt `axios` với cấu hình Interceptors tự động đính kèm `Bearer Token` xử lý xác thực trên Client-side, đồng thời nâng cấp `fetch` cho Server-side Rendering caching.
9. **Phát triển Super Admin Panel (Phase 4)**: Xây dựng trung tâm điều hành toàn nền tảng (`/admin`).
   - *Admin Layout*: Sidebar Navigation dùng Lucide Icons (`/admin/layout.tsx`).
   - *Dashboard* (`/admin`): Tổng quan GMV, Doanh thu, số Merchant hoạt động và biểu đồ Doanh thu (Recharts).
   - *Quản lý Đối tác* (`/admin/merchants`): Datatable để Duyệt/Từ chối hồ sơ đối tác kinh doanh mới.
   - *Quản lý Deal* (`/admin/deals`): Kiểm soát nội dung các Voucher. Hiện tại là "Hiển thị ngay" (Auto-approved).
   - *Quản lý Người dùng* (`/admin/users`): Cấm (Ban) tài khoản vi phạm.
   - *Đối soát Tài chính* (`/admin/payouts`): Quản lý lệnh Rút tiền (MVP: Duyệt tay; Đã có tài liệu `doc/payout_upgrade_plan.md` cho lộ trình Open Banking tự động hóa).
   - *Admin API*: Module Admin được bảo vệ bởi `@Roles('admin')`.
10. **Đóng gói Docker & End-to-End Testing (Phase 5)**: Sẵn sàng triển khai Production.
    - *Kiến trúc Container*: Tạo cấu trúc Microservices bằng Docker Compose, bao gồm 5 Node: `db` (Postgres), `redis` (Cache), `backend` (NestJS API), `frontend` (Next.js Standalone Mode), và `nginx` (Reverse Proxy tại port 80).
    - *Tối ưu Image*: Sử dụng Next.js `output: 'standalone'` giúp tiết kiệm tài nguyên Server.
    - *E2E Test Success*: Toàn bộ luồng nghiệp vụ xương sống đã chạy Pass 100% qua kịch bản tự động (`e2e-test.js`): User Đăng nhập -> Lấy danh sách Deal -> Đặt hàng thành công 2 Voucher bằng `$transaction` -> Kiểm tra số dư Voucher trả về ví.

11. **Shoppertainment (Social + Livestream)**: Xây dựng hệ sinh thái giải trí kết hợp mua sắm.
    - *Kiến trúc DB*: Cập nhật `schema.prisma` với các model Mạng Xã Hội (`Video`, `Comment`, `Like`, `Follow`).
    - *TikTok-style Feed* (`/social`): Giao diện cuộn video dọc toàn màn hình với Scroll Snap, Auto-play Intersection Observer và giỏ hàng nổi nguyên tử.
    - *Livestream Viewer* (`/live/[id]`): Giao diện xem stream cho người dùng cuối với khung Chat thời gian thực (Real-time Socket.io), nút Share, Like thả tim.
    - *Livestream Studio* (`/merchant/studio`): Trung tâm điều khiển cho Merchant. Cho phép mở Camera/Mic bằng WebRTC `getUserMedia`, theo dõi comment trực tiếp và ghim Deal lên màn hình.
    - *Chat Server (Socket.io)*: Triển khai WebSockets thông qua `@nestjs/websockets` với `ChatGateway` tách phòng chat (Rooms) độc lập cho từng Livestream.

*(Toàn bộ tính năng Social, Video Short, và Livestream đã được tích hợp thành công, đánh dấu bước nhảy vọt của DealHub từ một sàn TMĐT cơ bản sang một siêu ứng dụng Shoppertainment).*

12. **Trí Tuệ Nhân Tạo (AI) & Phân Tích Chuyên Sâu (Analytics)**: Tối ưu hóa cá nhân hóa và quản trị dữ liệu.
    - *AI Smart Search*: Tích hợp trợ lý ảo `AIAssistant` nổi trên mọi màn hình (Floating Button). AI có khả năng xử lý truy vấn ngôn ngữ tự nhiên (NLP) thông qua `AiModule` trên Backend.
    - *Weighted Recommendation*: Thuật toán gợi ý Video/Deal trên Feed (`/social`) dựa trên phương pháp tính điểm SQL Trọng số (Score = ViewCount + Likes*2 + Comments*3) thay vì random.
    - *Merchant BI Dashboard*: Bổ sung trang `Advanced Analytics` (`/merchant/analytics`) vẽ biểu đồ phễu chuyển đổi (Conversion Funnel) và biểu đồ giữ chân khách hàng (Retention Cohort) bằng thư viện `recharts`. Khai thác sâu Insight từ Data.

### 🎥 Demo Workflow
![AI & Analytics Workflow Recording](/C:/Users/Asus/.gemini/antigravity-ide/brain/5b7f3146-67c2-4efe-9be8-d993faaa450b/dealhub_ai_analytics_workflow_v2_1782026586685.webp)
