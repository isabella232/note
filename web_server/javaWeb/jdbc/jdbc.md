# jdbc 使用

## 首先需要和使用的数据库建立连接

> 常见的连接方式见文件 jdbc_connection.md

```java {.line-numbers}
/**
 * @param url 地址 包含user和password
 * */
static Connection	getConnection(String url)
Attempts to establish a connection to the given database URL.

/**
 * @param url 地址
 * @param info Properties对象  user和password可以放在这里
 * */
static Connection	getConnection(String url, Properties info)
Attempts to establish a connection to the given database URL.

/**
 * @param url
 * @param user 数据库用户名
 * @param password 数据库密码
 * */
static Connection	getConnection(String url, String user, String password)
Attempts to establish a connection to the given database URL.

public Connection getConnection() throws SQLException {

    Connection conn = null;
    Properties connectionProps = new Properties();
    connectionProps.put("user", this.userName);
    connectionProps.put("password", this.password);

    if (this.dbms.equals("mysql")) {
        conn = DriverManager.getConnection(
                   "jdbc:" + this.dbms + "://" +
                   this.serverName +
                   ":" + this.portNumber + "/",
                   connectionProps);
    } else if (this.dbms.equals("derby")) {

        //  调用两个参数的重载方法  ;create=true是什么意思?
        conn = DriverManager.getConnection(
                   "jdbc:" + this.dbms + ":" +
                   this.dbName +
                   ";create=true",
                   connectionProps);
    }
    System.out.println("Connected to database");
    return conn;
}
```
