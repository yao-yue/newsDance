## &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 首先感谢您的拜访~~<br><br>


### &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;项目效果图：<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;![](https://user-gold-cdn.xitu.io/2018/11/8/166f2faefbf06e10?w=278&h=500&f=gif&s=4789618)

<br>

### 有关这个项目的开发过程的交流
------------------------------------------------------------------------------------
### 掘金文章目录  [地址：https://juejin.im/post/5be3d9036fb9a04a09558740](https://juejin.im/post/5be3d9036fb9a04a09558740)
#### 一、 组件化思想
#### 二、数据库设计 
#### 三、页面构建
#### 四、关于云开发。
#### 五、关于时间格式化。
#### 六、 关于一些很有用但是你可能不知道的小程序技巧
#### 七、 项目最精彩的两个部分
##### 1.点击目录栏页面将相应新闻栏置顶，先看下效果
![](https://user-gold-cdn.xitu.io/2018/11/8/166f2fe2731b3b1b?w=281&h=500&f=gif&s=1017183)
&emsp;&emsp;<br>这个效果非常不错，在这里先对原作者表达一下敬意。内部的构造也是非常巧妙，不同于我们常见的外卖的锚点定位。<br>
我们先来分析一波：<br>
mvvm，视图是由数据驱动的，我们要透过现象看本质，去思考底层的数据，这样我们很快就会有思路:
- 点击目录栏的item项如果绑定了一个data-idx等于循环的索引，可以在e.currentTarget.dataset.idx拿到这个item的索引。
- 我们把这个数据通过组件通信传递到inner页面,然后在由inner页面把数据转交给subNews 
- 并且在inner页面的js中绑定subNews的goTop事件，这样产生了一个catalog组件->inner页面->subNews的关联，数据为item的索引。触发catalog就能够控制subNews组件的移动，是不是还有点绕， ok<br>
<font color=red size=4>show the code:</font><br>
1.catalog/index.wxml
```
<block wx:for="{{subNews}}" wx:for-item="subNewsItem" wx:for-index="idx" wx:key="index">
            <view class="subTitle-item" bind:tap="scrollFind"
    //关键1：绑定item索引
            data-hi="{{idx}}">
 <text>{{subNewsItem.title}}</text>
                </view>
        </block>
```
2. 获得索引，并绑定inner页面
catalog/index.js

```
 scrollFind: function(e) {
      //点击后 实现inner页面特定新闻小标题置顶
      let curIndex = e.currentTarget.dataset.hi
      // 关键2： 与inner页面取得联系
      var myEventDetail = {index: curIndex} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('catalog', myEventDetail)
    }
```
3. inner/inner.js 取得与catalog的通信

```
 onCatalog: function(e) {
    e.detail // 自定义组件触发事件时提供的detail对象
    console.log(e.detail.index)
    //关键:3 把索引存储到data
    this.setData({
      catalogIndex : e.detail.index
    })
    
//关键4: 页面可以通过组件的id取得其页面引用组件的方法
// this.subNews=this.selectComponent("#subNews")
    this.subNews.goTop();
  },
```
4. 给subNews传catalogIndex，并且标上id

```
<subNews ~省略~ catalogIndex="{{catalogIndex}}" id="subNews"></subNews>
```
5. 在subNews中先定义一个图片加载事件，这样在页面加载完成时会触发其绑定的事件，这是来自瀑布流的灵感。可以在图片加载出来的时候触发onImageLoad函数，而在这个函数里我们可以干一些准备的事情。

```
//subNews/index.wxml
//一个看不见的图片，来自瀑布流的灵感，能够产生主动触发的事件
<view style="display:none">
  <image src="{{mainImg}}" bindload="onImageLoad"></image>
</view>
```

```
//subNews/index.js
onImageLoad: function () {
      var that = this
      let offsetList = that.data.offsetList;
      const query = wx.createSelectorQuery().in(this)
//之前讲到过的API获取节点信息，我们把它存储到offsetList偏移量数组，他存储着每一个节点在屏幕的位置，
//配合wx.pageScrollTo可以达到新闻栏置顶的效果
      query.selectAll('.subNews-wrapper').boundingClientRect(function (rects) {
        rects.forEach(function (rect) {
          rect.top     // 节点的上边界坐标
          offsetList.push(rect.top)
          that.setData({
            offsetList,
          })
        })
      }).exec()
    },
```
6. 给标题栏绑定上goTop事件
```
goTop: function (e) {
      var that = this
      let catalogIndex = that.data.catalogIndex;
      //这里offsetList是一个data里面的数据，来保存所有的节点的上边距坐标
      let offsetList = that.data.offsetList;
      wx.pageScrollTo({
            scrollTop: offsetList[catalogIndex],   //滚动到具体数值所在的位置
            duration: 50                          //执行滚动所花的时间
          })
    }
```
至此，你就实现了这个看似简单却非常巧妙的功能，组件->页面->组件。<br>至于为什么要弄一个图片的加载然后触发那个事件呢，这是因为如果你把获取offsetList偏移量数组的函数放在goTop里的话，进入页面第一次的点击会无效，这样产生的体验肯定是非常不舒服的。

##### 2. 点赞优化
先展示一下效果：
![](https://user-gold-cdn.xitu.io/2018/11/8/166f32c2279b902f?w=281&h=503&f=gif&s=640309)
先说一下优化的是什么：点赞效果的延迟极大降低<br>
因为点赞的变化是由用户产生的一个交互，传统的观点就是用户点赞->后端更新数据->前端拉取数据->数据驱动视图的变化。<br>真实的体验就是，非常的慢，慢到点击后2秒才能看到点赞的效果，这种差劲的交互简直就是一场灾难。

- 先给传统的、局部刷新优化的，效果还是很差的一段代码：
```
for(let i = 0; i< that.data.comments.length; i++)
        {
    //当点击该个评论时，只更新这一条数据
          if (i == idx) {
            var str = 'comments['+idx+'].likeNum'
            that.setData({
              [str]:res.result.data.likeNum,
            })
            console.log(likeNumList[idx])
          }
        } 
```
- 优化后：
```
  data: {
    doneList: [],      //是否按下
    likeNumList: [],  //模拟点赞数数组
    likeAdd: 10,      //点赞每次增加数，根据你的设置来，你后端每次加1这里就写1
  },
  
var doneList = 'doneList['+idx+']'
likeNumList[idx] = (that.data.comments[idx].likeNum + that.data.likeAdd);
      that.setData({
        likeNumList,
       [doneList]: true,
        likeAdd: that.data.likeAdd+10
      })
``` 
```
<text class="dianzanNum">{{likeNumList[idx]?likeNumList[idx]:item.likeNum}}</text>
```
优化思路是怎么样的呢？<br>
&emsp;&emsp;用一个数组来存放/模拟更新的数据，如果数字的索引位置被赋值，则页面直接显示这个更新的数字，也是异曲同工之妙。因为用户关心的是数据的变化，我们可以先把数据的变化产生，至于数据后端的变化让他异步慢慢的去做。<br>
&emsp;&emsp;从这里发散思想，是不是评论功能也能够用这样的思路同样去达到极致的速度与交互体验呢。<br>



微博鲜知小程序官方传送门：  <br>
体验真的很不错哦，界面非常简约，大家可以体验一波

![](https://user-gold-cdn.xitu.io/2018/11/8/166f3464dc9cb85f?w=342&h=321&f=png&s=80775)
---------------------------------------------------------------------------------------------
## 关于这个项目的一些与原作的不同：
- 原作中分享页面是canvas画出来的，可以通过接口下载分享。此项目是把分享作为一个组件点击后弹出的一个页面，这样做的好处是响应速度更加快速，用户可以自己截图来实现图片的获得，从而也达到生成海报，可以在朋友圈分享。
- 原作实现了五张图片时最后一张图片有圆角修饰。<br>
- 原作评论@xx会变色，且有对评论的回复显示
- 原作没有点赞功能，本项目中为多展现一些后端方面自主加的点赞功能

