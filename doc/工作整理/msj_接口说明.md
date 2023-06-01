# msj_接口说明

> 笔者在完成毕设的过程中，改动过的代码部分的接口说明
> [在线表格编辑链接](https://tool.lu/tables)

## 01 合约部分的代码文件说明

### 01-1 StoreMap_msj.sol

是0514演示的版本，该版本对应的合约是：第一次基本上改完bug，投入使用的合约代码。

#### 01-1-1 函数

| 函数名称          | input                                                                          | output                                                                                      | 功能/作用备注                                                      | 与其他函数/映射/变量的关系                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| updatePathSituation() | astarOriginRoute：规划出的路径                                          | 无                                                                                         | 更新实时路况的主函数                                           | （1）调用sGtG映射；<br>（2）调用calVehicleSpeed()、calPathSpeed()、calPathSituation()函数；<br>（3）更新types结构体存储数据；<br>（4）更新aCount； |
| calVehicleSpeed()     | 无                                                                            | vehicleSpeed：设计的车辆速度                                                         | 模拟车辆速度的函数                                              | 返回值vehicleSpeed作为calPathSpeed()的input数据，在updatePathSituation()中被调用                                         |
| calPathSpeed()        | vSpeed：车辆速度                                                          | pSpeed：道路速度                                                                       | 计算道路速度的函数                                              | 返回值更新为types结构体的数据，在updatePathSituation()中被调用                                                       |
| calPathSituation()    | gid：路段编号                                                             | 无                                                                                         | 计算实时路况的函数                                              | 更新types结构体数据，在updatePathSituation()中被调用                                                                      |
| calPathCostToAdd()    | gid：路段编号                                                             | cost：当前路段的实时路况计算成本                                              | 计算改进A*算法中C(n)值的函数                                  | 在astar()中被调用                                                                                                                 |
| printgeotogid()       | astarOriginRoute：规划出的路径                                          | len：规划结果的长度；gids：最后一个geohash值对应的gid值                  | 测试是否能通过规划结果中的geohash值正确借由sGtG映射对应到该路段的gid值上 | 在终端中被直接调用测试                                                                                                      |
| printfactspeed()      | astarOriginRoute：规划出的路径                                          | vh：vHistory；vc：vCurrent；vf：vFact；vd：vDefault                                  | 测试记录规划结果对应的路段更新后的路况数据          | 在终端中被直接调用                                                                                                            |
| testsGtG()            | testgeo：geohash值                                                           | testgid：gid值                                                                            | 测试是否能通过geohash值正确借由sGtG映射对应到该路段的gid值上 | 在终端中被直接调用测试                                                                                                      |
| astar()               | startGeohash：待规划路径起点的geohash值；endGeohash：待规划路径终点的geohash值 | backwards：规划结果；costAll：总代价成本；psCost：测试用的成本计算结果；times：路况更新次数 | A*算法的核心实现函数                                            | 在终端中被直接调用，本函数调用calPathCostToAdd()函数，用于添加实时路况函数计算的成本                  |

#### 01-1-2 变量

| 变量名称 | 类型  | 功能/作用备注  |
| -------- | ------- | -------------------- |
| aCount   | uint256 | 计算实时路况更新次数 |

#### 01-1-3 映射

| 映射名称 | 类型  | 功能/作用备注  | 调用关系 |
| -------- | ------- | -------------------- | ------ |
| sGtG   | mapping (bytes32 => uint256) | 维护同一路段属性的映射关系：<br>关键字为geohash编码，值的查询结果为gid值 | （1）在add_onetype()函数中被调用，用于更新区块链上数据；<br>（2）在其他许多函数中被调用，用于查询数据。

### 01-2 StoreMap_new.sol

是0520跑数据的版本，该版本对应的合约是：用于测试基于实时路况改进后的A*算法耗费gas值的合约代码。

#### 01-2-1 函数

与 `01-1-1 函数` 中大部分保持一致，修改的地方见下表。

| 函数名称 | input                                                                          | output                                                                                            | 功能/作用备注                           | 与其他函数/映射/变量的关系                                               |
| -------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| astar()  | startGeohash：<br>待规划路径起点的geohash值；<br>endGeohash：<br>待规划路径终点的geohash值 | backwards：规划结果；costAll：总代价成本；gasCost：算法运行前后，耗费的gas值；<br>times：路况更新次数 | A*算法的核心实现函数；添加了测试数据gasCost。 | 在终端中被直接调用，本函数调用calPathCostToAdd()函数，用于添加实时路况函数计算的成本 |

#### 01-2-2 变量

与 `01-1-2 变量` 中保持一致。

#### 01-2-3 映射

与 `01-1-3 映射` 中保持一致。

### 01-3 StoreMap_old.sol

是0520跑数据的版本，该版本对应的合约是：用于测试传统A*算法耗费gas值的合约代码。

#### 01-3-1 函数

在成佳壮完善的StoreMap.sol基础上，只做如下表的改动。

| 函数名称 | input                                                                          | output                                                                       | 功能/作用备注                           | 与其他函数/映射/变量的关系 |
| -------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | --------------------------------------------- | -------------------------- |
| astar()  | startGeohash：<br>待规划路径起点的geohash值；<br>endGeohash：<br>待规划路径终点的geohash值 | backwards：规划结果；<br>costAll：总代价成本；<br>gasCost：算法运行前后，耗费的gas值 | A*算法的核心实现函数；<br>添加了测试数据gasCost。 | 在终端中被直接调用 |

#### 01-3-2 变量

在成佳壮完善的StoreMap.sol基础上，未作改动。

#### 01-3-3 映射

在成佳壮完善的StoreMap.sol基础上，未作改动。

## 02 终端部分的代码文件说明

> 首先给出笔者改动过逻辑的代码的树结构，接下来笔者将依次对其分析。

**整体树结构**：

```bash
cjz_underg_2021_09
├── tree_blockchain
└── VsPstest
```

### 02-1 cjz_underg_2021_09文件夹

> 本部分：终端 - 浏览器代码，根据合约进行改动

**树结构**：

```bash
cjz_underg_2021_09
├── passenger_test.py
├── vehicle_test.py
├── sys_passenger_region_noPos.html
├── sys_vehicle_region.html
└── testdecode.js
```

#### passenger_test.py

运行乘客端Web测试的脚本，修改了浏览器显示逻辑、乘客提出的请求次数与时间间隔。

```py
# 自动打开开发者工具
chrome_options.add_argument('--auto-open-devtools-for-tabs')
# 修改初始浏览器窗口大小
wd1.set_window_size(1000, 1000)
# 修改乘客提出的请求次数与时间间隔
workConfig(15, 5)
```

#### vehicle_test.py

运行车辆端Web测试的脚本，修改浏览器显示逻辑、延长浏览器工作时间。

```py
# 修改初始浏览器窗口大小
wd1.set_window_size(1000, 1000)
wd2.set_window_position(470*index, 550)
# 延长浏览器工作时间
time.sleep(3000)
```

#### sys_passenger_region_noPos.html

乘客端Web测试的网页代码，修改为geth-tree适用的交互方式。

```js
// 交互方式修改举例
// geth1
trafficContract.methods.initPassenger(passengerId, web3Map.utils.asciiToHex(passengerStart)).send({ from: passengerId, gas: 500000, position: "w3511111111111", txtime: 278000 }).then(function (error, result) {
// 修改为:
// geth-tree
trafficContract.methods.initPassenger(passengerId, web3Map.utils.asciiToHex(passengerStart)).send({ from: passengerId, gas: 500000, position: "wx411111111111", txtime: 278000 }).then(function (error, result) {
```

笔者未在此代码文件中对乘客端网页整体的运行逻辑进行修改。

#### sys_vehicle_region.html

车辆端Web测试的网页代码，修改为geth-tree适用的交互方式、根据合约的改动修改运行逻辑。

```js
// 交互方式修改举例
// geth1
await trafficContract.methods.deleteVehicle(vehicleId).send({ from: vehicleId, gas: 5000000, position: "w3511111111111", txtime: Date.now() }).then(function (result) {
// 修改为
// geth-tree
await trafficContract.methods.deleteVehicle(vehicleId).send({ from: vehicleId, gas: 5000000, position: "wx411111111111", txtime: Date.now() }).then(function (result) {
```

调用合约部分：

| js方法名 | 调用的合约名 | 调用的合约中函数名 | 调用方式 | input                                | output                                                                               | 备注                             |
| ------------- | ------------ | --------------------- | -------- | ------------------------------------ | ------------------------------------------------------------------------------------ | ---------------------------------- |
| initVehicle() | StoreMap.sol | testsGtG()            | call     | geohash值                           | gid值                                                                               | 测试合约中的sGtG映射是否能正常工作 |
| pickUp()      | StoreMap.sol | astar()               | call     | 车辆位置geohash值，乘客起点geohash值 | 规划路径backwards，该路径对应总代价成本costAll，运行次数times，算法消耗gas值gasUsage | 无                                |
| manageToEnd() | StoreMap.sol | astar()               | call     | 乘客起点geohash值，乘客终点geohash值 | 规划路径backwards，该路径对应总代价成本costAll，运行次数times，算法消耗gas值gasUsage | 无                                |
| manageToEnd() | StoreMap.sol | printgeotogid()       | call     | 规划的路径debugaroute           | 路径中最后一个geohash值对应的gid值                                       | 测试debugroute是否能正常传给合约 |
| manageToEnd() | StoreMap.sol | printfactspeed()      | call     | 规划的路径debugaroute           | 更新的路段的vHistory、vCurrent、vFact、vDefault值                          | 测试并获取路况数据        |
| manageToEnd() | StoreMap.sol | updatePathSituation() | send     | 规划的路径debugaroute           | 无                                                                                  | 更新路况                       |

其他：

* debugaroute传回给合约的预处理过程：

    ```js
    let debugaroute = [];
    // let aaa =[];
    for(let i=0;i<astarRoute.length;i++){
            var str1 = "0x";
            var str2 = "000000000000000000000000000000000000000000";
            let temp = web3Map.utils.asciiToHex(astarRoute[i]);
            for(let j=2;j<24;j++){
                str1 = str1 + temp[j];
            }
            str1 = str1 + str2;
            debugaroute.push(str1);
    }
    console.log("test if is this question.");
    console.log("debugaroute:",debugaroute);
    ```

  * 合约使用的bytes32要求必须是`64位的16进制数`，如果传其他的数组数据进去会狠狠报错。
  * 这里的处理是为了把astarRoute变成存`64位的16进制数`的数组
* 地图绘制过程：

    | js中的方法名        | input | output | 备注                                |
    | ------------------------ | ----- | ------ | ------------------------------------- |
    | updateVehiclemPosition() | 无   | 无    | 显示manageToEnd()过程中的车辆运行轨迹 |
    | updateVehiclepPosition() | 无   | 无    | 显示pickUp()过程中的车辆运行轨迹 |

#### testdecode.js

笔者提取整合的 `由Geohash反推经纬度结果` 的测试脚本，为了将该模块引入网页代码中，作为地图渲染的一环节，地图渲染整件事未完成，但本代码可用。

* 待解码的geohash值在代码中直接指定，通过运行，在控制台中完成输出。

### 02-2 tree_blockchain文件夹

> 本部分：地图相关文件

**树结构**：

```bash
tree_blockchain
├── uploadmap_cjz_3.js
├── roadGenerate.js
├── out_wx4e.json                   # 大地图文件
├── out_wx4ep.json                  # 小地图文件
├── out_wx4en.json                  # 小地图文件
├── out_wx4er.json                  # 小地图文件
├── out_wx4eq.json                  # 小地图文件
├── build
│   ├── getData_newA_StoreMap.json  # 测试 - 新合约的json文件存档
│   ├── getData_oldA_StoreMap.json  # 测试 - 旧合约的json文件存档
│   ├── newSol_StoreMap.json        # 运行 - 新合约的json文件存档
│   ├── oldSol_StoreMap.json        # 运行 - 旧合约的json文件存档
│   └── StoreMap.json               # 实际运行 and 测试时，被调用的json文件
└── calDistance_msj.js              # 提取出的计算经纬度点间距离的js脚本
```

#### uploadmap_cjz_3.js

在这里主要为了debug增加了一些console.log输出。

但按照笔者的猜想，可以在未来读者的工作中，修改此代码文件，从而根据数据库中的数据上传道路的限速，作为其缺省速度。

#### roadGenerate.js

这是前人写的画方格地图的脚本。笔者通过修改generateRoad()中的rowCol(x,y)，来选择画x行y列的地图。

* 可以在rowCol()中的如下字段修改方格的长宽经纬度：

  ```js
  let deltaLon = j * 0.0054931640625;
  let deltaLat = i * 0.00274658203125;
  ```

### 02-3 VsPstest文件夹

> 本部分：终端 - 脚本测试代码，根据合约进行改动

树结构：

```bash
VsPstest
├── drawTime.py
├── mapAbi_new.json                     # 新地图合约的Abi
├── mapAbi_old.json                     # 旧地图合约的Abi
├── npassenger_new.js
├── npassenger_old.js
├── nvehicle_new.js
├── nvehicle_old.js
├── trafficAbi.json                     # 交通合约的Abi
├── vehicleTimeInfo_new.json
├── vehicleTimeInfo_old.json            # 旧合约的测试数据
├── wayInfo_new.json
└── wayInfo_old.json                    # 旧合约的测试数据
```

#### drawTime.py

根据测试数据，绘制箱线图的python脚本，重要的变量如下：

| 变量名  | 变量含义                 | 来源                                             |
| ---------- | ---------------------------- | -------------------------------------------------- |
| y_axis_nTE | 导航去乘客终点的时间数据列表 | vehicleTimeInfo_new.json，vehicleTimeInfo_old.json |
| y_axis_up  | 更新路况的时间数据列表 | vehicleTimeInfo_new.json，vehicleTimeInfo_old.json |
| y_axis_nTS | 导航去乘客起点的时间数据列表 | vehicleTimeInfo_new.json，vehicleTimeInfo_old.json |
| avgt       | 导航去乘客终点的时间均值 | y_axis_nTE                                         |
| avgu       | 更新路况的时间均值  | y_axis_up                                          |
| avgs       | 导航去乘客起点的时间均值 | y_axis_nTS                                         |

#### npassenger_old.js 与 npassenger_new.js

模拟乘客端行为的js测试脚本，修改为geth-tree适用的交互方式，与`sys_passenger_region_noPos.html`的改动思路相同。

#### nvehicle_old.js 与 nvehicle_new.js

模拟车辆端行为的js测试脚本，修改为geth-tree适用的交互方式，并根据合约的改动修改运行逻辑，与`sys_vehicle_region.html`的改动思路相同，基本上就是把前面的实现过程照搬过来。

```js
// nvehicle_new.js
// --msj to add updatePathSituation()
let uptime1 = Date.now();
let debugaroute = [];
for(let i=0;i<astarRoute.length;i++){
        var str1 = "0x";
        var str2 = "000000000000000000000000000000000000000000";
        let temp = web3.utils.asciiToHex(astarRoute[i]);
        for(let j=2;j<24;j++){
            str1 = str1 + temp[j];
        }
        str1 = str1 + str2;
        debugaroute.push(str1);
}
mapContract.methods.printfactspeed(debugaroute).call({from: vehicleId, gas:50000000000}).then(function(result){
    pathInfo.vh=result[0];
    pathInfo.vc=result[1];
    pathInfo.vf=result[2];
    pathInfo.vd=result[3];
});
mapContract.methods.updatePathSituation(debugaroute).send({from: vehicleId, gas: 5000000, position: vehiclePosition, txtime: Date.now() }).then(function(result){
    console.log("Update Path Situation");
},function(error){
    console.log("manageToEnd() - error:",error);
});
let uptime = Date.now()-uptime1;
timeInfo.update = uptime;
// --msj

// nvehicle_old.js 不需要做改动，因为没有实时路况计算的过程
```
