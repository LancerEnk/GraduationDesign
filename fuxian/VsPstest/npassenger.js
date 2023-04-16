let fs=require('fs');
let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546"));
let web3Map;
if (typeof web3 !== "undefined") {
    web3Map = new Web3(web3.currentProvider);
  } else {
    web3Map = new Web3(
      new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546")
	);}
//Traffic contract
var trafficContractAddress = '0x3e70f4d2c7e52c26034834fb820ee8acf05523ea';
let trafficContractAbi = JSON.parse(fs.readFileSync('./trafficAbi.json', 'utf-8'));
var trafficContract = new web3.eth.Contract(trafficContractAbi,trafficContractAddress);

let passengerIdList = ["0x456c4df0610c7611ae8bcaed32dd1d94e88ceca4"];
let passengerPositionList = [["wx4er200z2r","wx4erw9rnsr"]];
let ethAccount="0x12d0e4381ef94a70a49252e35b9a65fadd3872b9";


async function initPassenger(passengerId,passengerStart,passengerEnd){
	trafficContract.methods
	.initPassenger(passengerId, web3Map.utils.asciiToHex(passengerStart))
	.send({
	  //debug:changeID
	  from: ethAccount,
	  //from: passengerId,
	  gas: 500000,
	  position: "wx411111111111",
	  txtime: 278000,
	})
	.then((error, result) => {
	  console.log("乘客位置已记录");
	  //更新乘客信息
	  trafficContract.methods
		.setPassengerDemand(
		  passengerId,
		  web3Map.utils.asciiToHex(passengerStart),
		  web3Map.utils.asciiToHex(passengerEnd)
		)
		.send({
		  from: ethAccount,
		  gas: 5000000,
		  position: "wx411111111111",
		  txtime: 278000,
		})
		.then(() => {
		  console.log("乘客出发点和目的地已记录在智能合约");
	
		});
	});
}
let passengerMessage = {};
async function passengerUnit(){
    for(let i = 0; i < passengerIdList.length; i++){

		let passengerId = passengerIdList[i];
		let passengerStart=passengerPositionList[i][0]
		let passengerEnd=passengerPositionList[i][1]
		passengerMessage.passengerStart=passengerStart;
		passengerMessage.passengerEnd=passengerEnd;
		let isboard = false;
		console.log("passenger: "+(i+1)+"  :  begin to test")
		//passengerEvent
		trafficContract.events.routeEvent(function(error, event){
			console.log("route event: ",event)
			if(error){
				console.log("error: ",error);
			}
			if(event.returnValues.passengerId.slice(0,42) == passengerId.toLowerCase()){
				console.log("debug")
				if(isboard == false){
					isboard = true
					console.log(passengerMessage.vehicleId);
					trafficContract.methods.confirmBoard(passengerMessage.vehicleId).send({ from: ethAccount, gas: 5000000,position:"wx411111111111",txtime:278000}).then(function(result){
						console.log("乘客确认上车");
					})
				}else{
					console.log("乘客到达目的地");
					 getOff(passengerId, passengerMessage.vehicleId);

		
					isboard = false;
				}
			}
		})
		 initPassenger(passengerId,passengerStart,passengerEnd);
		getVehicle(passengerId,passengerStart);
		
    }
}


async function getOff(passengerId, vehicleId){
	console.log("开始支付订单");
	web3.eth.sendTransaction({
		from: ethAccount,
		to: passengerId,
		value: 50000000,
		position:"wx411111111111",
		txtime:278000
	})
	.then(function(receipt){
		trafficContract.methods.confirmPay(vehicleId).send({ from: ethAccount, gas: 5000000,position:"wx411111111111",txtime:278000}).then(function(result){
			console.log("乘客支付了订单");
			console.log(passengerMessage);
			initPassenger(passengerId,passengerMessage.passengerStart,passengerMessage.passengerEnd);
			getVehicle(passengerId,passengerMessage.passengerStart);
			
		})
	});
}

async function getVehicle(passengerId, positionGeohash){
	var count=0;
	trafficContract.methods
	.getVehicle(web3Map.utils.asciiToHex(positionGeohash))
	.call({ from: passengerId, gas: 500000000 })
	.then(
	  (result1) => {
		trafficContract.methods
		  .setVehicleStatus(
			result1[1],
			passengerId,
			web3Map.utils.asciiToHex(positionGeohash)
		  )
		  .send({
			from: ethAccount,
			gas: 5000000,
			position: "wx411111111111",
			txtime: 278000,
		  })
		  .then(
			(result2) => {
			  console.log("车辆选择成功:", result1);
			  var vehiclePosition = web3Map.utils
				.hexToAscii(result1[0])
				.slice(0, 11);
			  console.log("vehicle at " + vehiclePosition);
			  var vehicleId = result1[1].slice(0, 42);
			  passengerMessage.vehicleId=vehicleId;
			},
			(error2) => {
			  count++;
			  if (count < 50) {
				console.log("调度车辆中");
				getVehicle(passengerId, positionGeohash);
			  } else {
				console.log("当前没有合适的车辆: " + count);
				count = 0;
			
			  }
			}
		  );
	  },
	  (error1) => {
		// console.log("error1: ", error1);
		count++;
		if (count < 50) {
		  console.log("调度车辆中");
		  getVehicle(passengerId, positionGeohash);
		} else {
		  console.log("当前没有合适的车辆: " + count);
		  count = 0;
		}
	  }
	);
}

passengerUnit();









