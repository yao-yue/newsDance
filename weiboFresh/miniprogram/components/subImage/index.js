// components/subImage/subImage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imagePack: {
      type: Array,
      value: []
    },
    imageIndex: {
      type: Number,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageDoIsOpen: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 自定义组件ImageDo开关
    // openImageDo: function (e) {
    //   let idx = e.currentTarget.dataset.id
    //   let imageDoIsOpen = !imageDoIsOpen
    //   this.setData({
    //     imageDoIsOpen,
    //     imageIndex: idx
    //   })
    // }

    imgPreview: function(e) {
      let imgUrl = e.currentTarget.dataset.hi
      let imagePack = this.properties.imagePack
      wx.previewImage({
        current: imgUrl, // 当前显示图片的http链接
        urls: imagePack // 需要预览的图片http链接列表
      })
    }
  }
})
