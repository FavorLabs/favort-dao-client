export const tokenAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const favorTubeAbi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'modeType',
            type: 'uint8',
          },
        ],
        internalType: 'struct UsersConfig.UserConfig',
        name: 'userConfig',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint8[5]',
            name: 'taxRate',
            type: 'uint8[5]',
          },
          {
            internalType: 'uint256',
            name: 'minPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxPrice',
            type: 'uint256',
          },
        ],
        internalType: 'struct UsersConfig.Mode',
        name: 'mode',
        type: 'tuple',
      },
      {
        internalType: 'uint32',
        name: 'subscribeBlock_',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'ERC223Token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'interval',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'router',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: '$exchange',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'channel',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'mode',
        type: 'uint256',
      },
    ],
    name: '$setUserConfig',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'expire',
        type: 'uint32',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'rate',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct FavorTube.PayInfo[3]',
        name: 'subInfo',
        type: 'tuple[3]',
      },
    ],
    name: '$subInfo',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: '_token',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'defaultUserConfig',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'modeType',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'exchangeableAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'getCurrentRound',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'modeType',
        type: 'uint8',
      },
    ],
    name: 'getMode',
    outputs: [
      {
        components: [
          {
            internalType: 'uint8[5]',
            name: 'taxRate',
            type: 'uint8[5]',
          },
          {
            internalType: 'uint256',
            name: 'minPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxPrice',
            type: 'uint256',
          },
        ],
        internalType: 'struct UsersConfig.Mode',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'getModesKey',
    outputs: [
      {
        internalType: 'uint8[]',
        name: '',
        type: 'uint8[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'path',
        type: 'bytes',
      },
    ],
    name: 'getTokenIn',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'getUserConfig',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'modeType',
            type: 'uint8',
          },
        ],
        internalType: 'struct UsersConfig.UserConfig',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isSetConfig',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'lockTotal',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    name: 'modeSet',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'periodData',
    outputs: [
      {
        internalType: 'uint256',
        name: 'startBlockNumber',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'periodTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'periodNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'subscribeBlock',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'uniswapRouter',
    outputs: [
      {
        internalType: 'contract IUniswapRouter',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'usersConfig',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: 'modeType',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    stateMutability: 'payable',
    type: 'receive',
    payable: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'setPeriodData',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'exchange',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'modeType',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'uint8[5]',
            name: 'taxRate',
            type: 'uint8[5]',
          },
          {
            internalType: 'uint256',
            name: 'minPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxPrice',
            type: 'uint256',
          },
        ],
        internalType: 'struct UsersConfig.Mode',
        name: 'mode',
        type: 'tuple',
      },
    ],
    name: 'setMode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'modeType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'removeMode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'modeType',
            type: 'uint8',
          },
        ],
        internalType: 'struct UsersConfig.UserConfig',
        name: 'userConfig',
        type: 'tuple',
      },
    ],
    name: 'setDefaultUserConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'modeType',
            type: 'uint8',
          },
        ],
        internalType: 'struct UsersConfig.UserConfig',
        name: 'userConfig',
        type: 'tuple',
      },
    ],
    name: 'setUserConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'tokenReceived',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'subscribeBlock_',
        type: 'uint32',
      },
    ],
    name: 'setSubscribeBlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'withdrawTax',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transferToken',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'path',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'amountInMaximum',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amountOut',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'swapToken',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
];

export const oracleAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
    ],
    name: '$clear',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'addr',
        type: 'bytes32',
      },
    ],
    name: '$remove',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'addr',
        type: 'bytes32',
      },
    ],
    name: '$set',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'hashIMap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'oracleIMap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'start',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'value',
        type: 'bool',
      },
    ],
    name: 'setStart',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
    ],
    name: 'get',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: '',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'getFileList',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'hash',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'blockNumber',
            type: 'uint256',
          },
        ],
        internalType: 'struct Oracle.HashBN[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'addr',
        type: 'bytes32',
      },
    ],
    name: 'set',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'addr',
        type: 'bytes32',
      },
    ],
    name: 'remove',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
    ],
    name: 'clear',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export type Config = {
  bootNode: string[];
  chainEndpoint: string;
  tokenName: string;
  chainId: number;
  oracleContractAddr: string;
  traffic: boolean;
  trafficContractAddr: string;
  faucet: string;
  favorTokenAddress: string;
  favorTubeAddress: string;
  videoLimitSize: number;
  proxyGroup: string;
  domainName: string;
  storeGroup: string;
  proxyNodes: string[];
  storeNodes: string[];
};

export const configs = {
  18: {
    bootNode: [
      '/ip4/107.167.2.7/tcp/1818/p2p/12D3KooWRF7JRcGV6fbHW5KonKUingJb7RiVpsXzhHz8Kj9AarPq',
      '/ip6/2610:150:c009:d:216:3cff:fe62:366b/tcp/1818/p2p/12D3KooWRF7JRcGV6fbHW5KonKUingJb7RiVpsXzhHz8Kj9AarPq',
    ],
    chainEndpoint: 'https://polygon-mainnet.public.blastapi.io',
    tokenName: 'MATIC',
    chainId: 137,
    oracleContractAddr: '0xDecc6cCfe1E5369EF8e0d30033EF476b075E49bB',
    traffic: false,
    trafficContractAddr: '',
    faucet: '',
    favorTokenAddress: '0x55c948561336a98f7683dd3d79f31ef6e3e0bac8',
    favorTubeAddress: '0xa279666a21A4b994D1124A35c0D47703E284F1aB',
    videoLimitSize: 1024 * 300,
    proxyGroup: 'favortube',
    domainName: 'favortube.com',
    storeGroup: 'favortube-storage',
    proxyNodes: [
      'fafa08217c964ada4b10757176ccb708e7ab02534d54b429ab21b5021df50e0e',
      '53af829ad8bf1117b4363eab6bb3aa3cc9a376b335555c043ccd08b8206d2d93',
      '37c4bea59406fed518a1b44f0ba53f78503329ab429dc654e66afbea0a03748b',
    ],
    storeNodes: [
      'a99bd3530278f6047e1ad8c70b9e5ae6434c44d675a8fdd53280564440610d52',
      '0a308ca674606e7384fea8ac10fb2866b7804c67ef8159d7944933f0f98652ed',
      '97f25f19ab516d8458f8756e17de6cc7200acb1c076a5f4b9594cc6ee5270e12',
    ],
  },
  19: {
    bootNode: [
      '/ip4/107.167.2.7/tcp/1809/p2p/12D3KooWEw5bXwg4ho63XSJCtmYdgXbVGUKrf1Uhpg3RbogLswxt',
      '/ip6/2610:150:c009:d:216:3cff:fe62:366b/tcp/1809/p2p/12D3KooWEw5bXwg4ho63XSJCtmYdgXbVGUKrf1Uhpg3RbogLswxt',
    ],
    chainEndpoint: 'https://polygon-testnet.public.blastapi.io',
    tokenName: 'MATIC',
    chainId: 80001,
    oracleContractAddr: '0x21aC8FE412Fd058eD29a67a69c81EF08fA34f443',
    traffic: false,
    trafficContractAddr: '',
    faucet: 'https://faucet.polygon.technology/',
    favorTokenAddress: '0x784c0A0669C5823549bd2Ae9D2E393C73048828a',
    favorTubeAddress: '0xC263A2299b44023612880C112647a864dB1f1F44',
    videoLimitSize: 1024 * 300,
    proxyGroup: 'favortube',
    domainName: 'favortube.com',
    storeGroup: 'favortube-storage',
    proxyNodes: [
      'cc30f0393cfaf2b6b2bea82ea4400fe8e9ff6d94b858beaf36d41fb9f040963e',
      '01ce40352b9635cbfab17f22d6d1e4436a21324cc1b1ef97eac2b20928b03244',
      '5476e8758bd13155d49b14902efdf6979a8ddce66c07dc5fa0a12e71880ffe49',
      '7429f9b52f35585b65508660265d8ac88455b4ae3ed7e09160b89f322b3945bf',
    ],
    storeNodes: [
      '9ca6d63b192afd92c54b14a50ce21783092be29b67c959022bd600d5691cb497',
      'd95d0cf90e651b840ab3d888981d0653620aa042189e8d1a0f6a7cdc9bb572af',
    ],
  },
  20: {
    bootNode: [
      '/ip4/107.167.2.7/tcp/1800/p2p/12D3KooWJkSsFDb4kGBtd4aN85RPswX7aJWAf391xkC8nuADcQc3',
      '/ip6/2610:150:c009:d:216:3cff:fe62:366b/tcp/1800/p2p/12D3KooWJkSsFDb4kGBtd4aN85RPswX7aJWAf391xkC8nuADcQc3',
    ],
    chainEndpoint: 'https://andromeda.metis.io/?owner=1088',
    tokenName: 'METIS',
    chainId: 1088,
    faucet: '',
    oracleContractAddr: '0xE810E8B7B61496AEe5D18242Bf0CFD988DFade5C',
    traffic: false,
    trafficContractAddr: '',
    favorTokenAddress: '0x753291B61dC6547c9B785ea2fBd7B04c83e7b6d4',
    favorTubeAddress: '0x1548d87b8Bb28F59554a6cCb018CA6ff897839a0',
    videoLimitSize: 1024 * 300,
    proxyGroup: 'favortube',
    domainName: 'favortube.com',
    storeGroup: 'favortube-storage',
    proxyNodes: [
      '4a82e22ac2de786d3eeb8478ac18158941379f4021350d07263a1b4b29889434',
      '091eb9c210577efbe82f717d06f5a80c5e29d9b6fb1af5e5f26cf69a868b130e',
      '7237952614dfce38f6ee07a291ea4b9be2e9d26197f2e6fa4bd88cf143c2682e',
      '04bd864e1938e2c2dcac3b2bbbf69468344e0c4419bd2032c29b7d7d33dcee25',
    ],
    storeNodes: [
      '6c570d60796f118d5df9ff68ac28fdfa6ac122a6071edfd56bf16c67a6fce438',
      'd1f2cac24d107038e23a8606505cecb632f5d7ab26156d1528b0be501520b326',
    ],
  },
  21: {
    bootNode: [
      '/ip4/107.167.2.7/tcp/1890/p2p/12D3KooWC6KnXNGfFTjrcUZVv93QyWYfmsiNDW1j92An7Rjjvz6r',
      '/ip6/2610:150:c009:d:216:3cff:fe62:366b/tcp/1890/p2p/12D3KooWC6KnXNGfFTjrcUZVv93QyWYfmsiNDW1j92An7Rjjvz6r',
    ],

    chainEndpoint: 'https://exchainrpc.okex.org',
    chainId: 66,
    tokenName: 'OKT',
    faucet: '',
    oracleContractAddr: '0xDecc6cCfe1E5369EF8e0d30033EF476b075E49bB',
    traffic: false,
    trafficContractAddr: '',
    favorTokenAddress: '0xBce5bbc384a9e703F3a22dAb55aEe2170bdB3fe4',
    favorTubeAddress: '0xCF5Cc197654Be85112A4044a86BFE2c002A266c2',
    videoLimitSize: 1024 * 300,
    proxyGroup: 'favortube',
    domainName: 'favortube.com',
    storeGroup: 'favortube-storage',
    proxyNodes: [
      '53715767b512fb2685b9e7997527ade81a5a045c118e06a314da57a2bf2d80c6',
      '6cf5f1c1c6b42956008dfa692f9d71cfb061927f054d6ee88dd0040a5493c969',
      '80adeb89249aa762a34799858c19ddbf0f92e1e2e9d6722de6c3c1b582b45f9e',
      '4a3096648663ad107e89b704fce756c3ed0f3ccc17f51fa00bb788367e2c5240',
    ],
    storeNodes: [
      'c3b51d9b33749d8e10d66c692521705057a02e81d67f75073786666d0c53c98a',
      '78adc43439a4325e31332ba48c2c8f1fa08308ea9c4c535e8f42f4d71d6dad44',
    ],
  },
};

export let config: Config = JSON.parse(
  sessionStorage.getItem('config') || '{}',
);

export const setConfig = (apiConfig: Config) => {
  let networkId = sessionStorage.getItem('network_id');
  if (apiConfig) {
    sessionStorage.setItem('config', JSON.stringify(apiConfig));
  } else {
    apiConfig = JSON.parse(sessionStorage.getItem('config') || '{}') || {};
  }
  // @ts-ignore
  config = { ...configs[networkId], ...apiConfig };
};
