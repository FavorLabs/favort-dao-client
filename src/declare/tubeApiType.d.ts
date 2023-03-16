import { AxiosResponse } from 'axios';

export type User = {
  address: string;
  avatar: string;
  nickname: string;
};

export type Post = {
  content: string;
  type: number;
  sort: number;
};

export type Page = {
  page: number;
  page_size: number;
  type?: number;
  query?: string;
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
  user: User;
};

export type CommentParams = {
  content: string;
  type: number;
  sort: number;
};

export type CommentRes = CommentParams & {
  id: string;
  created_on: number;
  modified_on: number;
  deleted_on: number;
  is_del: number;
  comment_id: string;
};

export type CommentInfo = {
  id: string;
  post_id: string;
  address: string;
  user: User;
  contents: CommentRes[];
  replies: CommentInfo[];
  created_on: number;
  modified_on: number;
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
  follow_count: number;
  last_posts: [
    {
      type: number;
      created_on: number;
      contents: Post[];
    },
  ];
};

export type LastPosts = {};

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

export type BucketRes = {
  BuildInfo: {
    Version: string;
    Sum: string;
    BuildDate: string;
  };
  Settings: {
    Bucket: string;
  };
};
