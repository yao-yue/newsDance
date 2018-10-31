Page({
  data: {

  },
  goInner: () => {
    console.log('sdada')
    wx.navigateTo({
      url: '/pages/inner/inner'
    })
  }
})