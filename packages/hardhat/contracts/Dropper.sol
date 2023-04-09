//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Dropper is ReentrancyGuard {
  // event ETHdropped(address indexed from, address indexed to, uint256 amount);

  modifier validList(address[] memory users, uint256[] memory values) {
    require(users.length == values.length, "Users - Invalid length");
    require(users.length > 0, "Empty calldata");
    _;
  }

  constructor() payable {}

  function sendETH(
    address[] memory users,
    uint256[] memory values
  ) public payable nonReentrant validList(users, values) {
    uint256 totalETHValue = msg.value;

    // handle indexes drop
    for (uint256 i = 0; i < users.length; i++) {
      address currentUser = users[i];
      require(totalETHValue > 0, "Not enough ETH to complete this transaction");
      require(currentUser != address(0), "No burning ETH");
      totalETHValue -= values[i];
      (bool sent, ) = currentUser.call{value: values[i]}("");
      require(sent, "Failed to send Ether");

      // It's gas inefficient to events in a loop. Uncomment if FE needs this later.
      // emit ETHdropped(msg.sender, currentUser, values[i]);
    }
  }

  // to support receiving ETH by default
  receive() external payable {}

  fallback() external payable {}
}
