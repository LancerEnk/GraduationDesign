# 00 环境准备

> 如果已做到现在这个实验，笔者将默认为你已经完成了复现手册中的 `第1~8个实验`。即：成功在 `geth1` 的基础上完成了出租车调度系统的复现。

本实验基于 `geth-tree` 完成，[下载地址](https://github.com/LancerEnk/GraduationDesign/blob/main/geth1.zip)在这里，整体的复现步骤与[《7 调度系统复现实验》](https://github.com/LancerEnk/GraduationDesign/blob/main/doc/%E5%A4%8D%E7%8E%B0%E6%89%8B%E5%86%8C/7%20%E8%B0%83%E5%BA%A6%E7%B3%BB%E7%BB%9F%E5%A4%8D%E7%8E%B0%E5%AE%9E%E9%AA%8C.md)基本一致。

# 01 常用命令

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
```

检查余额：

```js
for (i = 0; i < eth.accounts.length; i++) { console.log(eth.getBalance(eth.accounts[i])) }
```

# 02 初始化并启动区块链

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

在打开的控制台中输入`exit`退出控制台，然后删除目录`treeTaxiSystem/gethdata/geth`。随后，再运行一次初始化区块链和启动区块链的代码。此时，所有账户应该都有余额了。可以用`eth.geBalance(账户地址)`来检查余额.

**重要步骤**↓

* 每次重新启动JS控制台，都需要再解锁一次账户。
    > 如果不解锁账户的话，可能会导致miner.start()无法挖到合约地址

# 03 部署合约

首先是`StoreMap.sol`合约。该合约的`Solidity`源代码位于仓库的`CompileWithTruffle/contracts/StoreMap.sol`。使用《9 关于使用truffle编译solidity源代码》中介绍的方法获得`abi`和`bytecode`之后，打开[这个用于JSON压缩转义的网站](https://www.bejson.com/zhuanyi/)，将获得的`abi`（形如`"abi": [...]`）丢进去，点击输入框下方的“压缩并转义”，复制走从第一个`[`开始之后的全部内容。

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

## StoreTraffic合约

与StoreMap.sol的部署方法一致。

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

这就是StoreTraffic合约的地址了。妥善保存，以供日后使用。

# 04 上传地图

`upload_map`文件夹找到文件`uploadmap_cjz_3.js`，打开并修改一下其中的内容：

```js
// -- snip --

// contract address 
var myContractInstance = MyContract.at("StoreMap合约的地址");
var account = "eth.accounts[0]的内容";

// -- snip --
```

注意其中发送交易的位置`position`需要为wx4范围,不然无法打包交易。

* 即可以在原 `geth1` 支持的出租车调度系统的`uploadmap_cjz_3.js`文件的基础上，把发送交易时的`"w3511111111111"`改成`"wx411111111111"`。

# 05 修改代码

## 修改 regionid 和 position

启动过程和原来的一致，只是启动文件根据区块链的不同有所变化，主要是`regionid`和`position`的变化。

例如，在 `sys_passenger_region_noPos.html` 中做如下改动：

```js
// geth1

trafficContract.methods.confirmPay(vehicleId).send({ from: passengerId, gas: 5000000, position: "w3511111111111", txtime: 278000 }).then(function (result) {

// geth-tree

trafficContract.methods.confirmPay(vehicleId).send({ from: passengerId, gas: 5000000, position: "wx411111111111", txtime: 278000 }).then(function (result) {
```

上述改动需要在代码中所有牵扯到发送交易的地方进行修改。

## 更改文件以加入账户信息

同《7 调度系统复现实验》中此部分的内容一样，对`js/py`文件中的相关部分进行修改。

# 06 启动测试

在挖矿的状态下，分别启动`vehicle_test.py`和`passenger_test.py`两个程序，从而启动测试。
