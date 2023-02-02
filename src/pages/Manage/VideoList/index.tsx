import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.less';
import { Space, Table, Tag, Modal, Divider, message } from 'antd';
const { Column } = Table;
import { TablePaginationConfig } from 'antd/es/table';
import {
  EditOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { usePath, useUrl } from '@/utils/hooks';
import Api from '@/services/Api';
import ProxyApi from '@/services/ProxyApi';
import { useSelector } from 'umi';
import { Models } from '@/declare/modelType';
import { VideoRes } from '@/declare/api';
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from 'antd/lib/table/interface';

export type Props = {};
type OnChange = (
  pagination: TablePaginationConfig,
  filters: Record<string, FilterValue | null>,
  sorter: SorterResult<VideoRes> | SorterResult<VideoRes>[],
  extra: TableCurrentDataSource<VideoRes>,
) => void;
const pageSizeOption = [10, 20, 50, 100];

const VideoList: React.FC<Props> = (props) => {
  const path = usePath();
  const url = useUrl();
  const { channelInfo } = useSelector((state: Models) => state.global);
  const { refreshVideoList } = useSelector((state: Models) => state.manage);

  const [videoData, setVideoData] = useState<VideoRes[]>([]);
  const [videoDataLoading, setVideoDataLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number | undefined>(1);
  const [pageSize, setPageSize] = useState<number | undefined>(
    pageSizeOption[0],
  );
  const [vidoesTotal, setVidoesTotal] = useState<number>(0);
  const [deleteVideoModal, setDeleteVideoModal] = useState<boolean>(false);
  const [deleteVideoInfo, setDeleteVideoInfo] = useState<VideoRes | null>(null);
  const [deleteVideoLoading, setDeleteVideoLoading] = useState<boolean>(false);

  const getVideoList = async () => {
    setVideoDataLoading(true);
    try {
      const { data } = await ProxyApi.getVideos(url, {
        page: pageNum,
        count: pageSize,
        channelId: channelInfo?._id,
      });
      if (data.data) {
        setVideoData(data.data.list);
        setVidoesTotal(data.data.total);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setVideoDataLoading(false);
    }
  };

  const deleteVideo = async (id: string | undefined) => {
    try {
      setDeleteVideoLoading(true);
      await ProxyApi.deleteVideo(url, id);
      setDeleteVideoModal(false);
      updateVideoList(pageNum, pageSize);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setDeleteVideoLoading(false);
    }
  };

  const tableChange: OnChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'paginate') {
      paginationChange(pagination);
    } else if (extra.action === 'sort') {
      // sorter
    } else {
      // filters
    }
  };

  const paginationChange = (p: TablePaginationConfig) => {
    setPageNum(p.current);
    setPageSize(p.pageSize);
    updateVideoList(p.current, p.pageSize);
  };

  const updateVideoList = async (
    page: number | undefined,
    count: number | undefined,
  ) => {
    setVideoDataLoading(true);
    try {
      const { data } = await ProxyApi.getVideos(url, {
        page,
        count,
        channelId: channelInfo?._id,
      });
      if (data.data) {
        setVideoData(data.data.list);
        setVidoesTotal(data.data.total);
      }
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    } finally {
      setVideoDataLoading(false);
    }
  };

  useEffect(() => {
    getVideoList();
  }, [refreshVideoList]);

  return (
    <>
      <div className={styles.content}>
        <p className={styles.title}>Channel Videos</p>
        <div className={styles.videoList}>
          <Table
            className={styles.videoTable}
            dataSource={videoData}
            loading={videoDataLoading}
            pagination={{
              position: ['bottomRight'],
              responsive: true,
              showTitle: false,
              showSizeChanger: true,
              pageSizeOptions: pageSizeOption,
              current: pageNum,
              pageSize: pageSize,
              total: vidoesTotal,
              // onChange={paginationChange}
            }}
            rowKey={(record) => record?._id}
            onChange={tableChange}
            locale={{ emptyText: 'No Data' }}
          >
            <Column title="Video" dataIndex="title" key="title" width={550} />
            <Column
              title="Views"
              dataIndex="views"
              key="views"
              width={80}
              render={(value) => (
                <>
                  <span>0</span>
                </>
              )}
            />
            <Column
              title="Category"
              dataIndex="category"
              width={200}
              key="category"
            />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              width={200}
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
              width={100}
              render={(_: any, record: VideoRes) => (
                <Space
                  size="middle"
                  className={styles.actions}
                  style={{ fontSize: '18px', color: '#666', cursor: 'pointer' }}
                >
                  <EditOutlined
                    className={styles.edit}
                    onClick={() => {
                      path(`/manage/details/${record._id}`);
                    }}
                  />
                  <PlayCircleOutlined
                    className={styles.play}
                    onClick={() => {
                      path(`/video/${record._id}`);
                    }}
                  />
                  <DeleteOutlined
                    className={styles.delete}
                    onClick={() => {
                      setDeleteVideoInfo(record);
                      setDeleteVideoModal(true);
                    }}
                  />
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
      <Modal
        title={null}
        centered
        maskClosable={false}
        className={styles.deleteVideoModal}
        open={deleteVideoModal}
        onOk={() => {
          deleteVideo(deleteVideoInfo?._id);
        }}
        confirmLoading={deleteVideoLoading}
        onCancel={() => {
          setDeleteVideoModal(false);
        }}
      >
        <div className={styles.modalContent}>
          <p className={styles.title}>Delete Video</p>
          <Divider style={{ margin: '16px 0' }} />
          <p className={styles.desc}>
            Are you sure you want to delete the video?
          </p>
          <p className={styles.deleteVideoInfo}>
            <span className={styles.label}>Title:&nbsp;</span>
            <span className={styles.videoTitle}>{deleteVideoInfo?.title}</span>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default VideoList;
