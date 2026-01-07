/***********************************
 * logic validate cho username và password
 * chỗ mình đặt bom 💣
 */

function validateInfo(username, password) {
    let newU, newP; 
    // coi thử có phải là string hay chưa, và sau đó trim, nếu length lớn hơn 0 thì duyệt. 
    if (typeof username == "string") {
        newU = username.trim();
        newU = (newU.length > 0) ? (newU) : null; 
    } else {
        newU = null; 
    }

    if (typeof password == "string") {
        newP = password.trim();
        newP = (newP.length > 0) ? (newP) : null; 
    } else {
        newP = null; 
    }


    return {newU, newP}; 
}

function passwordHash(password) {
    return password; 
}

function passwordUnhash(password) {
    return password; 
}


module.exports = {
    validateInfo,
    passwordHash, 
    passwordUnHash
}

