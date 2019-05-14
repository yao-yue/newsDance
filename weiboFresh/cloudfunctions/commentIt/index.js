// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
//数据库指令
const _ = db.command

// 云函数入口函数

//评论 doc：
// belongTo
// content
// fromMan
// likeNum
// time


exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID;
  let detailId = event.belongTo;
  let time = event.time;
  let comment = event.content;

  let result = {};
  await db.collection('fresh-comments').add({
    data: {
      belongTo: detailId,
      fromMan: openid,
      likeNum: 0,
      time,
      content: comment
    }
  }).then(res => {
    result = res.result;
    }).catch(err => {
      // console.log(err);
    })

  return {
    result
  }
}