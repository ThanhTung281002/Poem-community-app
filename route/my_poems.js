// ========= 1. THƯ VIỆN SỬ DỤNG =======
const express = require('express'); 
const {requireLogin} = require('../middlewares/auth')
const {getPoemsByAuthorId, createPoem, findPoemById, updatePoem, deletePoem} = require('../DB/poem'); 
const {validatePoem} = require('../logic/validate'); 

// ========= 2. APP SỬ DỤNG ===========
const myPoemsRoutes = express.Router(); // chỗ mình đặt bom 💣



// ========= 3. CÁC ROUTE THUỘC POEMS ======= 
myPoemsRoutes.get('', requireLogin, async (req, res) => {
    const authorId = req.user.id; 

    // 1. lấy tất cả các poems mà có status approved
    let poemsByUser = await getPoemsByAuthorId(authorId); 

    // 2. gửi đi các poems đó. status 200, message success. Gửi đi các object đó như thế nào? 
    res.json({poems: poemsByUser}) // gửi đi một mảng các dữ liệu như thế nào? 
}); 


myPoemsRoutes.post('', requireLogin, async (req, res) => { // đăng thơ lên 
    // 1. lấy dữ liệu thơ từ request
    const {title, content} = req.body; 
    const userId = req.user.id; 

    // 1.5 xác nhận dữ liệu thơ hợp lệ, nếu không trả 400 
    if (!validatePoem(title, content)) {
        return res.status(400).json({message: "Invalid poem data"}); 
    }
    
    // 2. Thêm thơ, thêm author lấy từ req.user và status: pending
    await createPoem({title, content, authorId: userId}); 
    // 3. báo thành công, status 201, created 
    res.status(201).json({message: "Poem submitted for review"}); 
}); 


myPoemsRoutes.put('/:id',requireLogin, async (req, res) => {
    // 1. lấy poem id 
    const poemId = req.params.id; 
    const userId = req.user.id; 

    // 2. lấy nội dung thơ
    const {title, content} = req.body; 

    // 2.5 check valid, nếu không thì 400 
    if (!validatePoem(title, content)) {
        return res.status(400).json({message: "Invalid poem data"}); 
    }

    // 3. tìm poem theo id, nếu không có thì 404, not found
    const poem = await findPoemById(poemId); 
    if (!poem) {
        return res.status(404).json({message: "Poem not found"}); 
    }

    // 4. check tác giả bài thơ với người dùng, nếu không khớp thì 403, 
    if (poem.authorId !== userId) {
        return res.status(403).json({message: "You do not have permission to modify this poem"}); 
    }

    // 5. check trạng thái của thơ nếu là approved thì 400
    if (poem.status === "approved") {
        return res.status(400).json({message: "Approved poem can not be modified"}); 
    }

    // 6. update thơ 
    await updatePoem(poemId, {title, content}); 

    // 7. báo thành công, 200 
    res.json({message: "Poem updated successfully!"}); 
}); 

myPoemsRoutes.delete('/:id', requireLogin, async (req, res) => {
    // 1. lấy poem id 
    const poemId = req.params.id; 
    const userId = req.user.id; 

    // 2. check poem id, nếu không có thì 404, not found
    const poem = await findPoemById(poemId); 
    if (!poem) {
        return res.status(404).json({message: "Poem not found"}); 
    }

    // 3. check tác giả bài thơ với người dùng, nếu không khớp thì 403
    if (poem.authorId !== userId) {
        return res.status(403).json({message: "You do not have permission to delete this poem"}); 
    }


    // 4. check trạng thái của thơ, nếu là approved thì 400
    if (poem.status === "approved") {
        return res.status(400).json({message: "Approved poem cannot be modified"}); 
    }

    // 5. xóa thơ
    await deletePoem(poemId); 
    

    // 6. báo thành công, 200 
    res.json({message: "Poem deleted successfully"}); 
}); 



module.exports = myPoemsRoutes;  
