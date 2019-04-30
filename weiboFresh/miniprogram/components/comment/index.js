// components/comment/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comments: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    doneList: [],
    likeNumList: [],
    likeAdd: 10,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goCommentDetail: function (e) {
      wx.navigateTo({
        url: '/pages/commentDetail/commentDetail?dataPack=' + JSON.stringify(e.currentTarget.dataset.hi)
          + '&likeNum=' + JSON.stringify(this.data.likeNumList[e.currentTarget.dataset.idx] || -1)
      })
    },
    addNum() {
      console.log('测试成功');
      let likeNumList = this.data.likeNumList;
      console.log(likeNumList);
      // likeNumList[idx] = (that.data.comments[idx].likeNum + that.data.likeAdd);
      // var doneList = 'doneList[' + idx + ']'
      // that.setData({
      //   likeNumList,
      //   [doneList]: true,
      //   likeAdd: that.data.likeAdd + 10
      // })
    },
    likeAdd: function (e) {
      var that = this;
      let id = e.currentTarget.dataset.hi._id;
      let idx = e.currentTarget.dataset.idx;
      let likeNumList = that.data.likeNumList;
      console.log(id)
      wx.cloud.callFunction({
        name: 'like',
        data: {
          a: id
        }
      }).then(res => {
        //这里提供两种思路：
        // 1. 更改comments里面具体likeNum字段进行刷新
        // 2. 用一个数组来存放更新的数据，如果数字的索引位置被赋值，则页面直接显示这个更新的数字，也是异曲同工之妙。
        //   因为用户关心的是数据的变化，我们可以先把数据的变化产生，至于数据的内部变化让他异步慢慢的去做
        // for(let i = 0; i< that.data.comments.length; i++)
        // {
        //   if (i == idx) {
        //     var str = 'comments['+idx+'].likeNum'
        //     var doneList = 'doneList['+idx+']'
        //     that.setData({
        //       [str]:res.result.data.likeNum,
        //       [doneList]: true,
        //     })
        //     console.log(likeNumList[idx])
        //   }
        // } 

        
      }).catch(err => {
        console.log(err)
      })

      // 性能得到爆炸性的提升！！！ 真是令人开心
      likeNumList[idx] = (that.data.comments[idx].likeNum + that.data.likeAdd);
      var doneList = 'doneList[' + idx + ']'
      that.setData({
        likeNumList,
        [doneList]: true,
        likeAdd: that.data.likeAdd + 10
      })

      //提供给父组件监听
      const myEventDetail = {id : id} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)

    }
  }
})
