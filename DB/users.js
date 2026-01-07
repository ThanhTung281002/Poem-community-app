/*************************
 * nhiệm vụ file này toàn bộ các thao tác với user collection
 * 1. Thêm một user mới vào collection 
 * 2. tìm user bằng username 
 * 3. tìm user bằng id - hình như cái này cho session thì phải 
 * 
 */

const {getUsersCollection} = require('./mongo'); 
const {objectID} = require('mongodb'); 

async function findUserByUsername(username) {
    const users = getUsersCollection(); 

    const user = await users.findOne({username}); // chỗ mình đặt bom 💣

    return user; 
}

async function createUser(username, passwordHash, role) {
    const users = getUsersCollection();

    // tạo ra một document mới. 
    const user = {
        username, 
        passwordHash,
        role, 
        createdAt: new Date()
    }; 

    const result = await users.insertOne(user); 

    return result.insertedId;
}

async function findUserById(id) {
    // lấy collection
    const users = getUsersCollection(); 

    return await users.findOne({_id: new ObjectId(id)}); 
}

module.exports = {
    findUserByUsername,
    findUserById,
    createUser
};