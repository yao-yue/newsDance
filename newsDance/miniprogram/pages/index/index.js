//index.js
const app = getApp()

Page({
  datadata: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navData:[
        {
            text: '首页'
        },
        {
            text: '健康'
        },
        {
            text: '情感'
        },
        {
            text: '职场'
        },
        {
            text: '育儿'
        },
        {
            text: '纠纷'
        },
        {
            text: '青葱'
        },
        {
            text: '上课'
        },
        {
            text: '下课'
        }
    ],
    currentTab: 0,
    navScrollLeft: 0
},
})