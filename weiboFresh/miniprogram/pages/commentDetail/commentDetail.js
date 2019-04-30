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
    dataPack.likeNum = (supLikeNum === -1 ? dataPack.likeNum : supLikeNum);
    this.setData({
      response: dataPack.response,
      comment: dataPack,
    })

    console.log(this.data.comment)

  },
  onTopLike(e) {
    console.log('触发成功');
    console.log(e.detail);
    let pages = getCurrentPages()
    var currPage = pages[pages.length - 1]; // 当前页面
    var prevPage = pages[pages.length - 2]; // 上一级页面
    prevPage.setData({
      
    });
    prevPage.modifyComments(e.detail.id)
  }
})