

Page({
  data: {
    mainNewsList: []
  },

  onLoad: function () {
    wx.cloud.callFunction({
      name: 'mainNewsGet',
      data: {
        a: 1
      }
    }).then(res => {
      this.setData({
        mainNewsList: res.result
      })
      console.log(this.data.mainNewsList)
    }).catch(err => {
      console.log(err)
    })
  },
})
