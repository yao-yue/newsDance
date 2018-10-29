//index.js

Page({
    data: {
        msg: '121'
    },
    clickMe: function() {
        console.log('sadsafa')
      },
    checkInfo: function() {
        wx.navigateTo({
            url: ('../myInfo/myInfo')
        }) 
    }
})
