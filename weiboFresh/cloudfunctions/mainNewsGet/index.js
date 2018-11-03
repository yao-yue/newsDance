// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async () => {
    const mainNewsList = [];
    const mainNews = await db.collection("fresh-mainNews").get();
    for(let i = 0; i < mainNews.data.length; i++) {
      const mainNew = mainNews.data[i];
      let user_id = mainNews.setMan;
      const user = await db.collection('fresh-users').where({
        _id: user_id
      }).get();
      if (user.data.length > 0) {
        mainNew.setMan = user.data[0]
      }
      for (let i = 0; i < mainNew.subNews.length; i++) {
        const subNews = await db.collection("fresh-subNews").where({
          _id: mainNew.subNews[i]
        }).get();
        if (subNews.data.length > 0) {
          mainNew.subNews[i] = subNews.data[0]
        }
      }     
      mainNewsList.push(mainNew);
    }
    return mainNewsList;
}  