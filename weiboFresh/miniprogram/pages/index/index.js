import { formatTime} from '../../utils/api.js';

Page({
  data: {
    mainNewsList: []
  },

  onLoad: function () {
    var that = this;
    wx.showLoading({
      title: '拼命加载中...'
    })
    wx.cloud.callFunction({
      // 声明调用的函数名
      name: 'mainNewsGet',
      // data里面存放的数据可以传递给云函数的event  效果：event.a = 1
      data: {
        //这里的参数可以拿来做分页
        a: 1
      }
    }).then(res => {
      wx.hideLoading({});
      that.setData({
        mainNewsList: res.result
      })
      //时间格式化
      let mainNewsList = that.data.mainNewsList
      for(let i =0; i < mainNewsList.length;i++) {
        let time = formatTime(mainNewsList[i].time)
        var str = 'mainNewsList['+i+'].time' 
        that.setData({
          [str]:time
        }) 
    }
      console.log(this.data.mainNewsList)
    }).catch(err => {
      console.log(err)
    })
    
    
  },
    
})
