import { formatTime} from '../../utils/api.js';

Page({
  data: {
    mainNewsList: []
  },

  onLoad: function () {
    var that = this;
    wx.cloud.callFunction({
      name: 'mainNewsGet',
      data: {
        a: 1
      }
    }).then(res => {
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
