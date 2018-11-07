// components/catalog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subNews:{
      type: Array,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    open: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openCatalog: function() {
      this.setData({
        open: true
      })
    },
    closeCatalog: function() {
      this.setData({
        open: false
      })
    },
    scrollFind: function(e) {
      //点击后 实现inner页面特定新闻小标题置顶
      let curIndex = e.currentTarget.dataset.hi
      var myEventDetail = {index: curIndex} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('catalog', myEventDetail)
    }
  }
})
