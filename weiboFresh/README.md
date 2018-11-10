## &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 首先感谢您的拜访~~

### &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;项目效果图：
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;![Image text](https://happybirdwe.github.io/newsDance/%E5%BE%AE%E5%8D%9A%E9%B2%9C%E7%9F%A5_spec/weiboFreshGif/alll.gif)

<br>

###有关这个项目的开发过程的交流
------------------------------------------------------------------------------------
### 一、 组件化思想
开发一个完整的小程序时，我们应该先分析其内部的结构。重复的结构抽离出来作为组件，组件非常的灵活，可以嵌入一个页面或多个页面。<br>

&emsp;&emsp;在上面的gif图中我们可以看到首页的内容是一个个的新闻块。
虽然这个新闻块只在首页中使用到，但是我还是把它抽离成了一个组件。这样做的好处是页面结构将会更加的清晰，并且耦合度降低，比如想换个主界面风格时，你可以直接换另一个组件添加进来。<br>

&emsp;&emsp;还有新闻内部页面中，有多个小标题，每个小标题里面嵌入了不等数量的新闻。如果不是采用组件化的话，到时候inner页面的wxml结构就会乱成一锅粥。所以这里的建议是尽量组件化分离开来。<br>
对于组件很陌生可以先看我的之前的这篇文章 [组件化开发tabbar](https://juejin.im/post/5bd80604f265da0ae5055fd2)<br>
下面是项目的页面与组件目录：
![](https://user-gold-cdn.xitu.io/2018/11/8/166f21e8b6d032fc?w=251&h=266&f=png&s=17116)
![](https://user-gold-cdn.xitu.io/2018/11/8/166f21ff9ce487c0?w=252&h=151&f=png&s=9170)

### 二、数据库设计 
既然是“全栈”，后端肯定要搞搞。后端的核心就是数据。那么我们就先把数据库分析一下。这里我是这样分析的，
- 从页面获得字段，
- 然后再理解数据间的关联，如一对多，一对一。

这里我构建了5个集合
> fresh-mainNews      主页新闻集合<br>
subNews字段是一个数列，存储着fresh-subNews Doc的_id，这样就将这两个集合绑定了起来，在后面我们会讲到在云函数中把这两个集合融合起来返回一个新的数据变得完整一些的集合。<br>

有人可能会问，云数据库不是noSQL吗，为什么不把所有数据全部整合到一个全部的JSON,那样就可以只调用一次JSON。<br>

我的理解是：<br>
&emsp;&emsp;我们查询只是需要查询我们想要的数据，不需要的数据可以等需要的时候再根据关联去请求。
比如这个项目中的首页新闻块，每一个新闻块内部都关联着大量的子新闻，第一次加载就全部把这个小程序需要的所有数据都加载出来就有点疯狂了。

![](https://user-gold-cdn.xitu.io/2018/11/8/166f23b8da342b28?w=865&h=304&f=png&s=30532)


- fresh-subNews        &emsp; &emsp; 内部页面新闻小标题集合
- fresh-comments         &emsp; &emsp;评论集合
- fresh-detailNews       &emsp; &emsp;详细新闻集合
- fresh-users            &emsp; &emsp; &emsp; &emsp;用户集合<br>
[这里查看更多的数据库信息](https://github.com/HappyBirdwe/newsDance/tree/master/%E5%BE%AE%E5%8D%9A%E9%B2%9C%E7%9F%A5_spec/%E6%95%B0%E6%8D%AE%E5%BA%93%E5%86%85%E5%AE%B9)

### 三、页面构建
&emsp;&emsp;讲到这里就该说页面的构建了。页面可以想象成一个架子，一个承载数据的容器。页面通上数据，就变得活起来。MVVM，数据驱动视图。交互靠数据，组件间的通信，组件与页面间的通信都是数据。<br>&emsp;&emsp;{{}} -> 就像是流浪法师大招神奇的传送门。后面会将给出一个精彩的组件通信例子（点击目录如何实现标题栏置顶）。

### 四、关于云开发。
云开发三大核心：<br>
**云函数**：通俗的理解就是你写的函数在云端运行，可以把复杂的业务逻辑放在云函数里<br>
**数据库**：一个既可在小程序前端操作，也能在云函数中读写的 JSON 数据库<br>
**存储**：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理，可以上传照片下载照片，或者一些其他文件。<br>
在这里详细介绍一下操作云函数提取数据库的流程,
这里我们以获取首页数据为例：<br>


1. 先在云函数目录新建一个函数：mianNewsGet

![](https://user-gold-cdn.xitu.io/2018/11/8/166f25e455dc3549?w=235&h=167&f=png&s=7023)
2. 打开该云函数的index.js
我这里用的是vsCode+node+yarn环境。
open in terminal(在终端中打开)，yarn一下，添加依赖。
或者参考[云函数官方文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/getting-started.html)

3. 编写云函数查询数据

```
// 云函数入口文件
const cloud = require('wx-server-sdk')
// 云函数初始化
cloud.init()
//获取数据库句柄
const db = cloud.database()

// 云函数入口函数
exports.main = async () => {
    const mainNewsList = [];
    //向fresh-mainNews集合中获得全部数据、因为数据库里面现在存的数据不多，
    //如果多的话可以设置一个limit以及skip来获取特定数量的数据
    const mainNews = await db.collection("fresh-mainNews").get();  
    for(let i = 0; i < mainNews.data.length; i++) {
      const mainNew = mainNews.data[i];
      let user_id = mainNew.setMan;
      //条件查询 获取特定id的docments
      const user = await db.collection('fresh-users').where({
        _id: user_id
      }).get();
      //限定条件如果有多条，只添加一条进去
      if (user.data.length > 0) {
        mainNew.setMan = user.data[0]
      }
      //这个循环是集合的拼接
      for (let i = 0; i < mainNew.subNews.length; i++) {
        const subNews = await db.collection("fresh-subNews").where({
          _id: mainNew.subNews[i]
        }).get();
        if (subNews.data.length > 0) {
          mainNew.subNews[i] = subNews.data[0]
        }
      }  
      //把拼好的docments挨个放进mainNewsList里面也就是形成了一个全新的
      //融合的数据更为完整的JSON数组   
      mainNewsList.push(mainNew);
    }
    return mainNewsList;
}
```  
4. 在首页index.js里面onLoad函数里面调用云函数

```
var that = this;
    wx.cloud.callFunction({
    // 声明调用的函数名
      name: 'mainNewsGet',
    // data里面存放的数据可以传递给云函数的event  效果：event.a = 1
      data: {
        a: 1
      }
    }).then(res => {
    //res.result的值是云函数的return的值
    //这里将查询的结果放入mainNewsList中，然后就可以在wxml中调用数据
      that.setData({
        mainNewsList: res.result
      })
    //打印一下结果看看有没有成功获取数据
      console.log(this.data.mainNewsList)
    }).catch(err => {
      console.log(err)
    })
```
获取的数据：<br>
我们可以看到原本的subNews里面本来存放的是_id的数值，融合后变成_id对应的整个doc<br>
变化:
[_id1.value,_id2.value~~] ---> [{_id1:value,key1:value1,key2:value2},~~~]

![](https://user-gold-cdn.xitu.io/2018/11/8/166f39d915bd815a?w=603&h=224&f=png&s=49668)

云函数的调用，数据库的查询。就是这么简单的四步，云开发的门槛很低，功能也很强大,只要你去尝试，很轻松的就能够实现。


### 五、关于时间格式化。
1. 写在utils文件夹里添加xx.js

```
const formatTime = date => {
    var dateNow = new Date();
    var date = new Date(date);
    const hour = date.getHours()
    const minute = date.getMinutes()
    var times = (dateNow - date) / 1000;
    let tip = '';
    if (times <= 0) {
        tip = '刚刚'
        return tip;
    } else if (Math.floor(times / 60) <= 0) {
        tip = '刚刚'
        return tip;
    } else if (times < 3600) {
        tip = Math.floor(times / 60) + '分钟前'
        return tip;
    }
    else if (times >= 3600 && (times <= 86400)) {
        tip = Math.floor(times / 3600) + '小时前'
        return tip;
    } else if (times / 86400 <= 1) {
        tip = Math.ceil(times / 86400) + '昨天'
    }
    else if (times / 86400 <= 31 && times / 86400 > 1) {
        tip = Math.ceil(times / 86400) + '天前'
    }
    else if (times / 86400 >= 31) {
        tip = '好几光年前~~'
    }
    else tip = null;
    return tip + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//将这个接口暴露
module.exports = {
    formatTime: formatTime,
}
```
2. 在需要的页面的xx.js里面引入<br>
`import { formatTime } from '../../utils/api.js';`

3. 格式化获取的时间数据
```
let mainNewsList = that.data.mainNewsList
      for(let i =0; i < mainNewsList.length;i++) {
        let time = formatTime(mainNewsList[i].time)
    //这是setData()的数组用法，会经常用到
        var str = 'mainNewsList['+i+'].time' 
        that.setData({
          [str]:time
        }) 
    }
```

### 六、 关于一些很有用但是你可能不知道的小程序技巧
1. 全屏显示图片，能够实现多张图片左右滑动并且还有数字索引现在在屏幕上，并且长按还能收藏以及下载(之前不知道这个API还特地做了一个组件来实现类似功能，简直吐血)
```
 wx.previewImage({
        current: imgUrl, // 当前显示图片的http链接
        urls: imagePack // 需要预览的图片http链接列表
      })
```
2. 非常方便的一个API能够滑动到某个位置

```
wx.pageScrollTo({
    scrollTop: 一个数值（自带px单位）,   //滚动到数值所在的位置
    duration: 50                          //执行滚动所花的时间
    })
```
3. 查询节点query.selectAll('类名')及query.select('#id')
[官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.boundingClientRect.html)

```
var that = this
let catalogIndex = that.data.catalogIndex;
query.selectAll('类名').boundingClientRect(function (rects) {
        rects.forEach(function (rect) {
          rect.top     // 节点的上边界坐标st,
//还有一些别的属性，这个查询节点是后面讲到的目录跳转关键API
          })
        })
      }).exec()
    },
```
4. setData()一些技巧。

```
//给数组设置值 还可以有var xx = 'xx['+idx+'].key'的形式
var doneList = 'doneList['+idx+']'
      that.setData({
        [doneList]: true,
      })
```
有时候我们还可以先改变某个数的值再去setData()它，这是setData()的一个很好用的技巧，不过需要去运用一下才好理解
如：

```
 dataPack.likeNum = (supLikeNum===-1 ? dataPack.likeNum: supLikeNum);
    this.setData({
      comment: dataPack,
    })
```

### 七、 项目最精彩的两个部分
#### 1.点击目录栏页面将相应新闻栏置顶，先看下效果
![](https://user-gold-cdn.xitu.io/2018/11/8/166f2fe2731b3b1b?w=281&h=500&f=gif&s=1017183)
&emsp;&emsp;这个效果在别的小程序里面都没有见过，应该是微博鲜知独创的，在这里先对原作者表达一下敬意。内部的构造也是非常巧妙，不同于我们常见的外卖的锚点定位。<br>
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
至此，你就实现了这个看似简单却非常巧妙的功能，组件->页面->组件，秀得眼花缭乱。如果还是有些不理解的话，等下可以下载我的代码去看。<br>至于为什么要弄一个图片的加载然后触发那个事件呢，这是因为如果你把获取offsetList偏移量数组的函数放在goTop里的话，进入页面第一次的点击会无效，这样产生的体验肯定是非常不舒服的。

#### 2. 点赞优化
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
点赞的延迟几乎为无，体验到<font color=red size=3>点赞</font>的极致快感，让人几乎停不下来~~（暗示一波）


<br>


篇幅所限，文章到这里就差不多了。<br>
项目地址:[github-HappyBirdwe-weiboFresh](https://github.com/HappyBirdwe/newsDance/tree/master/weiboFresh)奉上<br>精心写的项目，细节很不错哟，欢迎大家☆☆☆☆<font color=red size=5>star</font>☆☆☆☆

-------------------------------------
**结语**：<br>
学习的道路上免不了坎坷，希望文章的分享能够为大家提供一些思路，学习的过程减少一点弯路，这就是这篇文章最大的价值，欢迎大家提问及指正。<br>

最后在这里感谢一下:<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;腾讯云提供的技术支持<font color=red size=5>☆</font><br>
&emsp;&emsp;&emsp;&emsp;新浪团队的微博鲜知作者<font color=red size=5>☆</font><br>
&emsp;&emsp;掘金这个优秀的平台<font color=red size=5>☆</font><br>
点赞动作超帅的你<font color=red size=5>☆</font>



微博鲜知小程序官方传送门：  <br>
体验真的很不错哦，界面非常简约，大家可以体验一波

![](https://user-gold-cdn.xitu.io/2018/11/8/166f3464dc9cb85f?w=342&h=321&f=png&s=80775)
---------------------------------------------------------------------------------------------
## 关于这个项目的一些与原作的不同：
- 原作中分享页面是canvas画出来的，可以通过接口下载分享。此项目是把分享作为一个组件点击后弹出的一个页面，这样做的好处是响应速度更加快速，用户可以自己截图来实现图片的获得，从而也达到生成海报，可以在朋友圈分享。
- 原作实现了五张图片时最后一张图片有圆角修饰。<br>
![](https://user-gold-cdn.xitu.io/2018/11/9/166f803eb0a4b4e4?w=371&h=250&f=png&s=127956)
- 原作评论@xx会变色，且有对评论的回复显示

