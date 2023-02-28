import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { UniPassProvider } from '@unipasswallet/ethereum-provider';
import { MetaMask, OKX, UniPass, WalletConnect } from '@/config/constants';
import { WalletType } from '@/declare/global';
import { isFavorApp } from '@/utils/util';
import FlutterMethod, { flutterAsyncFn } from '@/utils/flutter';
import { Config } from '@/config/config';

const connectMetaMask = async (refresh: boolean, config: Config) => {
  const provider = window.ethereum;
  if (!provider) throw new Error('No metamask installed');
  const status = await provider._metamask.isUnlocked();
  if (!status && refresh) throw new Error('Metamask locked');
  const accounts: string[] = await provider.request({
    method: 'eth_requestAccounts',
  });
  const web3 = new Web3(provider);
  const chainId = await web3.eth.getChainId();
  if (chainId !== config.chainId)
    throw new Error('The network connected is not correct');
  return { web3, address: accounts[0] };
};

const connectOkx = async (config: Config) => {
  const provider = window.okexchain;
  if (!provider) throw new Error('No OKX installed');
  const accounts: string[] = await provider.enable();
  const web3 = new Web3(provider);
  const chainId = Number(provider.chainId);
  if (chainId !== config.chainId)
    throw new Error('The network connected is not correct');
  return { web3, address: accounts[0] };
};

const connectWalletConnect = async (refresh: boolean, config: Config) => {
  const provider = new WalletConnectProvider({
    rpc: {
      [config.chainId]: config.chainEndpoint,
    },
  });
  await provider.enable();
  provider?.once('disconnect', () => {
    localStorage.removeItem('walletconnect');
    localStorage.removeItem('connectType');
    location.href = location.origin;
  });
  if (refresh && !provider.connected) {
    await provider.connector.killSession();
    throw new Error('Connection interruption');
  }
  const { chainId, accounts } = provider;
  if (chainId !== config.chainId) {
    await provider.disconnect();
    throw new Error('The network connected is not correct');
  }
  // @ts-ignore
  const web3 = new Web3(provider);
  return { web3, address: accounts[0] };
};

const connectUnipass = async (config: Config) => {
  const upProvider = new UniPassProvider({
    chainId: config.chainId,
    returnEmail: false,
  });
  await upProvider.connect();
  // @ts-ignore
  const address = upProvider.account.address;
  const web3 = new Web3(upProvider);
  return { web3, address };
};

const connectUniPassFlutter = async () => {
  const info: any = await FlutterMethod.getUniPassInfo();
  return {
    web3: {
      eth: {
        personal: {
          sign: FlutterMethod.uniPassSignTransaction,
        },
      },
    },
    address: info.address,
  };
};

export const connect = (
  connectType: WalletType,
  refresh = false,
  config: Config,
) => {
  return connectType === MetaMask
    ? connectMetaMask(refresh, config)
    : connectType === OKX
    ? connectOkx(config)
    : connectType === UniPass
    ? isFavorApp()
      ? connectUniPassFlutter()
      : connectUnipass(config)
    : connectType === WalletConnect
    ? connectWalletConnect(refresh, config)
    : Promise.reject();
};
