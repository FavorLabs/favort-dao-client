import Web3 from 'web3';

export const splitUrl = (url: string): [string, string, string] => {
  let i = new URL(url);
  return [i.protocol, i.hostname, i.port];
};

export const getEndPoint = (): boolean | string => {
  const params = new URLSearchParams(location.search);
  const endpoint = params.get('endpoint');
  if (endpoint) {
    return new URL(endpoint).origin;
  } else {
    return false;
  }
};
export const websocket = (host: string) => {
  let ws = new Web3.providers.WebsocketProvider(host, {
    reconnect: {
      auto: true,
    },
  });
  // @ts-ignore
  ws.on(ws.DATA, (res) => {
    // @ts-ignore
    ws.emit(res.params.subscription, res.params.result);
  });
  return ws;
};
