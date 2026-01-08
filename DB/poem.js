/*************************
 * nhiệm vụ file này toàn bộ các thao tác với poems collection
 * 
 * note: nhờ bạn làm theo tiêu chuẩn hiện đại cho mình 
 * 
 */

const {getPoemsCollection} = require('./mongo'); 
const {ObjectId} = require('mongodb'); 



// output là mảng các poems 
async function getApprovedPoems() {
    const poems = getPoemsCollection();

    return await poems
        .find({ status: 'approved' })
        .sort({ createdAt: -1 })
        .toArray();
}




async function createPoem({ title, content, authorId }) {
    const poems = getPoemsCollection();

    const newPoem = {
        title,
        content,
        authorId,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    const result = await poems.insertOne(newPoem);
    return result.insertedId;
}



async function findPoemById(poemId) {
    const poems = getPoemsCollection();

    return await poems.findOne({
        _id: new ObjectId(poemId)
    });
}



// output: modified count, cho biết update có xảy ra hay không? 
async function updatePoem(poemId, { title, content }) {
    const poems = getPoemsCollection();

    const updateData = {
        updatedAt: new Date()
    };

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;

    const result = await poems.updateOne(
        { _id: new ObjectId(poemId) },
        { $set: updateData }
    );

    return result.modifiedCount;
}




async function deletePoem(poemId) {
    const poems = getPoemsCollection();

    const result = await poems.deleteOne({
        _id: new ObjectId(poemId)
    });

    return result.deletedCount;
}


async function getPendingPoems() {
    const poems = getPoemsCollection();

    return await poems
        .find({ status: 'pending' })
        .sort({ createdAt: -1 })
        .toArray();
}


async function approvePoem(poemId) {
    const poems = getPoemsCollection();

    const result = await poems.updateOne(
        {
            _id: new ObjectId(poemId),
            status: 'pending'
        },
        {
            $set: {
                status: 'approved',
                updatedAt: new Date()
            }
        }
    );

    return result.modifiedCount;
}

async function getPoemsByAuthorId(authorId) {
    const poems = getPoemsCollection();

    return await poems
        .find({ authorId: authorId })
        .sort({ createdAt: -1 })
        .toArray();
}


module.exports = {
    getApprovedPoems,
    createPoem,
    findPoemById,
    updatePoem,
    deletePoem,
    getPendingPoems,
    approvePoem,
    getPoemsByAuthorId
};