/*****************************
 * nhiệm vụ file:
 * 1. kết nối mongoDB một lần 
 * 2. export object mongoDB 
 * 
 */



// Gắn thư viện
require('dotenv').config(); 
const {MongoClient} = require("mongodb"); 


// Gán link tới cơ sở dữ liệu và gán client gắn tới link đó
const uri = process.env.MONGODB_URI; console.log("connection string: ", uri); 
if (!uri) {
    throw new Error("MONGODB_URI not defined"); 
}
const client = new MongoClient(uri); 


let db; // gì đây 

// Kết nối 
async function connectDB() {
    if (!db) {
        await client.connect(); 
        db = client.db("poem_community_app"); // tên database
        console.log("MongoDB connected"); 
    } 

    return db; 
}

function getUsersCollection() {
    if (!db) {
        throw new Error("DB not connected"); 
    }

    return db.collection("users"); 
}

function getPoemsCollection() {
    if (!db) {
        throw new Error("DB not connected"); 
    }

    return db.collection("poems"); 
}


module.exports = {
    connectDB,
    getUsersCollection,
    getPoemsCollection
};