# eclipse

## 配置tomcat

tomcat的配置步骤
+ preferences->service->runtime-envioronments->add tomcat-service
+ 404 error
  +  默认的访问路径是eclipse的webapps文件
  +  编辑service
  +  删除原始tomcat里面webapps的文件
  +  更改eslipse里面setvice的路劲映射
  +  修改完之后恢复tomcat里面的文件，重启服务器