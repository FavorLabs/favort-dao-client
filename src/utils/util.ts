import Web3 from 'web3';

export const checkSession = (key: string): string | false => {
  const value = sessionStorage.getItem(key);
  if (value) return value;
  return false;
};

export const websocket = (host: string) => {
  let ws: any = new Web3.providers.WebsocketProvider(host, {
    reconnect: {
      auto: true,
    },
  });
  ws.on(ws.DATA, (res: any) => {
    ws.emit(res.params.subscription, res.params.result);
  });
  return ws;
};
