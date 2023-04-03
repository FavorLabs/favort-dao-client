import Web3 from 'web3';
import { Post } from '@/declare/tubeApiType';
import WebUtils from 'web3-utils';
import { ConnectType, ReviteURL } from '@/config/constants';
import { setTheme, ThemeType } from '@/utils/setTheme';
import { defaultTheme } from '@/config/themeConfig';
import EventEmitter from 'eventemitter3';
import { debounce } from 'lodash';
import Flutter from '@/utils/flutter';
import moment from 'moment';
import { message } from 'antd';

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

export const appName = new URLSearchParams(location.search).get('name');

export const getKeyByName = (type: 'token' | 'connectType') => {
  const networkId = localStorage.getItem('network_id');
  let arr = [];
  if (type === 'token') {
    arr = ['token', networkId, appName];
  } else {
    arr = ['connectType', networkId, appName];
  }
  return arr
    .filter((item) => {
      if (item) return item;
    })
    .join('-');
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

export const isFavorApp = (isJudgment?: boolean) => {
  if (isJudgment) {
    return !navigator.userAgent.match(/FavorDao/i);
  } else {
    return navigator.userAgent.match(/favor/i);
  }
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

export const getSize = (size: number, level: number = 0): string => {
  let levelList: string[] = ['B', 'KB', 'M', 'G', 'T'];
  let n: number = 0;
  while (size >= Math.pow(1024, n + 1)) {
    n++;
  }
  return (
    parseFloat((size / Math.pow(1024, n)).toFixed(2)) +
    ' ' +
    levelList[level + n]
  );
};

export const sleep = async (time: number) => {
  await new Promise((s) => {
    setTimeout(s, time);
  });
};

export const eventEmitter = new EventEmitter();

export const toChat = (
  name: string | undefined,
  api: string,
  proxyGroup: string | undefined,
  guid: string,
  bucket: string,
  region: string,
  network: string,
) => {
  const token = localStorage.getItem(getKeyByName('token'));
  if (isFavorApp()) {
    toFlutterChat();
  } else {
    message.info('Not open at this time!');
    // toWebPageChat();
  }

  function toFlutterChat() {
    if (window?.flutter_inappwebview) {
      const hash = WebUtils.keccak256(`server_${name}_channel_General`);
      Flutter.chatMessage(proxyGroup as string, guid, bucket, region, network);
    } else {
      toWebPageChat();
    }
  }

  function toWebPageChat() {
    const hash = WebUtils.keccak256(`server_${name}`);
    window.open(
      `${ReviteURL}/server/${hash.slice(
        2,
      )}?token=${token}&api=${api}&proxyGroup=${proxyGroup}`,
    );
  }
};

export const getChatHash = (name: string) => {
  return WebUtils.keccak256(`server_${name}_channel_General`).slice(2);
};

export const checkLogin = () => {
  const token = localStorage.getItem(getKeyByName('token'));
  const connectType = localStorage.getItem(getKeyByName('connectType'));
  return !!(token && connectType);
};

export const switchTheme = () => {
  let theme = localStorage.getItem('theme');
  if (theme) {
    switch (theme) {
      case 'light':
        setTheme('dark');
        break;
      case 'dark':
        setTheme('light');
    }
  } else {
    setTheme(defaultTheme as ThemeType);
  }
};

export const getContent = (contents: Post[]) => {
  if (!Array.isArray(contents)) return {};
  return contents?.reduce((prev, content) => {
    prev[content.type] = (prev[content.type] || []).concat(content);
    return prev;
  }, {} as Record<number, Post[]>);
};

export const getTime = (time: number) => {
  const t = time.toString().length === 10 ? time * 1000 : time;
  return moment(t).fromNow();
};

export const flexible = (window: Window, document: Document) => {
  let docEl = document.documentElement;
  let bodyEl = document.body;
  // var dpr = window.devicePixelRatio || 1;
  // const pcDefaultFontSize = 16;
  // const mobileDefaultFontSize = 16;
  // const pcDesignSize = 1920;
  // const mobileDesignSize = 375;
  const pcDefaultFontSize = 14;
  const mobileDefaultFontSize = 16;
  const pcDesignSize = 1440;
  const mobileDesignSize = 375;

  let targetWidth: number;

  function getTargetWidth() {
    if (!isMobile() || docEl.clientWidth > 1024) {
      targetWidth =
        docEl.clientWidth > docEl.clientHeight
          ? docEl.clientWidth
          : docEl.clientHeight;
    } else {
      targetWidth =
        docEl.clientWidth <= docEl.clientHeight
          ? docEl.clientWidth
          : docEl.clientHeight;
    }
  }

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      // document.body.style.fontSize = 12 * dpr + "px";
      // document.body.setAttribute('data-dpr', dpr + '');
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize);
    }
  }

  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    getTargetWidth();
    if (!isMobile()) {
      docEl.style.fontSize = `16px`;
      bodyEl.style.fontSize = '16px';
      // docEl.style.fontSize = `${(pcDefaultFontSize / pcDesignSize) * targetWidth}px`;
    } else {
      // docEl.style.fontSize = `14px`;
      docEl.style.fontSize = `${
        (mobileDefaultFontSize / mobileDesignSize) * targetWidth
      }px`;
      bodyEl.style.fontSize = `${
        (mobileDefaultFontSize / mobileDesignSize) * targetWidth
      }px`;
    }
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener('resize', debounce(setRemUnit, 500));
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  // if (dpr >= 2) {
  //   var fakeBody = document.createElement("body");
  //   var testElement = document.createElement("div");
  //   testElement.style.borderconsole.log("pc device");
  //   docEl.removeChild(fakeBody);
  // }
};

export const query = (params: any) => {
  let newParams = {
    page: JSON.stringify(params.page || {}),
    sort: JSON.stringify(params.sort || {}),
    filter: JSON.stringify(params.filter || []),
  };
  return (
    Object.keys(newParams)
      // @ts-ignore
      .map((key) => [key, newParams[key]].map(encodeURIComponent).join('='))
      .join('&')
  );
};

export const randomHex = () => {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`;
};

export const getDownloadNumber = (b: string) => {
  return b.match(/1/g)?.length || 0;
};
