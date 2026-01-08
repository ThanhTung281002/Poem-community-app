# Poem commnity 
## Ý tưởng và các logic cơ bản của website 
Website mà phục vụ mục đích đăng thơ và trưng bày các bài thơ hay của những người yêu thơ trong cộng đồng, cộng đồng mang tên là Rbut
Có các logic sau: 
1. Có 3 role: admin, user, guest
2. guest thì có quyền xem các bài thờ trong phong duy nhất (có thể mở rộng thêm theo chủ đề sau này). User thì ngoài quyền xem các bài thơ trong phòng trưng bày chung, còn có quyền đăng lên có bài thơ của mình, và chỉnh sửa, xóa các bài thơ, và nếu được admin duyệt thì sẽ được để trên phòng trưng bày chung. Admin thì có quyền xét duyệt các bài thơ mới được thành viên gửi lên. 
3. Thơ có 3 trạng thái draft, pending, approved. 
4. với 3 role thì có 3 khu vực cho 3 vai trò đó, phòng cá nhân, phòng admin và phòng trưng bày chung cho tất cả mọi người


## API route của website 
Các api route (những hành động mà BE logic cho phép đối với người dùng): 
- GET     /api/gallery/poems - tất cả mọi người xem thơ trong phòng triển lãm chung. 


- GET     /api/my/poems - user xem thơ pending của bản thân trong trang cá nhân 
- POST    /api/my/poems - user đăng thơ
- PUT     /api/my/poems:id - user sửa thơ (khi pending)
- DELETE  /api/my/poems:id - user xóa thơ của mình (khi pending)

- GET     /api/admin/poems - admin xem tất cả thơ cần duyệt (pending)
- PUT     /api/admin/poems:id - admin xét duyệt thơ (đổi trạng thái từ pending sang approved)
- DELETE  /api/admin/poems:id - admin xóa thơ không phù hợp 

// bước từ chối thơ của admin thì đồng nghĩa với xóa thơ rồi nên mình gộp chung, vì nếu không duyệt thì thơ sẽ thêm một state nữa là rejected nên phức tạp hơn

- POST    /api/auth/login   -> đăng nhập 
- POST    /api/auth/logout  -> đăng xuất
- GET     /api/auth/me      -> biết "tôi là ai" 

// cái cuối biết tôi là ai đó là gì vậy? Ý nghĩa của nó là gì? Bạn nói nó quan trọng với FE nhưng mình không hiểu quan trọng chỗ nào. 

POST    /api/auth/register -> đăng kí tài khoản thành viên của guest 



## Schema cho cơ sở dữ liệu của website
Có 2 collection: 
1. users:
_id 
username
password_hash
role
createdAt
---
2. poems:
_id 
title
content
authorId
status
createdAt
updatedAt

### Map API route với schema 
- GET     /api/gallery/poems - lấy toàn bộ các poems mà có status approved 

- GET     /api/my/poems - lấy poems mà authorId trùng với userId lúc đó 
- POST    /api/my/poems - đăng một poem mới lên poems nếu đó là user 
- PUT     /api/my/poems:id - chỉnh sửa tile và nội dung (nếu có) cho poems có trùng id 
- DELETE  /api/my/poems:id - giống như trên nhưng thay vì chỉnh thì là xóa cả poem đó 

- GET     /api/admin/poems - lấy poems mà có status pending
- PUT     /api/admin/poems:id - đổi status thành approved của poem trùng id 
- DELETE  /api/admin/poems:id - xóa poem trùng id 

- POST    /api/auth/login   -> tìm user có trùng username và password
- POST    /api/auth/logout  -> bên BE 
- GET     /api/auth/me      -> Bên BE 
- POST    /api/auth/register -> thêm một user vào users collection 



### Cách chạy code 
- git clone sản phẩm về 
- tải nodejs
- chạy node server.js trên commandline 

