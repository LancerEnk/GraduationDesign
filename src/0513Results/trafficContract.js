//Traffic contract
// geth1
// var trafficContractAddress = '0x90db0b1839de1e7a0a7c18db1f5236df95832f10';
// geth-tree
var trafficContractAddress = '0xfa6b8f0b92b323c28557faf69da028e33856f6ca';
var trafficContractServer = 'http://localhost:8545';//of no use
var trafficContractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "passengerGeohash",
				"type": "bytes32"
			}
		],
		"name": "Myevent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			}
		],
		"name": "boardEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			}
		],
		"name": "payEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			}
		],
		"name": "rejectEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			}
		],
		"name": "routeEvent",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPrecision",
				"type": "uint256"
			}
		],
		"name": "changePrecision",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			}
		],
		"name": "confirmBoard",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			}
		],
		"name": "confirmPay",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			}
		],
		"name": "deleteVehicle",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "geohash",
				"type": "string"
			}
		],
		"name": "getLatBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "geohash",
				"type": "string"
			}
		],
		"name": "getLonBlock",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			}
		],
		"name": "getPassengerEnd",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "end",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			}
		],
		"name": "getPassengerPos",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "position",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			}
		],
		"name": "getRoutes",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "route",
				"type": "bytes32[]"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "passengerGeohash",
				"type": "bytes32"
			}
		],
		"name": "getVehicle",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "passengerGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32[]",
				"name": "regionVehicles",
				"type": "bytes32[]"
			}
		],
		"name": "getVehicleByRegion",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			}
		],
		"name": "getVehicleStatus",
		"outputs": [
			{
				"internalType": "int32",
				"name": "",
				"type": "int32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "geohash",
				"type": "bytes32"
			}
		],
		"name": "initPassenger",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "geohash",
				"type": "bytes32"
			}
		],
		"name": "initVehicle",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "nextGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "endGeohash",
				"type": "bytes32"
			}
		],
		"name": "manhattan",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "startGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "endGeohash",
				"type": "bytes32"
			}
		],
		"name": "setPassengerDemand",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "passengerGeohash",
				"type": "bytes32"
			}
		],
		"name": "setPassengerPosition",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			}
		],
		"name": "setRejectVehicleStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "vehicleGeohash",
				"type": "bytes32"
			}
		],
		"name": "setVehicle",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "passengerGeohash",
				"type": "bytes32"
			}
		],
		"name": "setVehicleStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			}
		],
		"name": "setVehicleStatusEmpty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "geohash1",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "geohash2",
				"type": "bytes32"
			}
		],
		"name": "sliceGeoHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "vehicleId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "passengerId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32[]",
				"name": "route",
				"type": "bytes32[]"
			}
		],
		"name": "storeRoutes",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
