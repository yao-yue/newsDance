Page({
  data: {
    username: null,
    focusNum: null,
    topImg: null,
    topTitle: null
  },
  onLoad: function(options) {
    let dataPack = JSON.parse(options.dataPack)
    console.log(dataPack)
    let username = dataPack.nickname
    let focusNum = dataPack.focusNum
    let topImg = dataPack.imgUrl
    let topTitle = dataPack.title
    let subNews = dataPack.subNews
  }
})