// 云函数入口文件
const cloud = require('wx-server-sdk')
// 云函数初始化
cloud.init()
//获取数据库句柄
const db = cloud.database()

// 云函数入口函数
exports.main = async () => {
    const mainNewsList = [];
    //向fresh-mainNews集合中获得全部数据、因为数据库里面现在存的数据不多，如果多的话可以设置一个limit以及skip来获取特定数量的数据
    const mainNews = await db.collection("fresh-mainNews").get();  
    for(let i = 0; i < mainNews.data.length; i++) {
      const mainNew = mainNews.data[i];
      let user_id = mainNew.setMan;
      //条件查询 获取特定id的docments
      const user = await db.collection('fresh-users').where({
        _id: user_id
      }).get();
      //限定条件如果有多条，只添加一条进去
      if (user.data.length > 0) {
        mainNew.setMan = user.data[0]
      }
      //这个循环是集合的拼接
      for (let i = 0; i < mainNew.subNews.length; i++) {
        const subNews = await db.collection("fresh-subNews").where({
          _id: mainNew.subNews[i]
        }).get();
        if (subNews.data.length > 0) {
          mainNew.subNews[i] = subNews.data[0]
        }
      }  
      //把拼好的docments挨个放进mainNewsList里面也就是形成了一个全新的融合的数据更为完整的JSON数组   
      mainNewsList.push(mainNew);
    }
    return mainNewsList;
}  