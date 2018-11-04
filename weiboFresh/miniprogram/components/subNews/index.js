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
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    detailNews:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    a: function(e) {
      this.setData({
        detailNews: e.currentTarget.dataset.hi
      })
    }
  }
})
