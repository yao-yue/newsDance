// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
//数据库指令
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let openid = event.openid;
  let username = event.username;
  let avatar = event.avatar;
  let loginStatue = "wait";
  let newSatatue = "no-instruction";
  let queryResult = []

  await db.collection('fresh-users').where({
    _id : _.eq(openid),
  }).get().then(res => {
    loginStatue = "success";
    queryResult = res.data;
    test = res.data.result.username;
  }).catch(err => {
    // loginStatue = "fail"
  })

  
  
  //当查询不到这个openid的用户时，说明用户不存在。这个时候就需要插入这个用户
  if(queryResult.length==0) {
    await db.collection('fresh-users').add({
      data: {
        _id:openid,
        avatar: avatar,
        focusNews: {},
        nickname: username,
      }
    }).then(res => {
      newSatatue = 'insert';
    }).catch(err => {
      newSatatue = 'err'
    })
  }else if(queryResult[0].nickname !== username) {
    //当用户修改了用户名时，这个时候就可以进行更新操作
    await db.collection('fresh-users').doc(openid).update({
      data: {
        nickname: username,
      }
    }).then(res => {
      newSatatue = 'update';
    }).catch(err => {
      newSatatue = 'err'
    })

  }
 
  return {
    loginStatue,
    newSatatue,
    queryResult,
  }
  
}