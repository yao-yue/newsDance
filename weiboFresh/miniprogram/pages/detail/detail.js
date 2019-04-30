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
    
    wx.showLoading({
      title: '加载中',
    })
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
      wx.hideLoading()
      console.log(this.data.mainFocus)
    }).catch(err => {
      console.log(err)
    })
  },
  modifyComments(id) {
    console.log(id)
    console.log(this.data.comments);
    let comments = this.data.comments;
    console.log('这个函数可以被调用');
    for(let i=0; i<comments.length; i++) {
      console.log(comments[i]._id)
      if(id == comments[i]._id) {
        comments[i].likeNum += 10
        console.log('失效？')
      }
    }
    this.setData({
      comments,
    })
    this.selectComponent("#comment").data.likeNumList = [];
    
  },
  onReady: function() {
    //获得comments组件
    
  }
})