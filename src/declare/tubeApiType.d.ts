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

export type Pagination = {
  page: number;
  page_size: number;
};

export type Page = Pagination & {
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

export type Comment = {
  content: string;
  type: number;
  sort: number;
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

export type CreateComment = {
  post_id: string;
  contents: Comment[];
};

export type CreateReply = {
  comment_id: string;
  content: string;
};

export type GetCommentsParams = Pagination & {
  id: string;
};

export type CommentRes = Comment & {
  id: string;
  created_on: number;
  modified_on: number;
  deleted_on: number;
  is_del: number;
  comment_id: string;
  post_id: string;
  address: string;
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
  pager: Pagination & {
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

export type GetMsgIdRes = {
  channel_type: string;
  _id: string;
  server: string;
  name: string;
  last_message_id: string;
};

export type GetMsgRes = {
  _id: string;
  nonce: string;
  channel: string;
  author: string;
  content: string;
};

export type LastMsg = {
  content: string;
  created_on: number;
};
