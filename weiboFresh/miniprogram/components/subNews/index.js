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
    topNum: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    test:function(e) {
      console.log(e.currentTarget.dataset.hi)
    },
    scrolltoupper:function(e){
      console.log(e)
      if (e.detail.scrollTop > 100) {
        this.setData({
          floorstatus: true
        });
      } else {
        this.setData({
          floorstatus: false
        });
      }
    },

    goTop: function (e) {  // 一键回到顶部
      this.setData({
        topNum: this.data.topNum = 0
      });
    },
  }
})
