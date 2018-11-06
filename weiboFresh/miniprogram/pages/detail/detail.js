// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    topTime: '',
    imgPack: [],
    comments: [],
    fromMan: [],
    mainImg: '',
    mainTitle: '',
    mainFocus:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.dataPack)
    console.log(JSON.parse(options.dataPack))
    let dataPack = JSON.parse(options.dataPack)
    let content = dataPack.content
    let topTime = dataPack.time
    let imgPack = dataPack.image
    let detailId = dataPack._id
    let fromMan = dataPack.fromMan
    let mainTitle = options.mainTitle
    let mainImg = options.mainImg
    let mainFocus = options.mainFocus
    
    wx.cloud.callFunction({
      name: 'commentsGet',
      data: {
        a: detailId
      }
    }).then(res => {
      console.log(res)
      this.setData({
        comments: res.result,
        content,
        topTime,
        imgPack,
        fromMan,
        mainImg,
        mainTitle,
        mainFocus
      })
      console.log(this.data.mainFocus)
    }).catch(err => {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})