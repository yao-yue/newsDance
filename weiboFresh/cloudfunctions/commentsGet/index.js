// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const commentList = [];
    let detail_id = event.a;
    const comments = await db.collection('fresh-comments').where({
        belongTo: detail_id
    }).get()
    for(let i = 0; i < comments.data.length; i++) {
        const user_id = comments.data[i].fromMan;
        const user = await db.collection('fresh-users').where({
            _id: user_id
        }).get()
        if(user.data.length > 0) {
            comments.data[i].fromMan = user.data[0]
        }
        commentList.push(comments.data[i])
    }
    for(let i = 0; i < commentList.length; i++){
        const comment_id = commentList[i]._id;
        const response = await db.collection('fresh-comments').where({
            belongTo : comment_id
        }).get()
        commentList[i].response = []
        for(let j = 0; j < response.data.length; j++) {
            const user_id = response.data[j].fromMan
            const user = await db.collection('fresh-users').where({
                _id: user_id
            }).get()
            if(user.data.length > 0) {
                response.data[j].fromMan = user.data[0]
            }
            commentList[i].response.push(response.data[j])
        }
    }
    return commentList;
}