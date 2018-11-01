// components/catalog/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    open: {
      type: Boolean,
      value: true
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
    openCatalog: function(e) {
      // let open = !e.currentTarget.dataset.hi;
      this.setData({
        open
      })
      console.log(open);
    }
  }
})
