//var mapContractAddress = "0xc7941e7d6da833bc5634d5184bf417042560b9fa";
// geth1
var mapContractAddress = "0x3add7513b489e335a4c1401a5b9f2073acb1ce2f";
// geth-tree
//var mapContractAddress = "0xeca420f01f2d1dc64237aa9a87dc04de68afa15b";
var mapContractServer = 'http://localhost:8545';//of no use
var mapContractAbi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "add_area_line",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			},
			{
				"internalType": "int32",
				"name": "minzoom",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "cost",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "source",
				"type": "int32"
			},
			{
				"internalType": "int32",
				"name": "target",
				"type": "int32"
			},
			{
				"internalType": "bool",
				"name": "oneway",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "building",
				"type": "bool"
			},
			{
				"internalType": "bytes32",
				"name": "highway",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "name",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "gtype",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32[]",
				"name": "path",
				"type": "bytes32[]"
			}
		],
		"name": "add_onetype",
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
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "adjacencyList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "adjnum",
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
				"name": "startGeohash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "endGeohash",
				"type": "bytes32"
			}
		],
		"name": "astar",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "backwards",
				"type": "bytes32[]"
			},
			{
				"internalType": "uint256",
				"name": "costAll",
				"type": "uint256"
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
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "calPathCostToAdd",
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
				"name": "sourceGeo",
				"type": "bytes32"
			}
		],
		"name": "calTraffic",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "calVehicleSpeed",
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
				"internalType": "uint256",
				"name": "gid",
				"type": "uint256"
			}
		],
		"name": "calvCurrent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newP",
				"type": "uint256"
			}
		],
		"name": "changeP",
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
		"inputs": [],
		"name": "dequeue",
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
				"name": "geohash",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "cost",
				"type": "uint256"
			}
		],
		"name": "enqueue",
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
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "geo_maps",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "num",
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
				"name": "vehicleId",
				"type": "bytes32"
			},
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
		"name": "getRoutesFromTraffic",
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
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "get_types",
		"outputs": [
			{
				"internalType": "int32[]",
				"name": "feature",
				"type": "int32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "names",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "highways",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "gtypes",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32[]",
				"name": "path",
				"type": "bytes32[]"
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
		"inputs": [],
		"name": "testBug_astar",
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
		"constant": true,
		"inputs": [],
		"name": "top",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]


/*[
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "adjacencyList",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "adjnum",
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
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "geo_maps",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "num",
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
          "name": "hash",
          "type": "bytes32"
        }
      ],
      "name": "get_types",
      "outputs": [
        {
          "internalType": "int32[]",
          "name": "feature",
          "type": "int32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "names",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "highways",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "gtypes",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "path",
          "type": "bytes32[]"
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
          "name": "gid",
          "type": "uint256"
        },
        {
          "internalType": "int32",
          "name": "minzoom",
          "type": "int32"
        },
        {
          "internalType": "int32",
          "name": "cost",
          "type": "int32"
        },
        {
          "internalType": "int32",
          "name": "source",
          "type": "int32"
        },
        {
          "internalType": "int32",
          "name": "target",
          "type": "int32"
        },
        {
          "internalType": "bool",
          "name": "oneway",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "building",
          "type": "bool"
        },
        {
          "internalType": "bytes32",
          "name": "highway",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "name",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "gtype",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32[]",
          "name": "path",
          "type": "bytes32[]"
        }
      ],
      "name": "add_onetype",
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
          "name": "hash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "gid",
          "type": "uint256"
        }
      ],
      "name": "add_area_line",
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
          "name": "startGeohash",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "endGeohash",
          "type": "bytes32"
        }
      ],
      "name": "astar",
      "outputs": [
        {
          "internalType": "bytes32[]",
          "name": "backwards",
          "type": "bytes32[]"
        },
        {
          "internalType": "uint256",
          "name": "costAll",
          "type": "uint256"
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
          "internalType": "uint256",
          "name": "newP",
          "type": "uint256"
        }
      ],
      "name": "changeP",
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
      "constant": true,
      "inputs": [],
      "name": "top",
      "outputs": [
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
      "constant": false,
      "inputs": [],
      "name": "dequeue",
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
          "name": "geohash",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "cost",
          "type": "uint256"
        }
      ],
      "name": "enqueue",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
*/
