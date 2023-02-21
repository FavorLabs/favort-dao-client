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

export const isMobile = () => {
  return navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  );
};

export const getProgress = (b: string, len: number) => {
  const oneLen = b.match(/1/g)?.length || 0;
  return (oneLen / len) * 100;
};

export const stringToBinary = (b: string, len: number) => {
  let value = '';
  let uStr = window.atob(b);
  for (let i = 0; i < uStr.length; i++) {
    let char = uStr.charCodeAt(i).toString(2);
    char = char.split('').reverse().join('');
    value += char + '0'.repeat(8 - char.length);
  }
  if (len < value.length) {
    value = value.substr(0, len);
  }
  return value;
};

export const omitAddress = (
  str: string,
  start: number = 6,
  end: number = 4,
) => {
  return str.substring(0, start) + '...' + str.substring(str.length - end);
};

export const sleep = async (time: number) => {
  await new Promise((s) => {
    setTimeout(s, time);
  });
};
