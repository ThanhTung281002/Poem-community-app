// ========= 1. THƯ VIỆN SỬ DỤNG =======
const express = require('express'); 
const {requireLogin, requireAdmin} = require('./../middlewares/auth')
const {findPoemById, deletePoem, getPendingPoems, approvePoem} = require('./../DB/poem'); 

// ========= 2. APP SỬ DỤNG ===========
const adminRoutes = express.Router(); // chỗ mình đặt bom 💣



// ========= 3. CÁC ROUTE THUỘC ADMIN ======= 
adminRoutes.get('/poems', requireLogin, requireAdmin, async (req, res) => { // lấy dữ liệu 
    // 1. lấy các poem object mà pending // lấy các object poem mà có status là pending 
    let poems = await getPendingPoems(); 

    // 2. trả 200
    res.json({pendingPoems: poems}); 
}); 


adminRoutes.put('/poems/:id', requireLogin, requireAdmin, async (req, res) => { // duyệt cho poem có cùng id từ pending lên approved 
    // 1. lấy id của poems 
    const poemId = req.params.id; 

    // 2. tìm poem by id, nếu không có thì trả 404 
    const searchPoem = await findPoemById(poemId); 
    if (!searchPoem) {
        return res.status(404).json({message: "Poem not found"}); 
    }

    // 3. còn nếu poem đó đã approved rồi thì sao, trả 400 yêu cầu không chuẩn xác 
    if (searchPoem.status === "approved") {
        return res.status(400).json({message: "Poem is already approved"}); 
    }

    // 4. duyệt poem // thêm hàm approvePoem
    await approvePoem(poemId); 

    // 5. trả response, trả 200
    res.json({message: "Poem approved successfully"}); 
}); 


adminRoutes.delete('/poems/:id', requireLogin, requireAdmin, async (req, res) => {
    // 1. lấy id của poems
    const poemId = req.params.id; 

    // 2. tìm poem by id, nếu không có thì trả 404 
    const searchPoem = await findPoemById(poemId); 
    if (!searchPoem) {
        return res.status(404).json({message: "Poem not found"}); 
    }

    // 4. xóa poem đó 
    await deletePoem(poemId); 

    // 5. xóa thành công, trả 200 
    res.json({message: "Poem deleted successfully"}); 

}); 


module.exports = adminRoutes;  

