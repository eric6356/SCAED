pragma solidity ^0.4.15;

contract SimpleStorage {
    uint public storedData;

    function simplestorage(uint initVal) public {
        storedData = initVal;
    }

    function set(uint x) public {
        storedData = x;
    }

    function get() constant public returns (uint retVal) {
        return storedData;
    }
}
