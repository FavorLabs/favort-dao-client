import { MetaMask, OKX, UniPass, WalletConnect } from '@/config/constants';

declare global {
  interface Window {
    ethereum: any;
    okexchain: any;
    flutter_inappwebview: any;
  }
}

export type WalletType =
  | typeof MetaMask
  | typeof OKX
  | typeof WalletConnect
  | typeof UniPass;

export type AnimConfig = {
  visible: boolean;
  tips: string;
  percent: number;
};
