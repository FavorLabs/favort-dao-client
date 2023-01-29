import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Space, Table, Tag } from 'antd';
const { Column } = Table;
import {
  EditOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { usePath } from '@/utils/hooks';
import VideoInfo, { video } from '@/config/temp';

export type Props = {};

const VideoList: React.FC<Props> = (props) => {
  const path = usePath();
  const [videoData, setVideoData] = useState<video[]>([]);

  const getVideoList = () => {
    const arr: video[] = [];
    for (let i = 0; i < 10; i++) {
      arr.push(VideoInfo);
    }
    return arr;
  };

  const deleteVideo = (id: string) => {
    //
  };

  useEffect(() => {
    const videoData = getVideoList();
    setVideoData(videoData);
  }, []);

  return (
    <>
      <div className={styles.content}>
        <p className={styles.title}>Channel Videos</p>
        <div className={styles.videoList}>
          <Table
            className={styles.videoTable}
            dataSource={videoData}
            pagination={{
              pageSize: 5,
            }}
          >
            <Column title="Video" dataIndex="title" key="title" />
            <Column title="Views" dataIndex="views" key="views" />
            <Column title="Category" dataIndex="category" key="category" />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={(tags: string[]) => (
                <>
                  {tags.map((tag) => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
              )}
            />
            <Column
              title="Action"
              key="action"
              render={(_: any, record: video) => (
                <Space
                  size="middle"
                  className={styles.actions}
                  style={{ fontSize: '18px', color: '#666', cursor: 'pointer' }}
                >
                  <EditOutlined
                    className={styles.edit}
                    onClick={() => {
                      path(`/manage/details/${record.id}`);
                    }}
                  />
                  <PlayCircleOutlined
                    className={styles.play}
                    onClick={() => {
                      path(`/video/${record.id}`);
                    }}
                  />
                  <DeleteOutlined
                    className={styles.delete}
                    onClick={() => {
                      deleteVideo(record.id);
                    }}
                  />
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </>
  );
};

export default VideoList;
