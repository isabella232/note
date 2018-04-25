# eclipse常见的问题

##  source not found

当查看源码的时候，出现source的问题。可能是反编译的问题，参考网上的方法如下：
+ 下载jad
  + http://varaneckas.com/jad/
+ 下载jadeclipse插件
  + http://sourceforge.net/projects/jadclipse/
  + 将下载的插件放在eclipse的plugins目录下
+ 关联jad编辑器
  + 下载完关联插件之后，需要配置关联
    + preferences->java->javaClipse
      + 这里设置jad.exe所在目录
+ 关联源码反编译插件
  + preferences->general->editor->file associatior
    + 设置.class的默认反编译为jad
    + 设置.class without source默认反编译为jad

## 快捷键

+ import包
  + ctrl+shift+o
+ override
  + ctrl+o

## eclipse默认编码方式是GBK，修改编码方式utf-8

+ preferences->workspace-text file encoding

## could not create jvm

+ 可能是jdk的版本和eclipse不支持，需要查看官方的通告
