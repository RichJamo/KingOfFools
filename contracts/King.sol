// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract King {
    using SafeERC20 for IERC20;
    address public constant USDC_ADDRESS =
        0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address public constant MATIC_USD_ORACLE =
        0xAB594600376Ec9fD91F8e885dADF0CE036862dE0;
    address payable king;
    uint256 public previous_maximum;
    uint256 public previous_usdc_maximum;

    /**
     * Returns the latest price
     */
    function getLatestPrice(address _oracle_address)
        public
        view
        returns (int256)
    {
        (, int256 price, , , ) = AggregatorV3Interface(_oracle_address)
            .latestRoundData();
        return price;
    }

    //must take USDC as well...
    receive() external payable {
        require(
            msg.value >= (3 * previous_maximum) / 2,
            "You're not depositing enough ether!"
        ); // check here that msg.sender is payable?
        if (previous_maximum > 0) {
            previous_maximum = msg.value;
            (bool sent, ) = king.call{value: msg.value}("");
            require(sent, "Failed to send Ether");
        } else previous_maximum = msg.value;
        king = payable(msg.sender);
    }

    function deposit(uint256 deposit_amount) public {
        require(
            deposit_amount >=
                (3 *
                    previous_maximum *
                    uint256(getLatestPrice(MATIC_USD_ORACLE))) /
                    2,
            "You're not depositing enough USDC!"
        ); // check here that msg.sender is payable?
        if (previous_maximum > 0) {
            previous_maximum =
                deposit_amount /
                uint256(getLatestPrice(MATIC_USD_ORACLE));
            IERC20(USDC_ADDRESS).safeTransferFrom(
                msg.sender,
                king,
                deposit_amount
            );
        } else {
            previous_maximum =
                deposit_amount /
                uint256(getLatestPrice(MATIC_USD_ORACLE));
        }
        king = payable(msg.sender);
    }

    function _king() public view returns (address payable) {
        return king;
    }
}
