# Kế hoạch nâng cấp hệ thống Payout tự động (Open Banking / Firm Banking)

## Tổng quan
Ở giai đoạn MVP, quy trình thanh toán (Payout) cho Merchant được thực hiện hoàn toàn thủ công (Kế toán xuất file Excel -> Chuyển khoản -> Admin bấm duyệt "Đã chuyển khoản" trên hệ thống).
Tài liệu này phác thảo lộ trình nâng cấp hệ thống để tự động hóa hoàn toàn quy trình này bằng Open Banking API (Ví dụ: OCB, VietinBank iPay, Momo Business Payout).

## Luồng hoạt động dự kiến (Future State)

1. **Yêu cầu (Request):** 
   - Merchant gửi yêu cầu rút tiền (Ví dụ: 10,000,000 VNĐ).
   - Hệ thống tự động kiểm tra số dư ví khả dụng (Wallet Balance).
   
2. **Xét duyệt (Approval - Optional):**
   - Tùy vào cấu hình rủi ro (Risk settings), hệ thống có thể duyệt tự động 100% nếu số tiền < 50tr VNĐ, hoặc yêu cầu Admin duyệt tay nếu vượt quá hạn mức.

3. **Lệnh chi tiền (Disbursement):**
   - Hệ thống Backend (NestJS) gọi API `Chuyển khoản theo lô (Batch Transfer)` hoặc `Chuyển khoản đơn (Single Transfer)` tới Ngân hàng đối tác.
   - API Request bao gồm: `bank_code`, `account_number`, `amount`, `description`, và chữ ký điện tử (Digital Signature / RSA Key).

4. **Webhook & Đối soát (Reconciliation):**
   - Ngân hàng xử lý giao dịch (Realtime 24/7 qua NAPAS).
   - Ngân hàng gọi ngược Webhook về hệ thống DealHub (Ví dụ: `POST /api/webhooks/payout-callback`).
   - Hệ thống cập nhật trạng thái Payout thành `Completed` hoặc `Failed`, đồng thời gửi thông báo In-app/Email cho Merchant.

## Yêu cầu Kỹ thuật

- **Bảo mật:**
  - Chứng chỉ số (Digital Certificate / mTLS) để giao tiếp hai chiều với Ngân hàng.
  - Mã hóa Payload (JWE/JWS).
  - Giới hạn IP (IP Whitelisting).
- **Database:**
  - Thêm model `PayoutLog` để ghi nhận Request/Response thô với ngân hàng.
  - Lưu mã `Transaction_ID` của ngân hàng trả về để đối soát.

## Các đối tác khả thi
1. **Ví điện tử:** MoMo, ZaloPay (Có API Disbursement rất tốt cho C2B/B2B).
2. **Ngân hàng:** VietinBank, OCB, MBBank (Open Banking API).
3. **Cổng thanh toán:** VNPay, Payoo.
