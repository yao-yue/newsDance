// miniprogram/pages/login/login.js
const app = getApp();
Page({


  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid: '-1',
  },

  onLoad: function (options) {
    this.getOpenId()
 // 查看是否授权
 wx.getSetting({
  success(res) {
    if (res.authSetting['scope.userInfo']) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      wx.getUserInfo({
        success(res) {
          console.log(res.userInfo)
        }
      })
    }
    else {
      wx.showToast({
        title: "sorry, you don't auth",
        icon: 'none',
        duration: 1000
      })
    }
  }
})
  },
  cloudLogin(userInfo) {
    //调用login时就直接调用云函数即可
    wx.showLoading({
      title: '登录中...'
    });
    wx.cloud.callFunction({
      // 声明调用的函数名
      name: 'userLogin',
      // data里面存放的数据可以传递给云函数的event  效果：event.a = 1
      data: {
        username: userInfo.username,
        avatar: userInfo.avatar,
        openid: userInfo.openid
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading({})
      if(res.result.loginStatue==='success') {
        app.globalData.auth = 0;
        app.globalData.userInfo = userInfo;
        wx.reLaunch({
          url: '../info/info'
        })
      }
    }).catch(err => {
      console.log(err)
    })
    
  },
  getOpenId() {
    wx.cloud.callFunction({
      name:　'login',
    }).then(res => {
      // console.log(res.result.openid)
      let openid =  res.result.openid
      this.setData({
        openid,
      })
    }).catch(err => {
      console.log(err)
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    if(!e.detail.userInfo) {
      wx.showToast({
        title: "you reject it!",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    let openid = this.data.openid
    let userInfo = {
      username: e.detail.userInfo.nickName,
      avatar: e.detail.userInfo.avatarUrl,
      openid,
    }
    this.cloudLogin(userInfo);
  }
})