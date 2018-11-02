// components/newsBox/index.js
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
    shareIsOpen: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goInner: () => {
      wx.navigateTo({
        url: '../../pages/inner/inner'
      })
    },
    openShare: function (e) {
      let shareIsOpen = !e.currentTarget.dataset.hi;
      this.setData({
        shareIsOpen
      })
    },
  },

})
