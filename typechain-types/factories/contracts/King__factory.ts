/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { King, KingInterface } from "../../contracts/King";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "king",
        type: "address",
      },
    ],
    name: "EthDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "sent",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "EthEmergencyWithdrawal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "king",
        type: "address",
      },
    ],
    name: "UsdcDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "usdcBalance",
        type: "uint256",
      },
    ],
    name: "UsdcEmergencyWithdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "MATIC_USD_ORACLE",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDC_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getKing",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maximumPaid",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gasAmount",
        type: "uint256",
      },
    ],
    name: "setGasAllocatedForKingPayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608080604052346100615760008054336001600160a01b0319821681178355916001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09080a36108fc60035561110490816100678239f35b600080fdfe60406080815260048036101561018c575b361561001b57600080fd5b600254908160030260038104830361015e5760011c34106100db5750156100d15760607f7f7caf2cfdc2014aa045dd0ef7e9f5a6a4819e729710bed3689ba095e658738f913460025560008080803473ffffffffffffffffffffffffffffffffffffffff60015416600354f190610090610d5c565b50805191151582523460208301523390820152a15b337fffffffffffffffffffffffff00000000000000000000000000000000000000006001541617600155005b50346002556100a5565b60849060208451917f08c379a0000000000000000000000000000000000000000000000000000000008352820152602360248201527f596f75277265206e6f74206465706f736974696e6720656e6f7567682065746860448201527f65722100000000000000000000000000000000000000000000000000000000006064820152fd5b6011827f4e487b71000000000000000000000000000000000000000000000000000000006000525260246000fd5b6000803560e01c80631f19ec2914610bf4578063423cb99e14610bb7578063715018a614610b1b5780637920d80414610ac85780638da5cb5b14610a775780638db9f39a14610a2a578063b6b55f2514610760578063bb09d9b71461070f578063db2e21bc146103485763f2fde38b146102065750610010565b91346103445760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103445781359173ffffffffffffffffffffffffffffffffffffffff9182841680940361034057610261610c34565b83156102bd575050600054827fffffffffffffffffffffffff0000000000000000000000000000000000000000821617600055167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a380f35b90602060849251917f08c379a0000000000000000000000000000000000000000000000000000000008352820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b8480fd5b8280fd5b509190827ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126103445761037c610c34565b47610668575b81517f70a082310000000000000000000000000000000000000000000000000000000081523082820152602090602493732791bca1f2de4661ed88a30c99a7a9449aa8417483838781845afa92831561065e57879361062b575b50826103e6578680f35b909192939495948251917f095ea7b300000000000000000000000000000000000000000000000000000000928387820152338982015260006044820152604481526080810181811067ffffffffffffffff8211176105fe5791610450889260449695948852610dba565b8551948580927fdd62ed3e0000000000000000000000000000000000000000000000000000000082523086830152338d8301525afa9283156105f3576000936105c1575b508483018093116105945750610539610585927feb1bb465721b1baf11a4b364962aa63e8183707b2a9eb8e1e4994504aefb4622979861053e879461050788519485928c840152338584016020909392919373ffffffffffffffffffffffffffffffffffffffff60408201951681520152565b03926105397fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe094858101835282610cec565b610dba565b85517fa9059cbb0000000000000000000000000000000000000000000000000000000089820152339181019182526020820194909452839060400103908101835282610cec565b51908152a13880808080808680f35b601188917f4e487b7100000000000000000000000000000000000000000000000000000000600052526000fd5b90928682813d83116105ec575b6105d88183610cec565b810103126105e95750519138610494565b80fd5b503d6105ce565b84513d6000823e3d90fd5b896041857f4e487b7100000000000000000000000000000000000000000000000000000000600052526000fd5b9092508381813d8311610657575b6106438183610cec565b81010312610653575191386103dc565b8680fd5b503d610639565b82513d89823e3d90fd5b8280808047335af1610678610d5c565b50156106b3577f029c9780294ed370bdadf9d028c337ec660b4de49f16aac94ba5645e6c1b4d318247815190600182526020820152a1610382565b602060649251917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601360248201527f4572726f7220696e207769746864726177616c000000000000000000000000006044820152fd5b50823461075c57817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261075c5760209051732791bca1f2de4661ed88a30c99a7a9449aa841748152f35b5080fd5b50823461075c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261075c57823560025480600302906003820481036109fe576107ad611024565b916003838302029281840414901517156109fe5768056bc75e2d6310000080920460011c831061097b571561093057808202908282041482151715610904576107fe906107f8611024565b90610cb3565b60025573ffffffffffffffffffffffffffffffffffffffff600154168251907f23b872dd00000000000000000000000000000000000000000000000000000000602083015233602483015260448201528160648201526064815260a0810181811067ffffffffffffffff8211176108d8577ff5cb588f5f04842fa8a48ffd1f1b14b97339a788a30a4ab1c445e84f46a8b5ff9495509061089f918452610dba565b337fffffffffffffffffffffffff000000000000000000000000000000000000000060015416176001558151908152336020820152a180f35b6024856041887f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b6024846011877f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b506064810281810460641482151715610904577ff5cb588f5f04842fa8a48ffd1f1b14b97339a788a30a4ab1c445e84f46a8b5ff939450610973906107f8611024565b60025561089f565b60848660208651917f08c379a0000000000000000000000000000000000000000000000000000000008352820152602260248201527f596f75277265206e6f74206465706f736974696e6720656e6f7567682055534460448201527f43210000000000000000000000000000000000000000000000000000000000006064820152fd5b6024856011887f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b50823461075c57817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261075c576020905173ab594600376ec9fd91f8e885dadf0ce036862de08152f35b50823461075c57817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261075c5773ffffffffffffffffffffffffffffffffffffffff60209254169051908152f35b50823461075c57817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261075c5760209073ffffffffffffffffffffffffffffffffffffffff600154169051908152f35b50346105e957807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126105e957610b52610c34565b8073ffffffffffffffffffffffffffffffffffffffff81547fffffffffffffffffffffffff000000000000000000000000000000000000000081168355167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b50823461075c57817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261075c576020906002549051908152f35b50903461075c5760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261075c57610c2d610c34565b3560035580f35b73ffffffffffffffffffffffffffffffffffffffff600054163303610c5557565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b8115610cbd570490565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff821117610d2d57604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b3d15610db5573d9067ffffffffffffffff8211610d2d5760405191610da960207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160184610cec565b82523d6000602084013e565b606090565b604051906040820182811067ffffffffffffffff821117610d2d576040526020918281527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c656483820152732791bca1f2de4661ed88a30c99a7a9449aa84174803b15610efa5790610e429160008481959282888195519301915af1610e3c610d5c565b90610f58565b805180610e50575b50505050565b8184918101031261075c57820151908115918215036105e95750610e7657808080610e4a565b608490604051907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f742073756363656564000000000000000000000000000000000000000000006064820152fd5b606484604051907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152fd5b90919015610f64575090565b815115610f745750805190602001fd5b604051907f08c379a000000000000000000000000000000000000000000000000000000000825281602080600483015282519283602484015260005b848110610ff1575050507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f836000604480968601015201168101030190fd5b818101830151868201604401528593508201610fb0565b519069ffffffffffffffffffff8216820361101f57565b600080fd5b6040517ffeaf968c00000000000000000000000000000000000000000000000000000000815260a08160048173ab594600376ec9fd91f8e885dadf0ce036862de05afa9081156110c257600091611079575090565b9060a0823d82116110ba575b8161109260a09383610cec565b810103126105e957506110a481611008565b506110b6608060208301519201611008565b5090565b3d9150611085565b6040513d6000823e3d90fdfea2646970667358221220e603c222b590aa8a2dcd335b338a087731f6c115f1dbaa6838cd2ffdeff204bf64736f6c63430008110033";

type KingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class King__factory extends ContractFactory {
  constructor(...args: KingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<King> {
    return super.deploy(overrides || {}) as Promise<King>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): King {
    return super.attach(address) as King;
  }
  override connect(signer: Signer): King__factory {
    return super.connect(signer) as King__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KingInterface {
    return new utils.Interface(_abi) as KingInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): King {
    return new Contract(address, _abi, signerOrProvider) as King;
  }
}
