
# Messenger Clone

## Giới thiệu

Messenger Clone là một ứng dụng chat thời gian thực tương tự như Facebook Messenger, cho phép người dùng gửi tin nhắn văn bản, hình ảnh và tệp đính kèm. Ứng dụng hỗ trợ tính năng gọi thoại, chuyển giọng nói thành văn bản (voice-to-text), cũng như lưu trữ và quản lý cuộc hội thoại trên cơ sở dữ liệu MongoDB thông qua Prisma ORM.

## Tính năng chính

- **Đăng ký và Đăng nhập:** Người dùng có thể đăng ký tài khoản và đăng nhập thông qua giao diện người dùng thân thiện.
- **Gửi tin nhắn thời gian thực:** Gửi và nhận tin nhắn văn bản ngay lập tức, cho phép người dùng có trải nghiệm trò chuyện nhanh chóng và mượt mà.
- **Chia sẻ tệp đính kèm:** Gửi hình ảnh, video hoặc các loại tệp khác qua cuộc trò chuyện, giúp việc trao đổi thông tin và tài liệu trở nên dễ dàng hơn.
- **Tính năng gọi thoại:** Người dùng có thể thực hiện cuộc gọi thoại miễn phí với bạn bè và gia đình thông qua ứng dụng.
- **Chuyển đổi giọng nói thành văn bản:** Người dùng có thể gửi tin nhắn thoại và ứng dụng sẽ tự động chuyển đổi tin nhắn đó thành văn bản.
- **Quản lý cuộc hội thoại:** Tất cả cuộc trò chuyện sẽ được lưu trữ trên cơ sở dữ liệu MongoDB, với Prisma ORM hỗ trợ quản lý và truy vấn dữ liệu nhanh chóng.
- **Thông báo đẩy:** Nhận thông báo ngay lập tức khi có tin nhắn mới hoặc cuộc gọi đến, đảm bảo người dùng không bỏ lỡ bất kỳ thông tin quan trọng nào.
- **Giao diện thân thiện với người dùng:** Thiết kế đẹp mắt, dễ sử dụng và tương thích với cả thiết bị di động và máy tính để bàn.

## Công nghệ sử dụng

- **Frontend:**
  - React.js
  - HTML/CSS
  - JavaScript (ES6+)
  
- **Backend:**
  - Node.js
  - Express.js
  - Prisma ORM
  - MongoDB
  
- **Giao tiếp thời gian thực:**
  - WebSockets
  - Socket.io

## Hướng dẫn cài đặt và cấu hình

### 1. **Clone dự án từ GitHub:**
   ```bash
   git clone https://github.com/your-username/messenger-clone.git
   cd messenger-clone
   ```

### 2. **Cài đặt các gói phụ thuộc:**
   ```bash
   npm install
   ```

### 3. **Cấu hình biến môi trường:**
   Tạo một tệp `.env` trong thư mục gốc và thiết lập các biến môi trường cần thiết. Ví dụ:
   ```env
   DATABASE_URL=mongodb://localhost:27017/messenger-clone
   JWT_SECRET=chuoi_bi_mat_cua_ban
   ```

### 4. **Chạy ứng dụng:**
   ```bash
   npm start
   ```

### 5. **Truy cập ứng dụng:**
   Mở trình duyệt của bạn và điều hướng đến `http://localhost:3000`.

## Đóng góp

Nếu bạn muốn đóng góp vào dự án này, vui lòng fork repository và tạo một pull request. Bạn cũng có thể mở issue nếu phát hiện bất kỳ lỗi nào hoặc có yêu cầu tính năng mới.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT.
