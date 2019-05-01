
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '../../images/Draven_passive.png',
    username:　'未登录',
  },
  goExit: () => {
    wx.navigateTo({
      url: '/pages/exit/exit'
    })
  },
  click: () => {
    wx.previewImage({
      current: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big119000.jpg', // 当前显示图片的http链接
      urls: ['https://ossweb-img.qq.com/images/lol/web201310/skin/small119001.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/small119004.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/small119002.jpg'] // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo) {
      this.setData({
        avatar : app.globalData.userInfo.avatar,
        username : app.globalData.userInfo.username
      })
    }
    
    // let userInfo = app.global
  },


})