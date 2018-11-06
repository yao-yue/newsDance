// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    let comment_id = event.a;
    await db.collection('fresh-comments').doc(comment_id).update({
        data: {
            likeNum: _.inc(10)
        }
    })
    let _comment = db.collection('fresh-comments').doc(comment_id).get()
    return _comment;
}