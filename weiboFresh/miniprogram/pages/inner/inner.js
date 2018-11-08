Page({
  data: {
    username: '',
    focusNum: '',
    topImg: '',
    topTitle: '',
    subNews: [],
    catalogIndex: null

  },
  onLoad: function(options) {
    let dataPack = JSON.parse(options.dataPack)
    console.log(dataPack)
    let username = dataPack.name
    let focusNum = dataPack.focusNum
    let topImg = dataPack.imgUrl
    let topTitle = dataPack.title
    let subNews = dataPack.subNews
    wx.showLoading({
      title: '加载中',
    })
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
      console.log(this.data.focusNum)
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
    })
  },
  //绑定组件，从而能够在onCatalog函数中调用组件的函数    页面对->子组件的通信
  onReady:function(){
    this.subNews = this.selectComponent("#subNews");
  },
  onCatalog: function(e) {
    e.detail // 自定义组件触发事件时提供的detail对象
    console.log(e.detail.index)
    this.setData({
      catalogIndex : e.detail.index
    })
    //如果调用频繁，在onReady中声明还是比较好
    // this.subNews = this.selectComponent("#subNews");
    this.subNews.goTop();
  },
})