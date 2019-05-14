// miniprogram/pages/detail/detail.js
const app = getApp();
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
    mainFocus:'',

    //关于评论
    goComment: false,
    mycomment: '',
    detailId: '-1',
    openid: '-1',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.dataPack)
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
    
    console.log('hi')
    console.log(dataPack._id)
    console.log(app.globalData.userInfo)
    let openid = app.globalData.userInfo?app.globalData.userInfo.openid: '-1'
    this.setData({
      detailId,
      openid,
    })
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
        mainFocus,
      })
      wx.hideLoading()
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
    
  },
  commentIt() {
    console.log('hi  you need comment!');
    this.setData({
      goComment: true,
    })
  },
  mycomment(e) {
    console.log(e.detail.value);
    this.setData({
      mycomment: e.detail.value
    })
  },
  submitComment() {
    this.setData({goComment: false});
    let {detailId, openid,mycomment} = this.data;
    //时间这里就不写了  直接写死一个刚刚  以后要弄再弄格式化吧。
    let time= new Date();
    // console.log(time.getHours());
    // console.log(time.getMinutes());
    //调用云函数，形成评论 ，在评论的数据栏再加一个数据
    wx.cloud.callFunction({
      name:　'commentIt',
      data: {
        belongTo: detailId,
        content: mycomment,
        time: '刚刚',
        // fromMan: openid,
      }
    }).then(res => {
      // result = res.result;
      // this.setData({
      //  comments 
      // })
      console.log(res);
      console.log('重新拉取评论数据')
      this.getCommentsAgain();
    }).catch(err => {
      console.log(err)
    })
  },
  getCommentsAgain() {
    let detailId = this.data.detailId;
    wx.cloud.callFunction({
      name: 'commentsGet',
      data: {
        a: detailId
      }
    }).then(res => {
      console.log(res)
      this.setData({
        comments: res.result,
      })
    }).catch(err => {
      console.log(err)
    })
  },
  
})