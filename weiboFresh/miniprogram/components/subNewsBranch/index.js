// components/subNewsBranch/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailNews: {
      type: Array,
      value: []
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
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isFolded: false,
    shareIsOpen: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //一个坑：这里如果用箭头函数的话this也就是toggleText对象,他是调用不了this.setData，故采用function！
    toggleText: function(e) {
      // console.log(e.currentTarget.dataset.hi);
      let isFolded = !this.data.isFolded;
      this.setData({
        isFolded
    })
    console.log("eeeeeeeeeeeeeeeee")
    },
    goDetail: function(e) {
      wx.navigateTo({
        url: '/pages/detail/detail?dataPack='+ JSON.stringify(e.currentTarget.dataset.hi)
        +'&mainTitle='+this.properties.mainTitle + '&mainImg='+this.properties.mainImg 
        +'&mainFocus='+this.properties.mainFocus
      })
    },
    openShare: function (e) {
      let shareIsOpen = true;
      this.setData({
        shareIsOpen
      })
    },
  }
})
