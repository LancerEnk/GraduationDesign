# 复现vue搭建的前端界面

## 0 环境配置、基础测试、复现问题汇总

### 01 环境配置

#### vue

* [安装过程](https://blog.csdn.net/gxgalaxy/article/details/104884128?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167938555816782427449222%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=167938555816782427449222&biz_id=&utm_medium=distribute.pc_search_result.none-task-code-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-104884128-12-null-null.142^v74^insert_down3,201^v4^add_ask,239^v2^insert_chatgpt&utm_term=ubuntu%20vue%20vscode)
  * 我记得之前的安装过程中好像是给npm换过国内代理的，所以就直接用 `sudo npm install -g @vue/cli` 来安装vue了

* vue版本：

    ```shell
    mmm@myLinux:~$ vue -V
    @vue/cli 5.0.8
    ```

#### webpack

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

### 02 vue初上手

#### 利用vue脚手架搭一个可多设备访问的基础网页

为`vue`项目建立一个文件夹`testVue`，用vscode打开此文件夹。调出终端，在终端里输入如下语句（其实是想直接初始化一个页面出来），但报错了

```shell
mmm@myLinux:~/testCode/testVue$ vue init webpack testVue

  Command vue init requires a global addon to be installed.
  Please run npm i -g @vue/cli-init and try again.
```

按它要求走就行了

#### 如何在手机端、宿主机端、ipad端访问虚拟机里跑的网页

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
    * 为什么不用NAT：
      * 在使用NAT的网络连接方式时，虚拟机的ip地址和主机并非同一局域网，这由NAT连接的特性决定，所以使用桥接。
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

    * 测试时，发现其同属一个局域网，证明成功。

* 桥接的过程非常简单，只需要在 `virtualbox` -> `设置` -> `网络` -> `网卡1` -> `网络地址转换(NAT)`修改为`桥接网卡`，选择默认的 `Inter(R) Wireless-AC 9462` 即可。
  * 默认的 `Inter(R) Wireless-AC 9462` 和电脑主机的一致即可。

* 对wql的代码进行了一些修改：
  * 改动了`driver2.0`和`app2.0`中 config/index.js 中的第16行的 `host`，从`host:127.0.0.1`变成`0.0.0.0`，目的是为了让其他设备能够访问该页面。

### 03 复现中遇到的其他问题

#### 解决地图的显示问题

* 地图不显示的原因：**没开vpn...要狠狠开vpn！！！**
  * 好吧
  * 开了vpn以后，在宿主机端的地图能正常显示了
  * 但宿主机开了vpn，虚拟机里的地图依旧不能显示...看起来仿佛是因为虚拟机不能共享宿主机的vpn...蚌埠住了救命

#### 虚拟机跑代码，宿主机进行代码测试，汽车无法登录

* 虚拟机里，开启浏览器，可以正常登录 and 走后续的流程
  * 暂时应该是没问题的
* 宿主机不能，它在汽车登录时报错，send()应该是和区块链进行交互的内容，这个内容报错应该意味着主机访问不了虚拟机里的区块链？
  * 但不知道原因...
    * 根据fz所说，可能是要进行某些配置...先搁置了
  * 那怎样能使其他设备访问一个部署好的区块链呢？（在同一局域网中部署区块链、访问网页）
    * 理论上来说不应该出现这样的问题...再看看

#### 在贴图过程中，地图图片的网页资源来源

* 使用到的地图图层网页
  * <https://www.openstreetmap.org/>
  * 是外网，所以需要挂vpn进行访问

## 1 部署使用vue搭建的打车系统

### 01 对wql的打车系统更新点的分析

> 与cjz的打车系统进行比较。在vue复现时，需要针对以下几个方面实现：

1. 使用vue进行前端展示，对前端进行优化
2. 实现多设备访问
3. 增加信誉值计算模块
4. 实现多车辆、多乘客测试

### 02 在虚拟机中运行vue

#### 001 区块链启动和合约地址部署

> 默认为已经完成了`《7 调度系统复现实验》`。在`TaxiSystem`中实现相应的区块链启动，使用uploadmap_cjz_3.js完成地图上传。

打开`TaxiSystem`文件夹。
启动区块链：

```shell
geth1 --datadir ./gethdata --networkid 91036 --port 30303 --rpc --rpcaddr 127.0.0.1 --rpcport 8545 --rpcapi 'personal,net,eth,web3,admin' --rpccorsdomain='*' --ws --wsaddr='localhost' --wsport 8546 --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --nodiscover --allow-insecure-unlock --dev.period 1 --syncmode='full' console
```

解锁账户：

```js
for (i = 0; i < eth.accounts.length; i++) { personal.unlockAccount(eth.accounts[i],"123456",0) }
```

查看账户：

```js
eth.accounts
```

查看账户余额：

```js
for (i = 0; i < eth.accounts.length; i++) { console.log(eth.getBalance(eth.accounts[i])) }
```

此步完成之后，可以看到账户及其对应余额，就说明前面没问题。
接下来调出StoreMap.sol、StoreTraffic.sol对应的拼接之后的代码，复制它，部署在区块链上，并获得它们的地址。
完成此步后可以先暂停挖矿。
找到 `uploadmap_cjz_3.js` 代码，修改其中的StoreMap合约地址，然后启动挖矿，上传地图，至“地图数据上传成功”字样出现，即停止挖矿。
可以在地图上传的终端内留意一下地图上的不同区域、路段的地址名称，在后续修改vehicle、passenger的初始化位置的时候会用到。
（如果改了地图，没改初始化位置的话，会造成浏览器控制台输出的geohash1、geohash2等为undefined值，是空值，造成显示出错，无法显示寻路路径的后果）

#### 002 使用vue进行前端展示

首先，按照`01 环境配置`中的要求，完成预先的安装.

我使用的是vscode，在vscode里安装了 `vetur` 扩展，接下来的代码都将在vscode里完成运行。

使用vscode分别在两个窗口中打开 `driver2.0` 和 `app2.0` 文件夹。不要管它右下角会弹出的“没有tsconfig.js”（大概是这样）的提示语句，关掉即可。

观察 `driver2.0` 和 `app2.0` 文件夹，可以发现，在它们的 `code/前端/driver2.0/static/js/mapContract.js` 和 `code/前端/driver2.0/static/js/trafficContract.js` 中，分别修改对应的合约地址。

调出控制台，运行：

```shell
npm run dev
```

会看到它在运行，运行后会给一行输出，driver2.0对应localhost:8080，app2.0对应localhost:8081，接下来可以在虚拟机里的浏览器中输入 `localhost:8080` 和 `loaclhost:8081`，可以看到网页能成功访问。

#### 003 多设备访问

##### 1.验证设备间是否均处在同一局域网下

首先调出虚拟机的终端，输入以下语句以获取虚拟机的ip地址

```shell
hostname -I
```

再打开主机的`cmd`，输入以下语句以获取主机的ip地址

```shell
ipconfig
```

其余移动设备也同样获取联网的ip地址。
根据ip和子网掩码来验证一下是不是处于同一局域网。
如果不处于同一局域网，首先观察虚拟机是不是桥接联网状态，其次可以考虑直接开手机热点、各设备连接同一个wifi等...

##### 2. 当多设备均处于同一局域网后

在 `driver2.0` 和 `app2.0` 文件夹中，修改 `config.js` 文件中的 `module.exports` -> `dev` 的 `host:"localhost"` 为  `host:"0.0.0.0"` ，然后保存。
（以`driver2.0`为例）在使用 `miner.start(1)` 开始挖矿之后，使用 `npm run dev` 指令启动vue项目，会看到`console`中显示

```shell
> app running at
> localhost:0.0.0.0:8080
```

此时在各设备的浏览器中，访问 `虚拟机ip:8080` ，即可打开vehicle页面。

#### 004 信誉值计算模块

在 `vscode` 中增加 `credit.sol` 文件，在控制台中 `truffle compile`，会获得 `credit.json`，在其中寻找 `abi` 接口和 `bytecode`，通过[这个用于JSON压缩转义的网站](https://www.bejson.com/zhuanyi/)进行转移压缩，拼接成放进geth控制台的代码，按下回车，开始挖矿，获取合约地址，停止挖矿。
在 `code/前端/driver2.0/static/js/creditContract.js` 中修改credit.sol合约的地址，保存。
启动挖矿，运行vue，可以看到在浏览器的开发者工具中也有对应的credit的输出。

#### 005 测试
