import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { MetaMask, OKX, WalletConnect } from '@/config/constants';
import { WalletType } from '@/declare/global';

const id = 80001;
const connectMetaMask = async (refresh: boolean) => {
  const provider = window.ethereum;
  if (!provider) throw new Error('No metamask installed');
  const status = await provider._metamask.isUnlocked();
  if (!status && refresh) throw new Error('Metamask locked');
  const accounts: string[] = await provider.request({
    method: 'eth_requestAccounts',
  });
  const web3 = new Web3(provider);
  const chainId = await web3.eth.getChainId();
  if (chainId !== id) throw new Error('The network connected is not correct');
  return { web3, address: accounts[0] };
};

const connectOkx = async () => {
  const provider = window.okexchain;
  if (!provider) throw new Error('No OKX installed');
  const accounts: string[] = await provider.enable();
  const web3 = new Web3(provider);
  const chainId = Number(provider.chainId);
  if (chainId !== id) throw new Error('The network connected is not correct');
  return { web3, address: accounts[0] };
};

const connectWalletConnect = async (refresh: boolean) => {
  const provider = new WalletConnectProvider({
    rpc: {
      [80001]: 'https://polygon-testnet.public.blastapi.io',
    },
  });
  await provider.enable();
  if (refresh && !provider.connected) {
    await provider.connector.killSession();
    throw new Error('Connection interruption');
  }
  const { chainId, accounts } = provider;
  if (chainId !== id) {
    await provider.disconnect();
    throw new Error('The network connected is not correct');
  }
  // @ts-ignore
  const web3 = new Web3(provider);
  return { web3, address: accounts[0] };
};

export const connect = (connectType: WalletType, refresh = false) => {
  return connectType === MetaMask
    ? connectMetaMask(refresh)
    : connectType === OKX
    ? connectOkx()
    : connectType === WalletConnect
    ? connectWalletConnect(refresh)
    : Promise.reject();
};
