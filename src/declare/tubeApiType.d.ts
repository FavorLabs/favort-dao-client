import { AxiosResponse } from 'axios';

export type Post = {
  content: string;
  type: number;
  sort: number;
};

export type Page = {
  page: number;
  page_size: number;
  type?: number;
};

export type CreatePost = {
  contents: Post[];
  dao_id: string;
  tags: string[];
  type: number;
  users: string[];
  visibility: number;
};

export type PostInfo = {
  address: string;
  collection_count: number;
  contents: Post[];
  created_on: number;
  dao: DaoInfo;
  id: string;
  latest_replied_on: number;
  tags: [];
  type: number;
  upvote_count: number;
  view_count: number;
  comment_count: number;
  visibility: number;
  user: {
    address: string;
    avatar: string;
    nickname: string;
  };
};

export type ResData<T> = Promise<
  AxiosResponse<{
    code: number;
    data: T;
    msg: string;
    tracehost: string;
  }>
>;

export type DaoParams = Omit<DaoInfo, 'address' | 'visibility' | 'id'>;

export type DaoInfo = {
  address: string;
  avatar: string;
  banner: string;
  id: string;
  introduction: string;
  name: string;
  visibility: number;
};

export type ListData<T> = {
  list: T[];
  pager: {
    page: number;
    page_size: number;
    total_rows: number;
  };
};

export type Status = {
  status: boolean;
};

export type UploadImage = 'avatars' | 'images';

export type UploadVideo = 'videos';

export type BucketsPath = UploadImage | UploadVideo;
