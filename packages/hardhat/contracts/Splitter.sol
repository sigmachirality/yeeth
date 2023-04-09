//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Splitter is ReentrancyGuard {
  // event ETHsplit(address indexed from, address indexed to, uint256 amount);
  address payable owner;
  address[] public recipients;
  mapping(address => uint256) public splits;
  uint256 public summedSplits;

  modifier validList(address[] memory users, uint256[] memory _splits) {
    require(users.length == _splits.length, "Users - Invalid length");
    require(users.length > 0, "Empty calldata");
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only owner can update splits");
    _;
  }

  constructor(
    address payable _owner,
    address[] memory users,
    uint256[] memory _splits
  ) payable validList(users, _splits) {
    owner = _owner;
    recipients = users;
    for (uint256 i = 0; i < users.length; i++) {
      splits[users[i]] = _splits[i];
      summedSplits += _splits[i];
    }
  }

  function updateUserSplits(
    address[] memory users,
    uint256[] memory newSplits
  ) public onlyOwner() {
    for (uint256 i = 0; i < users.length; i++) {
      address user = users[i];
      summedSplits -= splits[user];
      splits[users[i]] = newSplits[i];
      summedSplits += newSplits[i];
    }
    recipients = users;
  }

  function updateUserSplit(
    address user,
    uint256 newSplit
  ) public onlyOwner (){
    splits[user] = newSplit;
    summedSplits -= splits[user];
    splits[user] = newSplit;
    summedSplits += newSplit;
  }

  function addUser(
    address user,
    uint256 userSplit
  ) public onlyOwner(){
    require(splits[user] == 0, "User already exists");
    recipients.push(user);
    splits[user] = userSplit;
    summedSplits += userSplit;
  }

  function destroySplitter() public onlyOwner() {
    selfdestruct(owner);
  }

  // to support receiving ETH by default
  receive() external payable {
    uint256 totalETHValue = msg.value;
    // handle indexes drop
    for (uint256 i = 0; i < recipients.length; i++) {
      address currentUser = recipients[i];
      uint256 currentUserValue = (splits[currentUser] * totalETHValue) / summedSplits;
      require(currentUser != address(0), "No burning ETH");
      (bool sent, ) = currentUser.call{value: currentUserValue}("");
      require(sent, "Failed to send Ether");

      // It's gas inefficient to events in a loop. Uncomment if FE needs this later.
      // emit ETHsplit(msg.sender, currentUser, values[i]);
    }
  }

  fallback() external payable {}
}
