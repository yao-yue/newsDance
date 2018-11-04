// components/subImage/subImage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imagePack: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageDoIsOpen: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openImageDo: function () {
      let imageDoIsOpen = !imageDoIsOpen
      this.setData({
        imageDoIsOpen 
      })
    }
  }
})
