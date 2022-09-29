// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

contract King {
    using SafeERC20 for IERC20;
    address public constant USDC_ADDRESS =
        0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address public constant MATIC_USD_ORACLE =
        0xAB594600376Ec9fD91F8e885dADF0CE036862dE0;
    address payable king;
    uint256 public maximumPaid;
    bool sent;
    event EthDeposit(bool success, uint256 amount, address king);
    event UsdcDeposit(uint256 amount, address king);

    /**
     * Returns the latest price
     */
    function getLatestPrice(address oracleAddress)
        public
        view
        returns (int256)
    {
        (, int256 price, , , ) = AggregatorV3Interface(oracleAddress)
            .latestRoundData();
        return price;
    }

    //must take USDC as well...
    receive() external payable {
        require(
            msg.value >= (3 * maximumPaid) / 2,
            "You're not depositing enough ether!"
        );
        if (maximumPaid > 0) {
            maximumPaid = msg.value;
            (sent, ) = king.call{value: msg.value}("");
            // deliberately not using return value
            // if payer cannot receive ETH, that's there bad, and we don't let it halt our protocol
        } else maximumPaid = msg.value;
        king = payable(msg.sender);
        emit EthDeposit(sent, msg.value, msg.sender);
    }

    function deposit(uint256 depositAmount) external {
        require(
            depositAmount >=
                ((3 * maximumPaid * uint256(getLatestPrice(MATIC_USD_ORACLE))) /
                    (10**20)) /
                    2,
            "You're not depositing enough USDC!"
        );
        console.log(
            ((3 * maximumPaid * uint256(getLatestPrice(MATIC_USD_ORACLE))) /
                (10**20)) / 2
        );
        if (maximumPaid > 0) {
            maximumPaid =
                (depositAmount * (10**20)) /
                uint256(getLatestPrice(MATIC_USD_ORACLE));
            IERC20(USDC_ADDRESS).safeTransferFrom(
                msg.sender,
                king,
                depositAmount
            );
        } else {
            maximumPaid =
                (depositAmount * 100) /
                uint256(getLatestPrice(MATIC_USD_ORACLE));
        }
        king = payable(msg.sender);
        emit UsdcDeposit(depositAmount, msg.sender);
    }

    function getKing() external view returns (address payable) {
        return king;
    }

    function withdraw(uint256 amount) payable {
        (sent, ) = king.call{value: msg.value}("");
    }
}
