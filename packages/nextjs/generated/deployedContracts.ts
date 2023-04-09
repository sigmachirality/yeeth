const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        Dropper: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "users",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "values",
                  type: "uint256[]",
                },
              ],
              name: "sendETH",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        SplitterFactory: {
          address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
          abi: [
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "users",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "_splits",
                  type: "uint256[]",
                },
              ],
              name: "createSplitter",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getSplitters",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "splitters",
              outputs: [
                {
                  internalType: "contract Splitter",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      name: "sepolia",
      chainId: "11155111",
      contracts: {
        Dropper: {
          address: "0x17C9378f864f04B6FaFB4783755d14e15c61a3b2",
          abi: [
            {
              inputs: [],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "users",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "values",
                  type: "uint256[]",
                },
              ],
              name: "sendETH",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        SplitterFactory: {
          address: "0xC98a33c24fC5DA7576636DaD1d0a0409d66b3D42",
          abi: [
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "users",
                  type: "address[]",
                },
                {
                  internalType: "uint256[]",
                  name: "_splits",
                  type: "uint256[]",
                },
              ],
              name: "createSplitter",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getSplitters",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "splitters",
              outputs: [
                {
                  internalType: "contract Splitter",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
