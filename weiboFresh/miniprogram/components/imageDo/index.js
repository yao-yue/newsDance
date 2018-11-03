// components/imageDo/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isOpen: {
      type: Boolean,
      value: false
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
    closeImagePage: function (e) {
      let isOpen = this.data.isOpen
      let _isOpen = !isOpen
      this.setData({
        isOpen: _isOpen
      })
    }
  }
})
