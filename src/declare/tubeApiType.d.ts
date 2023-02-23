import { AxiosResponse } from 'axios';

export type Post = {
  content: string;
  type: number;
  sort: number;
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
  tags: [];
  type: number;
  upvote_count: number;
  view_count: number;
  visibility: number;
  id: string;
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

export type Dao = {
  name: string;
  introduction: string;
  visibility: boolean;
};

export type DaoInfo = {
  address: string;
  avatar: string;
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
