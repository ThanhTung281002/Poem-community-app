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

module.exports = {
    validateRegisterInput,
    validateLoginInput
};


