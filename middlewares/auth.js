function attachUser(req, res, next) {
    if (req.session.user) {
        req.user = req.session.user; 
    } else {
        req.user = null; 
    }

    next(); 
}

function requireLogin(req, res, next) {
    if (!req.user) { // không đăng nhập
        return res.status(401).json({message: "Login required"}); 
    } 

    next(); 
}

function requireAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({message: "Admin only"}); 
    }
    
    next(); 
}


module.exports = {
    attachUser,
    requireLogin, 
    requireAdmin
}; 