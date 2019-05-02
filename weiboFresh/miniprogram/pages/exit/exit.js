const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeAccount() {
    wx.showToast({
      title: '暂时没有开发此模块~~',
      icon: 'none',
      duration: 1000
    })
  },
  exit() {
    let auth = app.globalData.auth;
    if(auth === -1) {
      wx.showToast({
        title: '当前已为退出状态',
        icon: 'none',
        duration: 1000
      })
      return ;
    }
    wx.showModal({
      title: '您确定要退出吗',
      // content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          app.globalData.auth = -1;
          app.globalData.userInfo = null;
          wx.reLaunch({
            url: '../info/info',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }


})