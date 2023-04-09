//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Splitter.sol";

contract SplitterFactory {
  mapping(address => Splitter[]) public splitters;

  function createSplitter(
    address[] memory users,
    uint256[] memory _splits
  ) public returns (address) {
    Splitter splitter = new Splitter(
      payable(msg.sender),
      users,
      _splits
    );
    splitters[msg.sender].push(splitter);
    return address(splitter);
  }

  function getSplitters(address user) public view returns (address[] memory) {
    Splitter[] memory userSplitters = splitters[user];
    address[] memory ret = new address[](userSplitters.length);
    for (uint i = 0; i < userSplitters.length; i++) {
      ret[i] = address(userSplitters[i]);
    }
    return ret;
  }
}
