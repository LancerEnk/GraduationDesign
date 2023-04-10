# 00 环境准备

## vue安装

* [安装过程](https://blog.csdn.net/gxgalaxy/article/details/104884128?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522167938555816782427449222%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=167938555816782427449222&biz_id=&utm_medium=distribute.pc_search_result.none-task-code-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-104884128-12-null-null.142^v74^insert_down3,201^v4^add_ask,239^v2^insert_chatgpt&utm_term=ubuntu%20vue%20vscode)
  * 我记得之前的安装过程中好像是给npm换过国内代理的，所以就直接用 `sudo npm install -g @vue/cli` 来安装vue了

* vue版本：

    ```shell
    mmm@myLinux:~$ vue -V
    @vue/cli 5.0.8
    ```

## 虚拟机联网方式设置

虚拟机默认的联网方式为 `NAT` 连接，使用这种连接方法会出现：“尽管是在同一个电脑上运行，但通过测试，虚拟机和主机实际上并不处于同一局域网中” 的问题。

原因：“[连接校园网](https://blog.csdn.net/qq_41709234/article/details/123149787?ops_request_misc=&request_id=&biz_id=102&utm_term=%E6%A1%A5%E6%8E%A5%E6%A8%A1%E5%BC%8F%20ubuntu%E6%B2%A1%E6%9C%89hostname&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-6-123149787.142^v76^insert_down38,201^v4^add_ask,239^v2^insert_chatgpt)”。

因此，需要把虚拟机的联网方式修改为“桥接”方式，且让主机通过非校园网的方式上网。

### 桥接的过程

只需要在 `virtualbox` -> `设置` -> `网络` -> `网卡1` -> `网络地址转换(NAT)`修改为`桥接网卡`，选择默认的 `Inter(R) Wireless-AC 9462` 即可。

* 默认的 `Inter(R) Wireless-AC 9462` 和电脑主机的一致即可。

### 主机上网方式

我用手机开了热点，令所有设备连接它。

### 是否在同一局域网

确认方式为，在主机cmd和虚拟机terminal中分别输入以下指令

```shell
# 虚拟机
mmm@myLinux:~$ hostname -I
192.168.43.158
# 主机
C:\Users\62467>ipconfig
IPv4 地址 . . . . . . . . . . . . : 192.168.43.105
子网掩码  . . . . . . . . . . . . : 255.255.255.0
```

根据各自的地址和主机的子网掩码，进行计算，判断主机和虚拟机当前是否在同一局域网中。

# 01 区块链部署

建立 `newTaxiSystem` 文件夹，重新配置区块链。

## 初始化区块链、第一次启动区块链

初始化区块链：

```shell
geth1 --identity "MyEth" --rpc --rpcaddr 0.0.0.0  --rpcport "8545" --rpccorsdomain "*" --datadir gethdata --port "30303" --nodiscover --rpcapi "eth,net,personal,web3" --networkid 91036 init genesis.json
```

启动区块链：

```shell
geth1 --datadir ./gethdata --networkid 91036 --port 30303 --rpc --rpcaddr 0.0.0.0 --rpcport 8545 --rpcapi 'personal,net,eth,web3,admin' --rpccorsdomain='*' --ws --wsaddr 0.0.0.0 --wsport 8546 --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --nodiscover --allow-insecure-unlock --dev.period 1 --syncmode='full' console
```

**注意：此语句和之前实验中的语句不同，修改处主要在于 `rpcaddr`、`wsaddr`**。即，将它们从先前的 `rpcaddr 127.0.0.1` 和 `wsaddr='localhost'`修改为 `rpcaddr 0.0.0.0` 和 `wsaddr 0.0.0.0`。

其目的是为了：打开区块链的外部访问（rpcaddr）和网络的外部访问（wsaddr）

以下两个链接是针对 `rpcaddr` 修改的前辈经验：

* [周畅 - 外部访问要对 `rpcaddr` 进行的修改说明1](https://github.com/xyongcn/BlockChain2017/blob/master/doc/%E8%B7%AF%E5%86%B5%E5%8C%BA%E5%9D%97%E9%93%BE%E4%BB%A3%E7%A0%81%E8%AF%B4%E6%98%8E.md)

* [周畅 - 外部访问要对 `rpcaddr` 进行的修改说明2](https://github.com/xyongcn/BlockChain2017/blob/master/doc/%E8%B7%AF%E5%86%B5%E6%8E%A2%E6%B5%8B%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3.md)

> [参考的网络文档](https://learnblockchain.cn/2018/08/16/719a34fe484d)

## 添加余额

在 `JavaScript` 控制台中，执行创建账户和解锁账户指令。

创建账户：

```javascript
for (i = 0; i < 8; i++) { personal.newAccount("123456") }
```

解锁账户：

```javascript
for (i = 0; i < eth.accounts.length; i++) { personal.unlockAccount(eth.accounts[i],"123456",0) }
```

利用`eth.accounts`获取所有账户的地址，使用如下Python程序，生成即将添加进入`genesis.json`的代码：

```python
# TaxiSystem/accounts_processor.py
l = eth.accounts的输出，原样粘贴过来即可，应该是["...", "...", ...]的格式

for each in l:
    print(
        f'"{each}": {{ "balance": "50000000000000000000000000000000000000000", "position": "test0123456789", "txtime": 1 }},'
    )

```

记录该程序的输出，直接粘贴到`genesis.json`的`alloc`字段中去。

> 该程序的输出的最后一行带有一个多余的逗号，粘贴到`genesis.json`中去之后请务必删除。

在打开的控制台中输入`exit`退出控制台，然后删除目录`newTaxiSystem/gethdata/geth`。随后，再运行一次初始化区块链和启动区块链的代码。此时，所有账户应该都有余额了。可以用`eth.geBalance(账户地址)`来检查余额。

检查余额：

```js
for (i = 0; i < eth.accounts.length; i++) { console.log(eth.getBalance(eth.accounts[i])) }
```

**重要步骤**↓

* 每次重新启动JS控制台，都需要再解锁一次账户。
    > 如果不解锁账户的话，可能会导致miner.start()无法挖到合约地址

## 存储所需信息

在geth控制台中，输入查询账户的指令。

查询账户：

```js
eth.accounts
```

将获取到的输出保存在本地文档中，用于后续指定车辆和乘客分别对应的账户。

# 02 更改代码文件以实现多设备访问

分别用vscode打开 `app2.0` 和 `driver2.0` 这两个文件夹。

需要对代码进行如下改动：

1. 改动 `driver2.0` 和 `app2.0` 中 `config/index.js` 中的第16行的 `host`，从 `host:'127.0.0.1'` 变成 `0.0.0.0`，目的是为了让其他设备能够访问该页面。

2. 修改 `driver2.0` 和 `app2.0` 中 `Global.vue` 里的全局配置，把所有如下的语句都注释掉本地访问的 ws，修改为接入当前虚拟机所处ip。
    * （在 `00 环境准备 -> 虚拟机联网方式设置 -> 是否在同一局域网` 中查到我的虚拟机对应的ip为192.168.43.158）。

    ```javascript
    this.web3Map = new Web3(
      //new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546")
      new Web3.providers.WebsocketProvider("ws://192.168.43.158:8546")
    );
    ```

# 03 运行系统所需的其他步骤

与 `7 调度系统复现实验` 中的步骤一致。

按照 [7 调度系统复现实验](7%20%E8%B0%83%E5%BA%A6%E7%B3%BB%E7%BB%9F%E5%A4%8D%E7%8E%B0%E5%AE%9E%E9%AA%8C.md) 中的 `03 部署合约`、`04 上传地图` 这两个章节完成合约部署和地图上传。

[9 使用Remix-ide编译合约](9%20%E4%BD%BF%E7%94%A8Remix-ide%E7%BC%96%E8%AF%91%E5%90%88%E7%BA%A6.md)

# 04 运行vue项目

在 `app2.0` 和 `driver2.0` 这两个文件夹中，进行以下更改。

此处对应的是 `7 调度系统复现实验` 中的、`05 更改文件以加入账户信息` 环节。

在 `Global.vue` 中修改账户内容。

在 `mapContract.js`、`trafficContract.js`、`creditContract.js` 中分别对合约地址进行修改。

修改完毕之后，调出vscode的终端，输入指令：

```shell
npm run dev
```

项目运行，待运行完毕后，在浏览器中输入 `虚拟机ip地址:8080` 和 `虚拟机ip地址:8081` 打开网页。

```txt
# vehicle
http://192.168.43.158:8080/
# passenger
http://192.168.43.158:8081/
```

# 05 想要再次用vue打开出租车系统

1. 按照 `01 区块链部署` 中的内容启动区块链（不需要重新初始化）
2. 保证虚拟机和测试端处于同一局域网
3. 完成 `03 运行系统所需的其他步骤` 对合约的部署
4. 按照 `04 运行vue项目` 的方式运行
