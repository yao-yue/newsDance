/**
 * 
 * 声明：
 *    这个组件是为了实现点击一张图片后，可以显示页面并且长按能够下载
 *    以及发送给朋友。
 *    
 *    但是后来发现了小程序官方文档里的一个API，推荐使用
 *    链接：https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html
 *    简介：
 *    wx.previewImage(Object object)
 *    在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
 * 
 * 
 * 
 */



// components/imageDo/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isOpen: {
      type: Boolean,
      value: false
    },
    imagePack: {
      type: Array,
      value: []
    },
    imageIndex: {
      type: Number,
      value: null
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
    },
    swiperChange: function(e) {
      // let left = e.detail.
      // let right = e.detail.scrollRight
      console.log(e.detail.current)
      this.setData({
        imageIndex: e.detail.current
      })
    },
    longPressImg: function(e) {

    }
  }
})
