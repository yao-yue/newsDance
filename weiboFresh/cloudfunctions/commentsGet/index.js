// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const commentList = [];
    let detail_id = event.a;
    const comments = await db.collection('fresh-comments').where({
        _id: detail_id
    }).get()
    return comments;
}