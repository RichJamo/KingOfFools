/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { King, KingInterface } from "../King";

const _abi = [
  {
    inputs: [],
    name: "_king",
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
    name: "previous_maximum",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608080604052346100165761027e908161001c8239f35b600080fdfe6080806040526004361015610025575b50361561001b57600080fd5b6100236100e1565b005b600090813560e01c90816329cc6d6f146100825750639144c2540361000f573461007f57807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261007f576020600154604051908152f35b80fd5b9050346100d057817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126100d05773ffffffffffffffffffffffffffffffffffffffff60209254168152f35b5080fd5b506040513d6000823e3d90fd5b6001547f55555555555555555555555555555555555555555555555555555555555555558111600116610219578060030260011c34106101bb57610155575b600080547fffffffffffffffffffffffff0000000000000000000000000000000000000000163317905561015334600155565b565b600080808061019461017b825473ffffffffffffffffffffffffffffffffffffffff1690565b73ffffffffffffffffffffffffffffffffffffffff1690565b819034156101b1575b3491f1610120576101ac6100d4565b610120565b6108fc915061019d565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f596f7520646f6e2774206861766520656e6f75676820657468657221000000006044820152fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea26469706673582212207370c87ba166e064da9d559e35b49ff42cdb2d101601958940b2a5c0c1fc58f864736f6c634300080d0033";

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
