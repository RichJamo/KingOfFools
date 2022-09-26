// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract King {
    address public constant USDC_ADDRESS =
        0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address payable king;
    uint256 public previous_maximum;
    uint256 public previous_usdc_maximum;

    //must take USDC as well...
    receive() external payable {
        require(
            msg.value >= (3 * previous_maximum) / 2,
            "You don't have enough ether!"
        ); // check here that msg.sender is payable?
        if (previous_maximum > 0) {
            king.transfer(msg.value);
        }
        king = payable(msg.sender);
        previous_maximum = msg.value;
    }

    function deposit(uint256 deposit_amount) public {
        require(
            deposit_amount >= (3 * previous_usdc_maximum) / 2,
            "You don't have enough ether!"
        ); // check here that msg.sender is payable?
        ERC20(USDC_ADDRESS).transferFrom(
            msg.sender,
            address(this),
            deposit_amount
        );
    }

    function _king() public view returns (address payable) {
        return king;
    }
}
