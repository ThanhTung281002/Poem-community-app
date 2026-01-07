// ========= 1. THƯ VIỆN SỬ DỤNG =======
const express = require('express'); 
const {requireLogin} = require("./../middlewares/auth");
const {findUserByUsername, findUserById, createUser} = require('./../DB/users'); 
const {validateInfo, passwordHash, passwordUnHash} = require('../logic/validate'); 


// ========= 2. APP SỬ DỤNG ===========
const authRoutes = express.Router(); // chỗ mình đặt bom 💣



// ========= 3. CÁC ROUTE THUỘC AUTH ======= 
authRoutes.post('/login', (req, res) => { // 
    console.log("log in"); 

    const {username, password} = req.body; 

    // 1. validate 
    let {validU, validP} = validateInfo(username, password); 
    
    if (!validU || !validP) {
        return; 
    }

    // 2. tìm trong DB
    let user = findUserByUsername(validU); 
    if (!user) {return;}

    // 3. so sánh password
    if (validP === passwordUnHash(user.password)) {

    }

    // 4. nếu đúng thì tạo session 
    // tạo session như thế nào? 
    

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

authRoutes.post('/register', (req, res) => { // đăng kí tài khoản 
    console.log("register"); 

    // lấy dữ liệu từ request 
    const {username, password} = req.body; 

    // 1. validate dữ liệu
    let {validU, validP} = validateInfo(username, password); 
    if (!validU || !validP) {
        return; 
    }

    // 2. hash pasword 
    let hashPass = passwordHash(validP); 

    // 3. insert user 
    createUser(validU, hashPass, 'user'); 

    // 4. gửi phản hồi
    res.json({message: "register success"}); 
    
}); 



module.exports = authRoutes;  










