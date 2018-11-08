// components/subNews/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subNews: {
      type: Array,
      value: null
    },
    mainTitle: {
      type: String,
      value: ''
    },
    mainImg: {
      type: String,
      value: ''
    },
    mainFocus: {
      type: Number,
      value: null
    },
    catalogIndex: {
      type: Number,
      value: null
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    offsetList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //用图片的加载来实现进入页面就把offsetList列表数据填充，
    // 如果把填充offList放在goTOP里的话 第一次点击会无效 用户体验很差
    onImageLoad: function () {
      var that = this
      let offsetList = that.data.offsetList;
      const query = wx.createSelectorQuery().in(this)
      query.selectAll('.subNews-wrapper').boundingClientRect(function (rects) {
        rects.forEach(function (rect) {
          rect.top     // 节点的上边界坐标
          offsetList.push(rect.top)
          that.setData({
            offsetList,
          })
        })
      }).exec()
    },
    goTop: function (e) {
      var that = this
      let catalogIndex = that.data.catalogIndex;
      //这里offsetList是一个data里面的数据，来保存所有的节点的上边距坐标
      let offsetList = that.data.offsetList;
      wx.pageScrollTo({
            scrollTop: offsetList[catalogIndex],   //滚动到具体数值所在的位置
            duration: 50                          //执行滚动所花的时间
          })
    }
  }
})



// 用查询单个节点的方法
    //这个还是解决不了   上面的查询所有的终于搞定了！ nice
      // query.select(`#the-${this.data.catalogIndex}`).boundingClientRect(function (res) {
      //   res.top // 这个组件内 #the-id 节点的上边界坐标
      //   console.log('这次节点的上边界坐标'+res.top)
      //   console.log('这次下拉实际距离：下拉这次+上次距离'+(res.top+that.data.lastTop))
      //   wx.pageScrollTo({
      //     scrollTop: (res.top+that.data.lastTop) ,
      //     duration: 30
      //   })
      //   that.setData({
      //     lastTop: res.top,
      //     downCount: (that.data.downCount+res.top)
      //   }) 
      //   console.log('统计下拉距离总和：'+that.data.downCount)
      // }).exec()