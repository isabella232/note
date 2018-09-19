# egg框架

[项目地址](https://eggjs.org/zh-cn/intro/)

## 静态资源:::前后分离方式

内置了static插件，文件架构：

+ 文件放在 app/public 目录下
+ 访问文件 procotol://hostname:port/public/__filename.ext

## 后端渲染方式

内置了对egg-view模版引擎的支持：

## 安全模式

### csrf

```javascript

//  客户端
    function xhr() {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        var reg = /csrfToken=(?=(.+));/
        var token;
        if (document.cookie) {
          token = reg.exec(document.cookie)[1]
        }
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4 && xhr.status === 200) {
            return resolve(xhr.responseText)
          }
        }
        xhr.open('post', 'http://localhost:8080/')
        xhr.setRequestHeader('Content-Type', 'json/application')
        if (token) {
          xhr.setRequestHeader('x-csrf-token', token)
        }
        xhr.send();
      })
    }
```