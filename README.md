# Poem Community Backend (Rbut)

Backend cho website cộng đồng thơ – nơi người dùng có thể đăng thơ,
admin duyệt nội dung, và các bài thơ được chọn lọc sẽ được trưng bày công khai.

Dự án tập trung vào:
- tư duy backend thực tế
- phân quyền người dùng
- thiết kế API
- làm việc với MongoDB
- quy trình phát triển backend độc lập với frontend

---

## 1. Mục đích dự án

Mục tiêu của dự án là xây dựng **một backend hoàn chỉnh** cho một website cộng đồng,
trong đó backend chịu trách nhiệm toàn bộ về:

- xác thực người dùng (authentication)
- phân vai trò (authorization)
- xử lý dữ liệu thơ
- kiểm soát quy trình duyệt nội dung
- cung cấp API rõ ràng cho frontend hoặc tester

Dự án **không tập trung vào UI**, mà tập trung vào **logic, kiến trúc và quy trình backend**.

---

## 2. Các vai trò trong hệ thống

### Guest
- xem các bài thơ đã được duyệt (gallery)
- đăng ký tài khoản

### User
- đăng nhập / đăng xuất
- đăng thơ mới (trạng thái `pending`)
- xem danh sách thơ của chính mình
- sửa hoặc xóa thơ của mình (khi chưa được duyệt)

### Admin
- xem danh sách thơ đang chờ duyệt
- duyệt thơ (chuyển từ `pending` → `approved`)
- xóa thơ không phù hợp (kể cả đã được duyệt)

---

## 3. Công nghệ sử dụng

- Node.js
- Express.js
- MongoDB
- express-session (session + cookie)
- bcrypt (hash và so sánh password)
- Postman (test API)

---

## 4. Cấu trúc thư mục
project/
├── server.js # entry point của server
├── route/
│ ├── auth.js # auth routes (login, logout, register, me)
│ ├── my_poems.js # user poem routes
│ ├── admin.js # admin routes
│ └── gallery.js # public gallery routes
├── middlewares/
│ └── auth.js # attachUser, requireLogin, requireAdmin
├── DB/
│ ├── mongo.js # MongoDB connection
│ └── poem.js # toàn bộ logic thao tác với poems collection
├── logic/
│ ├── validate.js # validate input
│ └── password.js # hash / compare password
├── public/ # frontend (sẽ xây dựng sau)
├── .env.example
├── package.json
└── README.md


---

## 5. Cách chạy dự án

### 5.1. Yêu cầu
- Node.js >= 18
- MongoDB (local hoặc MongoDB Atlas)

### 5.2. Cài đặt thư viện

```bash
npm install
```

### 5.3 cấu hình môi trường
Tạo file `.env` dựa trên `.env.example`:
```bash
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 5.4 Chạy server
```bash
npm start
```

Server sẽ chạy tại: 
```bash
http://localhost:3000
```

## 6. API chính (tóm tắt)
### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### User poems
- GET /api/my/poems 
- POST /api/my/poems 
- PUT /api/my/poems/:id
- DELETE /api/my/poems/:id


### Admin
- GET /api/admin/poems
- PUT /api/admin/poems/:id
- DELETE /api/admin/poems/:id


### Public gallery
- GET /api/gallery/poems

## 7. Test API 
Toàn bộ API được test bằng Postman.

Postman Collection được sử dụng để: 

- GET /api/admin/poems
- PUT /api/admin/poems/:id
- DELETE /api/admin/poems/:id


## 8. Ghi chú & hướng phát triển
Dự án hiện tại tập trung vào backend core.
Có thể mở rộng trong tương lai:

- xây dựng frontend (HTML / JS / framework)
- pagination cho gallery
- comment & like cho thơ
- logging middleware
- chuẩn hóa API response format
- deploy lên server thật

Dự án được xây dựng với mục đích học tập và rèn luyện tư duy backend,
không nhằm mục đích thương mại.