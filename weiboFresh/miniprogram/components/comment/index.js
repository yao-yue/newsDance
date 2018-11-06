// components/comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comments: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    doneList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goCommentDetail: function(e) {
      wx.navigateTo({
        url: '/pages/commentDetail/commentDetail?dataPack='+ JSON.stringify(e.currentTarget.dataset.hi)
      })
    },

    likeAdd: function(e) {
      let id = e.currentTarget.dataset.hi._id;
      let idx = e.currentTarget.dataset.idx;
      console.log(id)
      wx.cloud.callFunction({
        name: 'like',
        data: {
          a: id 
        }
      }).then(res => {   
        for(let i = 0; i< this.data.comments.length; i++)
        {
          if (i == idx) {
            var str = 'comments['+idx+'].likeNum'
            var doneList = 'doneList['+idx+']'
            this.setData({
              [str]:res.result.data.likeNum,
              [doneList]: true
            })
          }
        } 
      }).catch(err => {
        console.log(err)
      })

    }
  }
})
