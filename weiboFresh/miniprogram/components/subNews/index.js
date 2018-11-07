// components/subNews/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subNews: {
      type: Array,
      value: null
    },
    mainTitle: {
      type: String,
      value: ''
    },
    mainImg: {
      type: String,
      value: ''
    },
    mainFocus: {
      type: Number,
      value: null
    },
    catalogIndex: {
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
    goTop: function (e) {
      console.log('this.data.catalogIndex:'+this.data.catalogIndex)
      const query = wx.createSelectorQuery().in(this)
      query.select(`#the-${this.data.catalogIndex}`).boundingClientRect(function (res) {
        res.top // 这个组件内 #the-id 节点的上边界坐标
        console.log('res.top:'+res.top)
        wx.pageScrollTo({
          scrollTop: res.top,
          duration: 30
        })
        res.top = 0  //重置一下
        console.log('res.top:'+res.top)
      }).exec()
    },
    click: function (e) {
     
    }
    }
  })
