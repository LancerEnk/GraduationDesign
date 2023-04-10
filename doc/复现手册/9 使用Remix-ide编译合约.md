# 00 打开Remix-ide

我的整个项目是在虚拟机中运行的，因此我在虚拟机中使用网页打开Remix-ide，其网址为：https://remix.ethereum.org

**！要挂vpn！不然大概率上不去 Remix-ide！**

> 挑个好的时间上vpn吧...我的vpn一到晚上就爆卡无比555

# 01 使用Remix-ide编译合约

在 `Remix-ide` 中选取合约版本为 `0.5.17+commit.d19bba13`。
然后在 `contract` 文件夹中新建 StoreMap.sol、StoreTraffic.sol、credit.sol 三个文件。

依次编译这三个合约，会得到三个对应的json文件。

在这三个合约的编译界面，会显示“”

copy合约对应的 `abi` 和 `bytecode`，在自己的本地文档中进行记录。

> 在记录的时候有可能会因为数据太长太多而把word卡住...只能慢慢等咯

## 处理abi接口

打开[这个用于JSON压缩转义的网站](https://www.bejson.com/zhuanyi/)，将获得的`abi`（形如`"abi": [...]`）丢进去，点击输入框下方的“压缩并转义”，复制走从第一个`[`开始之后的全部内容。

> 在使用 `remix-ide` 编译的时候，出现一个问题，即在 `remix-ide` 中获取的json文件们中的abi接口里都有很多很多空格，这些空格会影响geth控制台中的输入，使部署合约时出错，因此需要用 `removeSpace.py` 文件对abi接口段进行处理，将abi接口中的空格删去。

如果copy到的 `abi` 带有很多空格，可以用程序 `removeSpace.py` 对其进行处理。

* 在使用 `removeSpace.py` 时，需要同步建立 `old.txt` 和 `new.txt` 两个文本文件，在 `old.txt` 中存储待处理的abi数据，在vscode中运行文件 `removeSpace.py`，所得的无空格输出即存放在 `new.txt` 中。

## 处理bytecode

从 `Remix-ide` 中直接copy获取到的 `bytecode` 应该是只有数字的。

需要对它进行处理，在首位添加 `0x` ，在本地文档中进行保存，待取用。

举个例（实际的bytecode会比例子长很多...）：

* 粘贴的bytecode：

    ```js
    bytecode = "60806040"
    ```

* 处理之后保存的bytecode：

    ```js
    bytecode = "0x60806040"
    ```

## 拼接要输进geth控制台中的JavaScript指令

粘贴的主要格式如下：

对下述代码的一些小注释（以StoreMap.sol为例）：

* StoreMapContract = web3.eth.contract(abi);
  * 这一句的意思是，`StoreMap` 合约由此 `abi` 对应。
* StoreMap = StoreMapContract.new
  * 这里的意思是，这个部署的合约名叫 `StoreMap`
    * 可以把 `StoreMap` 修改成任何你想叫的名字 `xxx`
    * 在geth进行合约地址查询时，即通过 `xxx.address` 完成查询
* gas: '3000000',position:"w2511111111111",txtime:277001
  * 这一串也是可以随意修改的，但图省事就不用变了

### StoreMap.sol的部署指令

```js
abi = JSON.parse('复制来的abi内容')
bytecode = "处理过的bytecode"

StoreMapContract = web3.eth.contract(abi);
web3.eth.estimateGas({data: bytecode})
StoreMap = StoreMapContract.new({
    from: web3.eth.accounts[0], 
    data: bytecode, 
    gas: '3000000',
    position:"w2511111111111",
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

### StoreTraffic.sol的部署指令

```js
abi = JSON.parse('复制来的abi内容')
bytecode = "处理过的bytecode"

trafficContract = web3.eth.contract(abi);
web3.eth.estimateGas({data: bytecode})
traffic = trafficContract.new({
    from: web3.eth.accounts[0], 
    data: bytecode, 
    gas: '4000000',
    position:"w2511111111111",
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

### credit.sol的部署指令

```js
abi = JSON.parse('复制来的abi内容')
bytecode = "处理过的bytecode"

passengerCredit = web3.eth.contract(abi);
web3.eth.estimateGas({data: bytecode})
pacre = passengerCredit.new({
    from: web3.eth.accounts[0], 
    data: bytecode, 
    gas: '4000000',
    position:"w2511111111111",
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

---

将上述内容整理完毕，存档，待用。

> 可以把所有拼接好的js代码和三个合约对应的地址存放在同一个文件下，在该word文件中使用标题分级，便于查看。
