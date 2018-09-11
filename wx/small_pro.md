# 小程序

## 生命周期

```javascript
//  app注册函数
App({
  //  执行一次
  onLaunch: function(options) {
    // Do something initial when launch.
  },
  //  进入后台再次进入会执行
  onShow: function(options) {
    // Do something when show.
  },
  //  进入后台会执行
  onHide: function() {
    // Do something when hide.
  },
  //  发生错误会执行
  onError: function(msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})

//  页面注册函数
```
