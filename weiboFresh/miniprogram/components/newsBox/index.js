// components/newsBox/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: null
    },
    isOld: {
      type: Boolean,
      value: false
    },
    time: {
      type: String,
      value: null
    },
    focusNum: {
      type: Number,
      value: null
    },
    imgUrl: {
      type: String,
      value: null
    },
    subNews: {
      type: Array,
      value: null
    },
    name: {
      type: String,
      value: null
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    shareIsOpen: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 这里用箭头函数会让this达不到取数据的效果所以还是用function
    goInner: function() {
      wx.navigateTo({
        // 这里avatar转译时老是出错
        url: '../../pages/inner/inner?dataPack='+ JSON.stringify(this.properties)
      })
    },
    openShare: function () {
      let shareIsOpen = !shareIsOpen;
      this.setData({
        shareIsOpen
      })
    },
  },

})
