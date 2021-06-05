---
description: 使用binlog被注释掉的SQL恢复数据
date: 2021-06-05 10:51:50
comments: true
---

## 前言

手动修改数据时，不小心把部分数据物理删除了。虽然不是很重要，但是本着探索精神。被删除的数据，是否能恢复原状呢？

## 分析实现流程

- 找到`binlog`文件
- 找到操作数据的`SQL`
- 把`SQL`在数据库中执行

## 开始

### 找到binlog文件

数据能够恢复的前提是**binlog**

> 数据的恢复必须依赖`MySQL`的`binlog`功能（关于`binlog`信息，这里不做赘述）。

#### 查看binlog是否开启

```sql
mysql> show variables like 'log_bin';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_bin       | ON    |
+---------------+-------+
1 row in set (0.01 sec)
```

**注意：这个默认是开启的，如果是`OFF`那就到此结束。**

#### 找到binlog文件

```sql
mysql> show variables like '%dir%';
+-----------------------------------------+--------------------------------+
| Variable_name                           | Value                          |
+-----------------------------------------+--------------------------------+
| basedir                                 | /usr/                          |
| binlog_direct_non_transactional_updates | OFF                            |
| character_sets_dir                      | /usr/share/mysql-8.0/charsets/ |
| datadir                                 | /var/lib/mysql/                |
……
+-----------------------------------------+--------------------------------+
17 rows in set (0.01 sec)
```

其中的`datadir`即`binlog`文件所在目录。进去看下：

```bash
➜  mysql ls
auto.cnf       binlog.000009    ib_buffer_pool  mysql.ibd           server-cert.pem
binlog.000003  binlog.000010    ibdata1         mysql.sock          server-key.pem
binlog.000004  binlog.index     ib_logfile0     mysql.sock.lock     sys
binlog.000005  ca-key.pem       ib_logfile1     npmer               task_machine
binlog.000006  ca.pem           ibtmp1          performance_schema  task_machine_test
binlog.000007  client-cert.pem  #innodb_temp    private_key.pem     undo_001
binlog.000008
```
其中名字以`binlog.00000*`即binlog文件。这里有好几个文件，那到底哪些是我所需要的呢？**在我们开始之前，我们使用`flush log` 命令，使当前主库新建正在使用的 binlog 文件。好处如下：**

1. 可将误删操作，定位在一个 BINLOG 文件中，便于之后的数据分析和恢复
2. 避免操作正在被使用的 BINLOG 文件，防止发生意外情况

### 确定binlog区间

> MySQL 的二进制日志 binlog 可以说是 MySQL 最重要的日志。**它记录了所有的 DDL 和 DML 语句**_（除了数据查询语句select、show等），以事件形式记录，还包含语句所执行的消耗的时间，MySQL的二进制日志是事务安全型的。_**binlog 的主要目的是复制和恢复。**

所以我们需要**找到操作了数据的这些SQL**，例如我的需求：我是因为物理删除了部分数据，那么我要找到这部分数据插入的SQL，直到删除这部分数据的SQL。

看似比较麻烦，MySQL内置的工具`mysqlbinlog`工具还是比较方便的。简单看下`mysqlbinlog`的常用参数：

```bash
  --database      # 仅仅列出配置的数据库信息
  --no-defaults   # 读取没有选项的文件, 指定的原因是由于 mysqlbinlog 无法识别 BINLOG 中的 default-character-set=utf8 指令
  --offset        # 跳过 log 中 N 个条目
  --verbose       # 将日志信息重建为原始的 SQL 陈述
    -v            # 仅仅解释行信息
    -vv           # 不但解释行信息，还将 SQL 列类型的注释信息也解析出来
  --start-datetime            # 显示从指定的时间或之后的时间的事件接受 DATETIME 或者 TIMESTRAMP 格式
  --base64-output=decode-rows # 将 BINLOG 语句中事件以 base-64 的编码显示，对一些二进制的内容进行屏蔽
    AUTO          # 默认参数，自动显示 BINLOG 中的必要的语句
    NEVER         # 不会显示任何的 BINLOG 语句，如果遇到必须显示的 BINLOG 语言，则会报错退出
    DECODE-ROWS   # 显示通过 -v 显示出来的 SQL 信息，过滤到一些 BINLOG 二进制数据
```

所以我的查找数据使用以下命令：

```bash
➜  mysqlbinlog --no-defaults --start-datetime='2021-06-02 09:30:00' --stop-datetime='2021-06-02 14:30:00' binlog.000008 binlog.000009  | less
```

可见一下内容（示例）：

```
# at 734176
#210602 10:03:11 server id 1  end_log_pos 734670 CRC32 0xe0912832   Update_rows: table id 86 flags: STMT_END_F
### UPDATE `db_name`.`table_name`
### WHERE
###   @1=1731
###   @2=4
###   @3='名称'
###   @4=NULL
###   @5=NULL
###   @6='18120004'
###   @7=1623045600
###   @8=1623132000
###   @9=8
###   @10=139062
###   @11=NULL
###   @12=2427
###   @13=71
###   @14=87
###   @15=0
###   @16=1622599374
###   @17='18120004'
###   @18=0
###   @19=''
### SET
###   @1=1731
###   @2=4
###   @3='名称'
###   @4=NULL
###   @5=NULL
###   @6='18120004'
###   @7=1623043800
###   @8=1623130200
###   @9=8
###   @10=139062
###   @11=NULL
###   @12=2427
###   @13=70
###   @14=86
###   @15=0
###   @16=1622599391
###   @17='18120004'
###   @18=0
###   @19=''
# at 734670
#210602 10:03:11 server id 1  end_log_pos 734701 CRC32 0xf883537a   Xid = 12845
COMMIT/*!*/;
# at 734701
```

其中可以看到一些操作数据的SQL。但是，这些SQL都被注释了，而且里面的字段名都被`@+数字`替代了。

**卧槽🤦🏻‍♂️，这么神马情况**，我看的网上教程他们输出的直接就是可执行的SQL啊。找了一下原因，是数据库这两个设置`binlog_format`和`binlog_rows_query_log_events`[👉🏻 详细移步这里](https://www.percona.com/blog/2020/07/09/binlog2sql-binlog-to-raw-sql-conversion-and-point-in-time-recovery/)。

### 生成可执行SQL

上面链接中提到的开源的仓库可以从以上`binlog`文件生成可执行`SQL`。[🔗 仓库地址：https://github.com/danfengcao/binlog2sql](https://github.com/danfengcao/binlog2sql)。我们看下他的要求：

- Python 2.7, 3.4+
- MySQL 5.6, 5.7

然后按照仓库说明进行执行即可，执行过程中遇到些许问题。**依赖的`PyMySQL@0.7.11`版本在执行的过程中报错了。检查后将版本升级到`PyMySQL@0.9.3`发现可以正确执行了。**然后就生成了目标SQL：

```sql
➜  python binlog2sql.py -h127.0.0.1 -P3306 -uadmin -p'admin' -dtest -t test --start-file='binlog.000008'

INSERT INTO `test`.`test3`(`addtime`, `data`, `id`) VALUES ('2016-12-10 13:03:38', 'english', 4); #start 570 end 736
UPDATE `test`.`test3` SET `addtime`='2016-12-10 12:00:00', `data`='中文', `id`=3 WHERE `addtime`='2016-12-10 13:03:22' AND `data`='中文' AND `id`=3 LIMIT 1; #start 763 end 954
DELETE FROM `test`.`test3` WHERE `addtime`='2016-12-10 13:03:38' AND `data`='english' AND `id`=4 LIMIT 1; #start 981 end 1147
```

以上命令将`SQL`输出到了控制台，可在命令后面加上输出到文件中，方便后面执行：

```bash
➜  python binlog2sql.py -h127.0.0.1 -P3306 -uadmin -p'admin' -dtest -t test --start-file='binlog.000008' > result.sql
```

然后将以上生成的`SQL`，进行执行即可。在执行前注意确认数据是否正确或在测试库进行执行，防止对数据二次破坏。

## 综上

总体思路是比较简单的，主要是三个问题：

1. 数据库是否开启`binlog`，这是基础；
2. 找到对应区间`binlog`；
3. 解析生成目标`SQL`；

以上。
