

Page({
  data: {
    mainNewsList: []
  },
  goInner: () => {
    wx.navigateTo({
      url: '/pages/inner/inner'
    })
  },
  onLoad: function () {
    wx.cloud.init();
    wx.cloud.callFunction({
      name: 'mainNewsGet',
      data: {
        a: 1
      }
    }).then(res => {
      this.setData({
        mainNewsList: res.result.data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  http: function() {
    console.log(this.data.mainNewsList);
  }
})
