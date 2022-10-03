// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract King is Ownable {
    using SafeERC20 for IERC20;

    address public constant USDC_ADDRESS =
        0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
    address public constant MATIC_USD_ORACLE =
        0xAB594600376Ec9fD91F8e885dADF0CE036862dE0;
    address payable king;

    uint256 public maximumPaid;
    uint256 public gasAllocatedForKingPayment = 2300;

    event EthSent(bool success, uint256 amount, address king);
    event UsdcDeposit(uint256 amount, address king);
    event EthEmergencyWithdrawal(bool sent, uint256 balance);
    event UsdcEmergencyWithdrawal(uint256 usdcBalance);
    event GasAllocatedForKingPayment(uint256 gasAmount);

    function getLatestPrice(address oracleAddress)
        internal
        view
        returns (int256)
    {
        (, int256 price, , , ) = AggregatorV3Interface(oracleAddress)
            .latestRoundData();
        return price;
    }

    function setGasAllocatedForKingPayment(uint256 gasAmount) external {
        gasAllocatedForKingPayment = gasAmount;
        emit GasAllocatedForKingPayment(gasAmount);
    }

    receive() external payable {
        require(
            msg.value >= (3 * maximumPaid) / 2,
            "You're not depositing enough ether!"
        );
        if (maximumPaid > 0) {
            address _to = king;
            maximumPaid = msg.value;
            king = payable(msg.sender);
            (bool sent, ) = _to.call{
                gas: gasAllocatedForKingPayment,
                value: msg.value
            }("");
            emit EthSent(sent, msg.value, msg.sender);
            // we make best efforts to pay outgoing king, but if it fails it doesn't jam the contract
        } else {
            maximumPaid = msg.value;
            king = payable(msg.sender);
        }
    }

    function depositUsdc(uint256 depositAmount) external {
        require(
            depositAmount >=
                ((3 * maximumPaid * uint256(getLatestPrice(MATIC_USD_ORACLE))) /
                    (10**20)) /
                    2,
            "You're not depositing enough USDC!"
        );
        address _to;
        if (maximumPaid > 0) _to = king;
        else _to = address(this);
        king = payable(msg.sender);
        maximumPaid =
            (depositAmount * (10**20)) /
            uint256(getLatestPrice(MATIC_USD_ORACLE));
        emit UsdcDeposit(depositAmount, msg.sender);
        IERC20(USDC_ADDRESS).safeTransferFrom(msg.sender, _to, depositAmount);
        // this function will revert if transfer not possible
    }

    function getKing() external view returns (address payable) {
        return king;
    }

    function emergencyWithdraw() external onlyOwner {
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            (bool sent, ) = msg.sender.call{value: address(this).balance}("");
            require(sent, "Error in withdrawal");
            emit EthEmergencyWithdrawal(sent, address(this).balance);
        }
        uint256 usdcBalance = IERC20(USDC_ADDRESS).balanceOf(address(this));
        if (usdcBalance > 0) {
            emit UsdcEmergencyWithdrawal(usdcBalance);
            IERC20(USDC_ADDRESS).safeApprove(msg.sender, usdcBalance);
            IERC20(USDC_ADDRESS).safeTransfer(msg.sender, usdcBalance);
        }
    }
}
