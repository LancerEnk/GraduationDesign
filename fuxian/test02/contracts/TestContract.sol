// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.16;

contract TestContract {
    struct Vehicle {
        uint256 status;
    }

    mapping(string => Vehicle) vehicles;

    //返回车辆id
    event Myevent(string res);

    //当车辆状态改变后触发事件，返回车辆id
    function setVehicleStatus(string memory uuid) public {
        assert(vehicles[uuid].status == 0);
        emit Myevent(uuid);
        vehicles[uuid].status = 1;
    }
}