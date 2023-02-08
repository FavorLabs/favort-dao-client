import React, { useState } from 'react';
import {
  SwapWidget,
  Field,
  TradeType,
  Currency,
  SwapWidgetProps,
} from '@uniswap/widgets';
import { tokens } from '@uniswap/default-token-list';
import { Token } from '@uniswap/sdk-core';
import '@uniswap/widgets/dist/fonts.css';
import BigNumber from 'bignumber.js';

export type Props = {
  provider: SwapWidgetProps['provider'];
  chainId: number;
  favorTokenAddress: string;
  favorTubeAddress: string;
  decimal: number;
  name: string;
  symbol: string;
  price: number;
};
const Uniswap: React.FC<Props> = (props) => {
  const {
    provider,
    chainId,
    favorTokenAddress,
    favorTubeAddress,
    decimal,
    name,
    symbol,
    price,
  } = props;
  const value = BigNumber(price).div(BigNumber(10).pow(decimal));
  const [input, setInput] = useState<Currency>();
  const token = new Token(chainId, favorTokenAddress, decimal, symbol, name);
  return (
    <>
      <SwapWidget
        contractAddress={favorTubeAddress}
        value={{
          type: TradeType.EXACT_OUTPUT,
          amount: value.toString(),
          [Field.OUTPUT]: token,
          [Field.INPUT]: input,
        }}
        defaultChainId={80001}
        className={'uniswap'}
        hideConnectionUI
        tokenList={tokens}
        provider={provider}
        brandedFooter={false}
        onSwapPriceUpdate={(trade, state) => {
          console.log('onSwapPriceUpdate', trade);
        }}
        onDisableUpdate={(disable, approved) => {
          console.log('onDisableUpdate', disable, approved);
        }}
        onTokenChange={(field, token) => {
          field === Field.INPUT && setInput(token);
        }}
      />
    </>
  );
};
export default Uniswap;
