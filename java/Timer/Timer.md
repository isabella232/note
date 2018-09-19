# Timer 的使用

1.  每个实例包含一个任务队列 TaskQueue
2.  每个实例都有一个内置线程 TimeThread
3.  守护线程会忽略循环条件吗？

## TimerTask

```java
//  内置4个状态
// 生成实例 还没有被加进Timer的任务队列
static final int VIRGIN=0;
//  已经加进了任务队列 还没有执行
static final int SCHEDULED=1;
//  已经非循环任务-已经执行
static final int VIRGIN=2;
// 被取消
static final int VIRGIN=3;

//  实例变量
// 当前状态 初始状态为任务生成 没有被加进任务队列
int state=VIRGIN;
//下次任务的执行时间
long nextExecutionTime;
//任务的循环时间
long period;
```

## TaskQueue 任务队列

```java
// 内置一个用于存储task的数组
private TimeTask[] queue;
```

```java
// 4个构造方法
public Timer()

public Timer(boolean isDaemon)

public Timer(String name)

public Timer(String name,boolean isDaemon)
```
