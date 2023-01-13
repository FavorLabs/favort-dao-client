import { MetaMask, OKX, WalletConnect } from '@/config/constants';

declare global {
  interface Window {
    ethereum: any;
    okexchain: any;
  }
}

export type WalletType = typeof MetaMask | typeof OKX | typeof WalletConnect;
