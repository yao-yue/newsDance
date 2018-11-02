// components/share/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
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
    closeShare: function(e) {
      // console.log(e);
      // console.log(this.data.show)
      let show = this.data.show;
      let _show = !this.data.show;
      this.setData({
        show : _show
      })
    }
  }
})
