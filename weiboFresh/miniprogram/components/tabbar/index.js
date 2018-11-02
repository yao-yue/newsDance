const app = getApp();
Component({
  properties: {
    isIndex: { // 是否主页            
      type: Boolean,
      value: false,
    },
    isInner: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    // 这里是一些组件内部数据
    shareIsOpen: false
  },
  methods: {
    // 这里是一个自定义方法
    goHome: (e) => {
      // 判断是否为主页面防止原地跳转
      if(!e.currentTarget.dataset.hi){
        wx.redirectTo({
          url: "/pages/index/index"
        })
      }
    },
    goShare: () => {

    },
    goInfo: (e) => {
        if(e.currentTarget.dataset.hi){
        wx.redirectTo({
          url: "/pages/info/info"
        })
      }else if(e.currentTarget.dataset.in) {
        wx.navigateTo({
          url: "/pages/info/info"
        })
      }
    },
    openShare: function () {
      let shareIsOpen = !shareIsOpen;
      this.setData({
        shareIsOpen
      })
    },
  }
})