// components/catalog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    }
  }
})
