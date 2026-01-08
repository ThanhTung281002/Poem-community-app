// ========= 1. THƯ VIỆN SỬ DỤNG =======
const express = require('express'); 
const {getApprovedPoems} = require('../DB/poem'); 

// ========= 2. APP SỬ DỤNG ===========
const galleryRoutes = express.Router(); // chỗ mình đặt bom 💣



// ========= 3. CÁC ROUTE THUỘC GALLERY ======= 
galleryRoutes.get('/poems', async (req, res) => {
    console.log("ROUTE: vào gallery route"); 

    // 1. lấy toàn bộ các thơ approved 
    const approvedPoems = await getApprovedPoems(); 

    // 2. gửi và trả 200
    res.json({poems: approvedPoems}); 
});


module.exports = galleryRoutes;  
