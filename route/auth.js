// ========= 1. THƯ VIỆN SỬ DỤNG =======
const express = require('express'); 
const {requireLogin, requireGuest} = require("./../middlewares/auth");
const {findUserByUsername, findUserById, createUser} = require('./../DB/users'); 
const {validateRegisterInput, validateLoginInput} = require('../logic/validate'); 
const {hashPassword, comparePassword} = require('../logic/password'); 

// ========= 2. APP SỬ DỤNG ===========
const authRoutes = express.Router(); // chỗ mình đặt bom 💣



// ========= 3. CÁC ROUTE THUỘC AUTH ======= 
authRoutes.post('/login', requireGuest, async (req, res) => { // 
    console.log("log in"); 

    // 1. lấy dữ liệu từ request 
    const {username, password} = req.body; 

    // 1. validate input là username và password, nếu không thì trả 400, bad request 
    if (!validateLoginInput(username, password)) {
        return res.status(400).json({message: "Invalid username or password"}); 
    }

    // 2. nếu validated thì tìm user có cùng username, không thì 401, sai thông tin 
    let user = await findUserByUsername(username); 
    if (!user) {
        return res.status(401).json({message: "Invalid credentials"}); 
    }

    // 3. nếu có user thì so sánh password, nếu sai thì 401, sai thông tin 
    console.log("password: ", password); 
    console.log("passwordHash: ", user.passwordHash); 
    const isMatch = await comparePassword(password, user.passwordHash);  
    if (!isMatch) {
        return res.status(401).json({message: "Invalid credentials"}); 
    }

    // 4. nếu ok thì gán req.session.user và trả success 
    req.session.user = {
        id: user._id.toString(),
        username: user.username,
        role: user.role
    };

    res.json({message: "You are logged in"}); 

}); 

authRoutes.post('/logout', requireLogin, (req, res) => {
    console.log("log out"); 
    
    // xóa session cho người dùng này 
    req.session.destroy(() => {
        res.json({message: "Logged out"}); 
    }); 

}); 

authRoutes.get('/me', (req, res) => {
    console.log("me"); 

    // phản hồi cho browser về danh tính người dùng gắn với session này
    if (!req.user) {
        return res.json({user: null}); 
    }

    res.json({user: req.user}); 
}); 

authRoutes.post('/register', requireGuest, async (req, res) => { // đăng kí tài khoản 
    console.log("register"); 

    // 1. lấy dữ liệu từ request
    const {username, password} = req.body; 
    console.log("username và password: ", {username, password}); 

    // 2. validate input
    if (!validateRegisterInput(username, password)) {
        return res.status(400).json({message: "missing information"}); 
    }

    // 3. nếu dữ liệu hợp lệ thì tìm trong users bằng username, nếu có thì trả 409  
    let user = await findUserByUsername(username); 
    if (user) {
        return res.status(409).json({message: "User already exist!"}); 
    }

    // 3.5 hash password 
    let passwordHash = await hashPassword(password); console.log("AUTH: hashPass: ", passwordHash); 

    // 4. thêm user vào users
    await createUser({username, passwordHash, role: 'user'}); 

    // 5. báo thành công 
    res.json({message: "Register success"}); 
}); 



module.exports = authRoutes;  










