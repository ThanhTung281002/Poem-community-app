// ======== 1. IMPORT THƯ VIỆN =======
const session = require('express-session');
const express = require('express'); 
const {attachUser} = require('./middlewares/auth')
const authRoutes = require('./route/auth')
const myPoemsRoutes = require('./route/my_poems'); 
const adminRoutes = require('./route/admin'); 
const galleryRoutes = require('./route/gallery'); //console.log("SERVER: galleryRoutes: ", galleryRoutes); 
const {connectDB } = require('./DB/mongo');

// ======== 2. KHỞI TẠO APP =======
const app = express(); 
const PORT = 3000; 


// ======== 3. MIDDLEWARE ========
app.use(express.json()); // xử lí json cho request gửi tới 
app.use(express.static('public')); // đưa tới thư mục public để lấy frontend lúc đầu 
app.use(session({ // sử dụng session (cookie)
    secret: 'rbut-secret',         // sau này đưa vào env
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        httpOnly: true
    }
})); 
app.use(attachUser); // luôn attach user trước khi tới các route 
app.use('/api/auth', authRoutes); // dẫn tới authRoutes khi có api tới đường link /api/auth
app.use('/api/my/poems', myPoemsRoutes); 
app.use('/api/admin', adminRoutes); 
app.use('/api/gallery', galleryRoutes); 



// // ======== CÁC ROUTE GIẢ LẬP ĐỂ TEST MIDDLEWARE ===== 
// // route public
// app.get('/test/public', (req, res) => {
//     res.json({user: req.user}); // trả lại giá trị user mà chính là request user mà đã được gán trong attachUser
// });

// // route cần login 
// app.get('/test/login', requireLogin, (req, res) => {
//     res.json({message: "You are logged in", user: req.user}); 
// }); 

// // route admin
// app.get('/test/admin', requireLogin, requireAdmin, (req, res) => {
//     res.json({message: "Admin access granted", user: req.user}); 
// }); // chỗ mình đặt bom 💣




// // Các route để giả lập login user hoặc admin 
// app.get('/test/login-as-user', (req, res) => {
//     req.session.user = {
//         id: 'u1',
//         username: 'testuser',
//         role: 'user'
//     }

//     res.json({message: "Logged in as user"}); 
// }); 

// app.get('/test/login-as-admin', (req, res) => {
//     req.session.user = {
//         id: 'a1',
//         username: 'testadmin',
//         role: 'admin'
//     }

//     res.json({message: "Logged in as admin"}); 
// }); // chỗ mình đặt bom 💣 

// app.get('/test/logout', (req, res) => {
//     req.session.user = null; 

//     res.json({message: "You are logged out"}); 
// }); 

(async () => {
    await connectDB(); 
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`); 
    });
})(); 
