// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.16;

contract InfoContract{
   string public fName;
   uint public age;
   
   constructor() public {
        fName = "test";
        age = 11;
    }

   function setInfo(string memory _fName, uint _age) public payable{
       fName = _fName;
       age = _age;
   }
   
   function getInfo() public view returns (string memory, uint) {
       return (fName, age);
   }   
}