# LOG 


## 2026-01-16 11h16 
- [ ] Hoàn thành 

### Context
- Mục tiêu hiện tại: hoàn thiện luồng người dùng cho sản phẩm website cuối cùng. 
- Suy nghĩ về luồng người dùng, redirect. 
- Và tạo một chút thay đổi về trang index cho user và admin. 

### Đã làm
- Đã hoàn thành toàn bộ các tính năng cơ bản cho các role với api thật gắn tới server. 

### Đang kẹt / dở
- Luồng người dùng thì sẽ nhìn như thế nào? Làm trong phần init lúc load phải không? 

### Hướng làm tiếp
- Làm luồng người dùng cho trang 
---

## 2026-01-15 6h56pm 
- [x] Hoàn thành 

### Context
- Mục tiêu hiện tại: ghép FE và BE bằng cách thay api thật vào cách hàm api đã dựng lên cho guest. 
- Đang làm ở file register.js

### Đã làm
- Đã làm xong phần api thật kết nói với trang index.html và trang login.html. 

### Đang kẹt / dở
- Làm dở cho register.html 
- Kẹt là làm theo chatGPT nhưng không suy nghĩ nhiều nên chưa hình dung được và tự làm lại được, mắc lỗi này vì quên đi mục đích mà HA và SERE và R dạy. 
- Phần kẹt vì chỉ biết làm mà không nghĩ là try ... catch của async và api. 

### Hướng làm tiếp
- Code api thật vào cho trang register.html trong khi nhớ kĩ mục đích của mình khi làm là gì? 

---



## 2026-01-15 12h00 
- [x] Hoàn thành 

### Context
- Mục tiêu hiện tại: làm fake api và các trạng thái delay loading của các trang cho guest. 
### Đã làm
- Toàn bộ các hành vi cơ bản và fake API cho user và admin. 

### Đang kẹt / dở
- Fake api và delay cho guest. 

### Hướng làm tiếp
- làm fake api và delay cho guest. 

---

## 2026-01-15 10h34 
- [x] Hoàn thành

### Context
- Mục tiêu hiện tại: làm UI động cho các trang giao diện của admin. 
- Việc đang làm: hành vi giao diện và các tác vụ server như get poems, duyệt poems, xóa poems. Chưa có delay. 
- đang làm ở file admin-poems.js 

### Đã làm
- chưa 

### Đang kẹt / dở

### Hướng làm tiếp

---

## 2026-01-14 22:40 
- [x] Hoàn thành 

### Context
- Mục tiêu hiện tại: làm UI động cho các trang giao diện của user
- Việc đang làm: hành vi của giao diện khi các tác vụ với server như get poems, chỉnh sửa poem, thêm poem bị delay thì giao diện phải ở trạng thái loading như thế nào? 

- đang làm ở file my-poems.js 

### Đã làm
- Đã hoàn thành hành vi xem, chỉnh sửa, xóa, và thêm thơ. 

### Đang kẹt / dở
- Đang gặp lỗi ở delay của tác vụ gửi api delete tới server. Nguyên nhân là có quá nhiều code ở trong file và chưa phân tầng rõ ràng trong code. Đã phân tầng rõ ràng trong tư duy, từ cao xuống thấp: event handler, controller, render + API. 

### Hướng làm tiếp
- phân tách lớp cho code trong file my-poems.js 



---
## Ngày giờ
- [ ] Hoàn thành 

### Context

### Đã làm

### Đang kẹt / dở

### Hướng làm tiếp

---