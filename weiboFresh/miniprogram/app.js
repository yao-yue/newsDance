//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    let userInfo = this.checkAuth();
    let auth = '-1'
    if(userInfo) {
      auth = 0
    }
    this.globalData = {userInfo,auth};
    console.log(this.globalData)
  },

  checkAuth() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              // console.log(res.userInfo)
              return res.userInfo
            }
          })
        }
        else {
          wx.showToast({
            title: "sorry, you don't auth",
            icon: 'none',
            duration: 1000
          })
          return null;
        }
      }
    })
  }
})
