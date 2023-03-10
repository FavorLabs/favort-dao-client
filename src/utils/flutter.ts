type uniPassInfo = {
  address: string;
  email: string;
};

interface FlutterMethodsRes {
  address: { res: any };
  signer: { res: uniPassInfo };
  rollback: { res: any };
  newwebview: { res: any };
  transaction1: { res: any };
  transaction2: { res: any };
  chat: { res: any };
}

type FlutterMethods = keyof FlutterMethodsRes;

export const flutterAsyncFn = (method: FlutterMethods, ...arg: any[]) => {
  return new Promise((resolve, reject) => {
    window?.flutter_inappwebview
      ?.callHandler?.(method, ...arg)
      .then((res: FlutterMethodsRes[FlutterMethods]) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export default {
  getUniPassInfo() {
    return flutterAsyncFn('address');
  },
  uniPassSignTransaction(message: string) {
    return flutterAsyncFn('signer', message);
  },
  openWebview(url: string) {
    return flutterAsyncFn('newwebview', url);
  },
  closeWebview() {
    return flutterAsyncFn('rollback');
  },
  uniPassTransferTransaction(eoaAddress: string, value: number) {
    return flutterAsyncFn('transaction1', eoaAddress, value);
  },
  // uniPassContractTransaction(caAddress: string, abiString: string) {
  //   return flutterAsyncFn('transaction2', caAddress, abiString);
  // },
  openChat(token: string, hash: string, name: string, proxyGroup: string) {
    return flutterAsyncFn('chat', token, hash, name, proxyGroup);
  },
};
