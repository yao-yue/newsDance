Page({
  data: {
    username: null,
    focusNum: null,
    topImg: null,
    topTitle: null,
    subNews: [],

  },
  onLoad: function(options) {
    let dataPack = JSON.parse(options.dataPack)
    console.log(dataPack)
    let username = dataPack.name
    let focusNum = dataPack.focusNum
    let topImg = dataPack.imgUrl
    let topTitle = dataPack.title
    let subNews = dataPack.subNews

    wx.cloud.callFunction({
      name: 'innerResourceGet',
      data: {
        a: subNews
      }
    }).then(res => {
      console.log(res)
      this.setData({
        subNews: res.result,
        topImg,
        topTitle,
        focusNum,
        username
      })
    }).catch(err => {
      console.log(err)
    })
  }
})