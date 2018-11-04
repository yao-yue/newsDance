// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    top_time: null,
    imgPack: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.dataPack)
    console.log(JSON.parse(options.dataPack))
    let dataPack = JSON.parse(options.dataPack)
    let content = dataPack.content
    let top_time = dataPack.time
    let imgPack = dataPack.image
    let detailId = dataPack._id
    
    wx.cloud.callFunction({
      name: 'commentsGet',
      data: {
        a: detailId
      }
    }).then(res => {
      console.log(res)
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