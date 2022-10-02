// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

contract King is Ownable {
    using SafeERC20 for IERC20;
    address public constant USDC_ADDRESS =
        0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address public constant MATIC_USD_ORACLE =
        0xAB594600376Ec9fD91F8e885dADF0CE036862dE0;
    address payable king;
    uint256 public maximumPaid;
    uint256 gasAllocatedForKingPayment;
    event EthDeposit(bool success, uint256 amount, address king);
    event UsdcDeposit(uint256 amount, address king);

    /**
     * Returns the latest price
     */
    function getLatestPrice(address oracleAddress)
        internal
        view
        returns (int256)
    {
        (, int256 price, , , ) = AggregatorV3Interface(oracleAddress)
            .latestRoundData();
        return price;
    }

    function setGasAllocatedForKingPayment(uint256 gasAmount)
        external
        onlyOwner
    {
        gasAllocatedForKingPayment = gasAmount;
    }

    receive() external payable {
        require(
            msg.value >= (3 * maximumPaid) / 2,
            "You're not depositing enough ether!"
        );
        if (maximumPaid > 0) {
            maximumPaid = msg.value;
            (bool sent, ) = king.call{
                value: msg.value,
                gas: gasAllocatedForKingPayment
            }("");
            emit EthDeposit(sent, msg.value, msg.sender);
            // if payer cannot receive ETH, that's there bad, and we don't let it halt our protocol
        } else maximumPaid = msg.value;
        king = payable(msg.sender);
    }

    function deposit(uint256 depositAmount) external {
        require(
            depositAmount >=
                ((3 * maximumPaid * uint256(getLatestPrice(MATIC_USD_ORACLE))) /
                    (10**20)) /
                    2,
            "You're not depositing enough USDC!"
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
            // this function will revert if transfer not possible
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

    function emergencyWithdraw() external payable onlyOwner {
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            (bool sent, ) = msg.sender.call{value: address(this).balance}("");
            require(sent, "Error in withdrawal");
        }
        uint256 usdcBalance = IERC20(USDC_ADDRESS).balanceOf(address(this));
        if (usdcBalance > 0) {
            IERC20(USDC_ADDRESS).approve(msg.sender, usdcBalance);
            IERC20(USDC_ADDRESS).safeTransfer(msg.sender, usdcBalance);
        }
    }
}
