import * as React from 'react';
import styles from './index.less';
import { Popup } from 'antd-mobile';
import { useEffect, useState } from 'react';
import Api from '@/services/Api';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import {
  getDownloadNumber,
  query,
  stringToBinary,
  randomHex,
} from '@/utils/util';
import { Chunk, FileInfo } from '@/declare/nodeApiType';
import ChunkTooltip from '@/components/ChunkTooltip';
import { useIntl } from '@@/plugin-locale/localeExports';

export type Props = {
  visible: boolean;
  close: () => void;
  videoHash: string;
  oracleArr: string[];
};

type ChunkInfo = Chunk & {
  downloadLen: number;
};

export const colorArr = [
  '#FFF',
  '#4147c4',
  '#d93a49',
  '#694d9f',
  '#dea32c',
  '#45b97c',
  '#77787b',
];

const ChunkSourceInfoPopup: React.FC<Props> = (props) => {
  const { visible, close, videoHash, oracleArr } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [chunkArr, setChunkArr] = useState<ChunkInfo[]>([]);
  const [currentVideoInfo, setCurrentVideoInfo] = useState<FileInfo | null>(
    null,
  );
  const [totalPercent, setTotalPercent] = useState(0);
  const [len, setLen] = useState<number>(0);

  const { api, debugApi } = useSelector((state: Models) => state.global);
  const intl = useIntl();

  const getChunkSource = async () => {
    setLoading(true);
    let queryData = {
      page: { pageNum: 1, pageSize: 1 },
      filter: [
        {
          key: 'rootCid',
          value: videoHash,
          term: 'cn',
        },
      ],
    };
    const re = await Api.getPyramidSize(api, query(queryData));
    if (re.status !== 200 || re.data.list.length === 0) return;
    const hashInfo = re.data.list[0];
    const videoHashInfo: FileInfo = {
      ...hashInfo,
      bitVector: {
        ...hashInfo.bitVector,
        b: stringToBinary(hashInfo.bitVector.b, hashInfo.bitVector.len),
      },
    };
    setCurrentVideoInfo(videoHashInfo);

    const { data } = await Api.getChunkSource(debugApi, videoHash);
    if (!data) return;
    let arr: ChunkInfo[] = [];
    setLen(data.len);
    data.chunkSource?.forEach((item) => {
      const binary = stringToBinary(item.chunkBit.b, item.chunkBit.len);
      let downloadLen = getDownloadNumber(binary);
      // if (item.overlay === data.pyramidSource) {
      //   downloadLen += len;
      //   pyramidSource = true;
      // }
      // item.chunkBit.len += len;
      // let preIndex = index - 1;
      let current = {
        ...item,
        chunkBit: {
          len: item.chunkBit.len,
          b: binary,
        },
        downloadLen,
      };
      arr.push(current);
    });
    arr.sort((a, b) => {
      return b.downloadLen - a.downloadLen;
    });
    let allDownLen = 0;
    arr.forEach((item) => {
      allDownLen += item.downloadLen;
    });
    setTotalPercent((allDownLen / videoHashInfo.bitVector.len) * 100);
    setChunkArr(arr);
    setLoading(false);
  };

  const getChunkArr = (data: ChunkInfo[]) => {
    if (!currentVideoInfo) return [];
    let chunkArr: number[] = [];
    let n = currentVideoInfo.bitVector.len;
    // console.log('n', n);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < data.length; j++) {
        chunkArr[i] = 0;
        if (data[j].chunkBit.b[i] === '1') {
          if (j >= 5) {
            chunkArr[i] = 6;
          } else {
            chunkArr[i] = j + 1;
          }
          break;
        }
      }
    }
    // console.log('chunkArr', chunkArr,props.hashInfo.size);
    return new Array(len).fill(1).concat(chunkArr);
  };

  const getRandomHex = () => {
    return randomHex();
  };

  const getOracleClass = (item: any) => {
    if (oracleArr.includes(item.overlay)) {
      return ' oracle-style';
    } else {
      return '';
    }
  };

  useEffect(() => {
    getChunkSource();
  }, []);

  return (
    <div className={styles.chunkSourceInfoPopup}>
      <Popup
        className={styles.popup}
        visible={visible}
        onMaskClick={() => {
          close();
        }}
        bodyStyle={{
          padding: '0 1.25rem',
          boxSizing: 'border-box',
          borderTopLeftRadius: '0.625rem',
          borderTopRightRadius: '0.625rem',
        }}
      >
        <div className={styles.popupContent}>
          {currentVideoInfo && (
            <div className={styles.rootCidWrap}>
              RCID:{' '}
              <span className={styles.rootCid}>{currentVideoInfo.rootCid}</span>
            </div>
          )}
          <div className={styles.titleWrap}>
            <span className={styles.title}>
              {intl.formatMessage({
                id: 'video.chunkSourceInfoPopup.titleWrap',
              })}
            </span>
            <span className={styles.totalPercent}>
              {totalPercent.toFixed(2)}%
            </span>
          </div>
          {loading ? (
            <p className={styles.loading}>loading...</p>
          ) : (
            <>
              <div className={styles.sourceWrap}>
                {chunkArr.map((item, index) => (
                  <div className={styles.sourceItem} key={item.overlay}>
                    <div className={styles.left}>
                      <div
                        className={styles.block}
                        style={{
                          background:
                            index < 5 ? colorArr[index + 1] : colorArr[6],
                        }}
                      />
                      <div className={styles.address}>{item.overlay}</div>
                    </div>
                    <div className={styles.percent}>
                      {((item.downloadLen / len) * 100).toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
              {chunkArr.length ? (
                <div className={styles.blockList}>
                  <ChunkTooltip chunk={getChunkArr(chunkArr)} />
                </div>
              ) : (
                <div className={styles.blockList}>
                  {currentVideoInfo && (
                    <ChunkTooltip
                      chunk={currentVideoInfo.bitVector.b
                        .split('')
                        .map((item) => parseInt(item))}
                    />
                  )}
                </div>
              )}
            </>
          )}
          <div className={styles.button} onClick={() => close()}>
            {intl.formatMessage({
              id: 'video.chunkSourceInfoPopup.close',
            })}
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default ChunkSourceInfoPopup;
