// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    const subNewsList = [];
    let subNews = event.a;
    for(let i = 0; i < subNews.length; i++) {
        const subNew = subNews[i];
        for(let i = 0; i < subNew.detailNews.length; i++) {
            const detailNews_id = subNew.detailNews[i];
            const detailNews = await db.collection("fresh-detailNews").where({
                _id: detailNews_id
            }).get()
            if(detailNews.data.length > 0) {
                subNew.detailNews[i] = detailNews.data[0]
            }
        }
            for(let i = 0; i < subNew.detailNews.length; i++){
                const user_id = subNew.detailNews[i].fromMan;
                const user = await db.collection('fresh-users').where({
                    _id: user_id
                }).get();
                if(user.data.length > 0) {
                    subNew.detailNews[i].fromMan = user.data[0]
                }
            }
        
        subNewsList.push(subNew)
    }    
    return subNewsList;
}