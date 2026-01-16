# FRONTEND CỦA WEBSITE CỘNG ĐỒNG THƠ
## các trang cần dùng đối với từng role
### guest
Guest thì mình nghĩ là có những gì có thể làm là coi thơ ở phòng trưng bày chung, đăng kí tài khoản nếu là chưa là thành viên và đăng nhập để làm thành viên. 

- /                - Trang trưng bày chung 
- /login           - trang đăng nhập 
- /register        - trang đăng kí 


### users
User thì mình nghĩ là có thể xem tất cả thơ của bản thân, cả những bài chờ duyệt và đã duyệt. Và tạo thơ mới và có một trang profile nhỏ. Mình chưa hiểu trang profile để làm gì lắm (để coi các thông tin cá nhân sao?)

/my-poems          - Trang xem các bài thơ của người dùng đăng lên, có thể xóa và chỉnh sửa ở đây 
/my-poems/new      - Trang để người dùng đăng bài thơ mới 

### admin
Admin thì mình chỉ thấy có một việc đó là duyệt thơ thôi. Mình chưa hình dung nhiều về cách admin vào thì sẽ thấy gì và làm gì? Các website hiện đại mà giống mình thì admin sẽ thấy gì và cần làm gì

- /admin/poems      - trang để admin duyệt thơ 

> note:
> Trang là từng role sẽ thấy gì và được làm gì? Còn làm gì thì đã được code cẩn thân ở phần api, đó là sự khác nhau giữa api và trang. 



## MAPPING giữa trang và API 

### Guest 
| Page | API | Method | Purpose |
|-----|-----|--------|--------|
| / | /api/gallery/poems | GET | Lấy danh sách thơ đã được duyệt |
| /login | /api/auth/login | POST | Đăng nhập |
| /register | /api/auth/register | POST | Đăng ký tài khoản |


### User 
### User

| Page | API | Method | Purpose |
|-----|-----|--------|--------|
| /my-poems | /api/my/poems | GET | Lấy toàn bộ thơ của user |
| /my-poems/:id | /api/my/poems/:id | PUT | Sửa thơ (pending) |
| /my-poems/:id | /api/my/poems/:id | DELETE | Xóa thơ (pending) |
| /my-poems/new | /api/my/poems | POST | Gửi thơ mới |


### Admin

| Page | API | Method | Purpose |
|-----|-----|--------|--------|
| /admin/poems | /api/admin/poems | GET | Lấy danh sách thơ chờ duyệt |
| /admin/poems/:id | /api/admin/poems/:id | PUT | Duyệt thơ |
| /admin/poems/:id | /api/admin/poems/:id | DELETE | Xóa thơ |


> Note:
> - Page chỉ chịu trách nhiệm hiển thị và điều phối UI
> - API chịu trách nhiệm xử lý logic và phân quyền
> - Mọi kiểm tra quyền (login, role) đều được enforce ở backend


## Cấu trúc file 
> sẽ dựa theo cấu trúc file ở trên để tạo trang 

public/
│
├── index.html          # gallery (/)
├── login.html          # /login
├── register.html       # /register
│
├── my-poems.html       # /my-poems
├── my-poem-new.html    # /my-poems/new
│
├── admin-poems.html    # /admin/poems
│
├── css/
│   └── main.css        # CSS dùng chung (rất ít)
│
├── js/
│   ├── api.js          # hàm fetch API
│   ├── auth.js         # login / logout / me
│   ├── gallery.js      # logic cho index.html
│   ├── my-poems.js     # logic cho my-poems.html
│   ├── my-poems-new.js # logic cho my-poems-new.html
│   └── admin-poems.js  # logic cho admin-poems.html
│
└── assets/
|    └── logo.png
