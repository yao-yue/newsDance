// miniprogram/pages/commentDetail/commentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    response: [],
    comment: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.dataPack)
    console.log(JSON.parse(options.dataPack))
    console.log('------------')
    console.log(JSON.parse(options.likeNum))
    let dataPack = JSON.parse(options.dataPack)
    let supLikeNum = JSON.parse(options.likeNum)
    //成功让下一个页面的likeNum也进行更新   三元表达式是为了判断likeLum是否存在为null的时候comment里js传的时候就判为-1了
    dataPack.likeNum = (supLikeNum===-1 ? dataPack.likeNum: supLikeNum);
    this.setData({
      response: dataPack.response,
      comment: dataPack,
    })

    console.log(this.data.comment)
    
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