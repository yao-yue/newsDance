// components/subNewsBranch/index.js
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
    isFolded: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //一个坑：这里如果用箭头函数的话this是满足不了你的要求的！
    toggleText: function(e) {
      // console.log(e.currentTarget.dataset.hi);
      let isFolded = !this.data.isFolded;
      this.setData({
        isFolded
    })
    }
  }
})
