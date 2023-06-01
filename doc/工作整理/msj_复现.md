# msj_复现

> 笔者毕设项目的整个部署运行过程，便于阅读此文的读者对笔者工作进行复现

## 地图数据

[获取真实地图数据](../%E5%9C%B0%E5%9B%BE%E6%95%B0%E6%8D%AE%E8%AF%B4%E6%98%8E/%E8%8E%B7%E5%8F%96%E7%9C%9F%E5%AE%9E%E5%9C%B0%E5%9B%BE%E6%95%B0%E6%8D%AE.md)中给出了地图数据的获取方法。

其中，用于将地图数据从`数据库中导出的代码`转化为`可上传给区块链`的处理脚本为[实验室-成佳壮前辈写的脚本代码](https://github.com/Wintersweet0/lonlat-to-geohash)

在uploadmap_cjz_3.js中修改上传的地图文件为自己想传的那个文件，在`出租车调度系统`中运行uploadmap_cjz_3.js即可。

## 出租车调度系统复现

> 本系统的复现过程结合了[《7 调度系统复现实验》](../%E5%A4%8D%E7%8E%B0%E6%89%8B%E5%86%8C_CJZandWQL/7%20%E8%B0%83%E5%BA%A6%E7%B3%BB%E7%BB%9F%E5%A4%8D%E7%8E%B0%E5%AE%9E%E9%AA%8C.md)和[《部署在geth-tree上的出租车调度系统复现实验》](../%E5%A4%8D%E7%8E%B0%E6%89%8B%E5%86%8C_CJZandWQL/10%20%E9%83%A8%E7%BD%B2%E5%9C%A8geth-tree%E4%B8%8A%E7%9A%84%E5%87%BA%E7%A7%9F%E8%BD%A6%E8%B0%83%E5%BA%A6%E7%B3%BB%E7%BB%9F%E5%A4%8D%E7%8E%B0%E5%AE%9E%E9%AA%8C.md)的工作，是`部署在geth-tree上的、使用基于路况的改进A*算法`的出租车调度系统。请确保你在进行本文工作前已完成对上述两个复现文档的阅读。本文接下来将陈述本次复现过程。

### 01 常用命令 and 解压文件

第一步还是配置`genesisgtrie.json`

```json
{
  "config": {
    "chainId": 91036,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0
  },
  "alloc": {},
  "coinbase": "0x0000000000000000000000000000000000000000",
  "difficulty": "0x20000",
  "extraData": "",
  "gasLimit": "0xffffffff",
  "nonce": "0x0000000000000042",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp": "0x00"
}
```

初始化区块链：

```bash
geth-tree --identity "MyEth" --rpc --rpcport "8081" --rpccorsdomain "*" --datadir gethdata --port "30314" --nodiscover --rpcapi "eth,net,personal,web3,miner" --networkid "wx4" init genesisgtrie.json
```

启动区块链：

```bash
geth-tree --identity "MyEth" --rpc --rpcport "8081" --rpccorsdomain "*" --datadir gethdata --port "30314" --nodiscover --rpcapi "eth,net,personal,web3,miner,admin" --ws --wsaddr='localhost' --wsport "8546" --wsorigins='*' --wsapi 'personal,net,eth,web3,admin' --networkid "wx4" --allow-insecure-unlock --dev.period 1 console
```

创建账户：

```js
for (i = 0; i < 4; i++) { personal.newAccount("123") }
```

解锁账户：

```js
for (i = 0; i < eth.accounts.length; i++) { personal.unlockAccount(eth.accounts[0],"123",30000) }
// 或者
personal.unlockAccount(eth.accounts[0],"123",30000)
personal.unlockAccount(eth.accounts[1],"123",30000)
personal.unlockAccount(eth.accounts[2],"123",30000)
personal.unlockAccount(eth.accounts[3],"123",30000)
```

检查余额：

```js
for (i = 0; i < eth.accounts.length; i++) { console.log(eth.getBalance(eth.accounts[i])) }
```

复现笔者的毕设系统，一共有两个方法：

1. 直接从我的Github上下载整个项目：把从笔者Github中下载的文件夹中的压缩包全部解压到当前目录里。

2. 从Github上下载原项目：按照笔者思路，在原项目中按照笔者的开发过程逐一添加文件进去。

### 02 初始化并启动区块链

新建`treeTaxiSystem`文件夹，将01节中的`genesisgtrie.json`内容放置入根目录。在`treeTaxiSystem`文件夹下启动终端，分别使用初始化区块链、启动区块链的指令操作，打开`JavaScript`控制台。

在控制台中，执行00节中的创建账户和解锁账户指令后，利用`eth.accounts`获取所有账户的地址，使用如下Python程序，生成即将添加进入`genesisgtrie.json`的代码：

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

在打开的控制台中输入`exit`退出控制台，然后删除目录`treeTaxiSystem/gethdata/geth`。随后，再运行一次初始化区块链和启动区块链的代码。此时，所有账户应该都有余额了。可以用`eth.getBalance(账户地址)`来检查余额。

**重要步骤**↓

* 每次重新启动JS控制台，都需要再解锁一次账户。
    > 如果不解锁账户的话，可能会导致miner.start()无法挖到合约地址

### 03 部署合约

一共部署两个合约：StoreMap.sol和StoreTraffic.sol。

将StoreMap.sol和StoreTraffic.sol放进Remix-ide中，获取记录它们的abi接口和bytecode。

#### StoreMap.sol合约

在打开的控制台中输入如下指令：

```js
abi = JSON.parse('复制来的内容')
bytecode = 获得的bytecode，字符串类型

StoreMapContract = web3.eth.contract(abi);
web3.eth.estimateGas({data: bytecode})
StoreMap = StoreMapContract.new({
    from: web3.eth.accounts[0], 
    data: bytecode, 
    gas: '3000000',
    position:"wx411111111111",
    txtime:277001
  },function (e, contract){
    console.log(e, contract);
    if(!e){
        if(!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            console.log(contract);
        }
    }
});
```

开始挖矿，并留意输出：

```js
miner.start()
/*
-- snip --
null [object Object]
Contract mined! Address: 0xef00ade84bb560afe4b562bfd4a81300c17ac52f
[object Object]
-- snip --
*/
miner.stop()  // 停止挖矿以节省电脑性能
```

这就是StoreMap合约的地址了。妥善保存，以供日后使用。

#### StoreTraffic.sol合约

在打开的控制台中输入如下指令：

```js
abi = JSON.parse('复制来的内容')
bytecode = 获得的bytecode，字符串类型

trafficContract = web3.eth.contract(abi);
web3.eth.estimateGas({data: bytecode})
traffic = trafficContract.new({
    from: web3.eth.accounts[0], 
    data: bytecode, 
    gas: '4000000',
    position:"wx411111111111",
    txtime:277001
  },function (e, contract){
    console.log(e, contract);
    if(!e){
        if(!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            console.log(contract);
        }
    }
});
```

同样开始挖矿并留意输出：

```js
miner.start()
/*
-- snip --
null [object Object]
Contract mined! Address: 0xf03dafc4fadae50b1b7bc0f602ae722038f7fe51
[object Object]
-- snip --
*/
miner.stop()  // 停止挖矿以节省电脑性能
```

记录两个合约的地址。

转回`Remix-ide`，在`Remix-ide`中获取到`StoreMap.sol`编译后的abi。在`mapContract.js、mapAbi.json`中修改abi接口；获取`Remix-ide`中重新编译后得到的`StoreMap.json`，用其替换`/tree_blockchain/build/StoreMap.json`。

（如果不替换abi接口，则在系统运行时会报错“abi接口不对”；如果不替换StoreMap.json，则上传地图后地图数据会为空，导致系统虽然不报错，但实际上没有地图）

### 04 上传地图

`tree_blockchain`文件夹中找到文件`uploadmap_cjz_3.js`，打开并修改其中的内容：

```js
// -- snip --

// contract address 
var myContractInstance = MyContract.at("StoreMap合约的地址");
var account = "eth.accounts[0]的内容";

// -- snip --
```

注意其中发送交易的位置`position`需要为wx4范围,不然无法打包交易。

* 即可以在原 `geth1` 支持的出租车调度系统的`uploadmap_cjz_3.js`文件的基础上，把发送交易时的`"w3511111111111"`改成`"wx411111111111"`。

运行地图上传代码：

```shell
node uploadmap_cjz_3.js
```

### 05 修改代码

#### 修改 regionid 和 position

启动过程和原来的一致，只是启动文件根据区块链的不同有所变化，主要是`regionid`和`position`的变化。

例如，在 `sys_passenger_region_noPos.html` 中确保如下地方已经被改动为`"wx4..."`：

```js
// geth1

trafficContract.methods.confirmPay(vehicleId).send({ from: passengerId, gas: 5000000, position: "w3511111111111", txtime: 278000 }).then(function (result) {

// geth-tree

trafficContract.methods.confirmPay(vehicleId).send({ from: passengerId, gas: 5000000, position: "wx411111111111", txtime: 278000 }).then(function (result) {
```

上述改动需要在js代码中所有牵扯到发送交易的地方进行修改。

#### 更改文件以加入账户信息

同《7 调度系统复现实验》中此部分的内容一样，对`js/py`文件中的相关部分进行修改。

#### 小结

在树状区块链上进行测试，共需要修改如下地方，请务必对照检查，确保自己的改动无误：

1. 把所有的"w35"修改为"wx4"：
    * Web测试终端
    * 脚本测试终端
    * uploadmap_cjz_3.js
    * 在以太坊中部署合约的"position"

2. 把所有账户改为geth-tree对应的账户：
    * Web测试终端
        * vehicles.js
        * passengers.js
        * vehicle_accounts.py
        * passenger_accounts.py
    * 脚本测试终端
        * nvehicle.js
        * npassenger.js

3. 启动区块链，部署合约，获得StoreMap.address、traffic.address、pacre.address（如果部署了信誉值合约），并根据这几个地址修改：
    * Web测试终端
        * uploadmap_cjz_3.js
        * mapContract.js
        * trafficContract.js
        * creditContract.js
    * 脚本测试终端
        * nvehicle.js
        * npassenger.js

### 06 启动测试

Web终端可以用浏览器查看可视化效果，但不便获取大量运行数据；脚本终端便于大批量获取数据，但无法可视化查看运行过程。

这两种测试方法二选一，启动方式如下所示：

#### 启动Web终端

在挖矿的状态下，分别启动`vehicle_test.py`和`passenger_test.py`两个程序，从而启动测试。

```shell
# 在terminal_1中打开vehicle测试网页
python3 vehicle_test.py
# 在terminal_2中打开passenger测试网页
python3 passenger_test.py
```

#### 启动脚本终端

在挖矿的状态下，分别启动`nvehicle.js`和`npassenger.js`两个程序，从而启动测试。

```shell
# 在terminal_1中打开vehicle测试脚本 
node nvehicle.js
# 在terminal_2中打开passenger测试脚本
node passenger.js
```
