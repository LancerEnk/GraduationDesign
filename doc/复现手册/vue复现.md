# 复现vue搭建的前端界面

## 00 环境配置

### vue

* [安装过程](https://blog.csdn.net/gxgalaxy/article/details/104884128?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167938555816782427449222%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=167938555816782427449222&biz_id=&utm_medium=distribute.pc_search_result.none-task-code-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-104884128-12-null-null.142^v74^insert_down3,201^v4^add_ask,239^v2^insert_chatgpt&utm_term=ubuntu%20vue%20vscode)
  * 我记得之前的安装过程中好像是给npm换过国内代理的，所以就直接用 `sudo npm install -g @vue/cli` 来安装vue了

* vue版本：

    ```shell
    mmm@myLinux:~$ vue -V
    @vue/cli 5.0.8
    ```

### webpack

* 看到好像需要使用 `webpack` 模块，因此安装它

    ```shell
    mmm@myLinux:~$ sudo npm install -g webpack
    ```

* 想使用 `npx webpack -v` 查看已安装的webpack版本，发现输出如下：

    ```shell
    mmm@myLinux:~$ npx webpack -v

    CLI for webpack must be installed.

    webpack-cli (https://github.com/webpack/webpack-cli)



    We will use "npm" to install the CLI via "npm install -D webpack-cli".

    Do you want to install 'webpack-cli' (yes/no): yes

    Installing 'webpack-cli' (running 'npm install -D webpack-cli')...

    npm ERR! code EACCES

    npm ERR! syscall mkdir

    npm ERR! path /home/mmm/node_modules/@types/eslint-scope

    npm ERR! errno -13

    npm ERR! Error: EACCES: permission denied, mkdir '/home/mmm/node_modules/@types/eslint-scope'

    npm ERR!  [Error: EACCES: permission denied, mkdir '/home/mmm/node_modules/@types/eslint-scope'] {

    npm ERR!   errno: -13,

    npm ERR!   code: 'EACCES',

    npm ERR!   syscall: 'mkdir',

    npm ERR!   path: '/home/mmm/node_modules/@types/eslint-scope'

    npm ERR! }

    npm ERR! 

    npm ERR! The operation was rejected by your operating system.

    npm ERR! It is likely you do not have the permissions to access this file as the current user

    npm ERR! 

    npm ERR! If you believe this might be a permissions issue, please double-check the

    npm ERR! permissions of the file and its containing directories, or try running

    npm ERR! the command again as root/Administrator.



    npm ERR! A complete log of this run can be found in:

    npm ERR!     /home/mmm/.npm/_logs/2023-03-21T08_50_57_339Z-debug-0.log

    undefined
    ```

  * 看起来是因为没有安装 `webpack-cli`，然后直接输入 `yes` 后，显示普通用户没这个权限安装，因此得提升权限等级

    * 先不管它了，去 `vscode` 里试试跑一个 `vue` 程序

### vue初上手

为`vue`项目建立一个文件夹`testVue`，用vscode打开此文件夹。调出终端，在终端里输入如下语句（其实是想直接初始化一个页面出来），但报错了

```shell
mmm@myLinux:~/testCode/testVue$ vue init webpack testVue

  Command vue init requires a global addon to be installed.
  Please run npm i -g @vue/cli-init and try again.
```

按它要求走就行了

### 如何在手机端、宿主机端、ipad端访问虚拟机里跑的网页

* 首先在虚拟机里完成`vue`项目运行
  * 相关文件配置如下：
    * `config/index.js`里的dev中
  
      ```js
      // Various Dev Server settings
      host: '0.0.0.0', // can be overwritten by process.env.HOST
      port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
      ```
  
    * `package.json`里的scripts中

      ```js
      "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      ```

* 运行后，在虚拟机端可以打开，在宿主机和手机端都无法打开，网络连接情况如下：
  * 宿主机：BIT-Web（10.63.31.242/255.255.128.0）
  * 手机：BIT-Web（10.63.31.242/255.255.128.0）
  * 虚拟机：网络地址转换NAT（10.0.2.15）

* 看到网上有人说是虚拟机防火墙开着导致的无法访问，因此去虚拟机终端中使用`sudo ufw status`查看防火墙情况，显示 “防火墙:不活动”，所以排除此情况。

* 因此考虑到问题可能出在“虚拟机和其他设备不处于同一局域网下”的原因。
  * 正在处理ing
  * 定位了一圈问题，发现问题出在 “[连接校园网](https://blog.csdn.net/qq_41709234/article/details/123149787?ops_request_misc=&request_id=&biz_id=102&utm_term=%E6%A1%A5%E6%8E%A5%E6%A8%A1%E5%BC%8F%20ubuntu%E6%B2%A1%E6%9C%89hostname&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-6-123149787.142^v76^insert_down38,201^v4^add_ask,239^v2^insert_chatgpt)” 上。
  * **使用手机给电脑开热点**，**然后虚拟机使用桥接网络**，就完全正常。在虚拟机上跑出来的网页，拿主机、手机等都可以访问。
    * 前提是**一切设备都要连到我手机的热点上**（实现同一局域网环境）。
    * 在初次成功尝试时，顺手测了虚拟机、主机ip地址：

      ```shell
      # 虚拟机
      mmm@myLinux:~$ hostname -I
      192.168.43.158
      # 主机
      IPv4 地址 . . . . . . . . . . . . : 192.168.43.105
      子网掩码  . . . . . . . . . . . . : 255.255.255.0
      ```

* 桥接的过程非常简单，只需要在 `virtualbox` -> `设置` -> `网络` -> `网卡1` -> `网络地址转换(NAT)`修改为`桥接网卡`，选择默认的 `Inter(R) Wireless-AC 9462` 即可。
  * 默认的 `Inter(R) Wireless-AC 9462` 和电脑主机的一致即可。

* 对wql的代码进行了一些修改：
  * 改动了`driver2.0`和`app2.0`中 config/index.js 中的第16行的 `host`，从`host:127.0.0.1`变成`0.0.0.0`，目的是为了让其他设备能够访问该页面。
