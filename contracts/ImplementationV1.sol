// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Impv1 {
    int256 private counter;

    function initializer(int256 _counter) public {
        counter = _counter;
    }

    function increment() public {
        counter++;
    }

    function decrement() public {
        counter--;
    }

    function getCounter() public view returns (int256) {
        return counter;
    }
}
