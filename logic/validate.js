/***********************************
 * logic validate cho username và password
 * chỗ mình đặt bom 💣
 */

function validateRegisterInput(username, password) {
    if (!username || !password) return false;
    if (username.length < 3) return false;
    if (password.length < 6) return false;
    return true;
}

function validateLoginInput(username, password) {
    if (!username || !password) {
        return false; 
    } else {
        return true; 
    }
}

function validatePoem(title, content) {
    if (!title || !content) return false;
    if (title.length < 3) return false;
    if (content.length < 10) return false;
    return true;
}

module.exports = {
    validateRegisterInput,
    validateLoginInput,
    validatePoem
};


