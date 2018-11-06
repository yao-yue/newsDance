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
      value:null
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goTop: function(e) {
        // 控制滚动
        wx.pageScrollTo({
          scrollTop: .offsetTop,
          duration: 300
        })
    },
  }
})
