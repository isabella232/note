<<<<<<< HEAD
# http 模块

## 基本用法

```javascript
var http=require('http)

//  创建服务器
```
=======
# http

## http.request(opts)

```javascript
let opt={
  host:'www.baidu.com'，//请求域名
  hostname:'www.baidu.com',// 优先级高于host
  path:'/path',
  procotol:'http',   // default http
  port:'80',  // default 80
}
```

## http.createServer(callFunc(req,res))

```javascript {.line-numbers}
const http=require('http);
const server=http.createServer((req,res)=>{

})
server.listen(port)
```
>>>>>>> 27aaa9046d53b29eb4d2baea8756db9f0924ca99
