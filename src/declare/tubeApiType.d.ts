export type MongoDBRes = {
  id: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type UserRes = {
  address: string;
  loginTime: Date;
  operateTime: Date;
} & MongoDBRes;

type Sub = {
  userId: UserRes;
  channelId: CL;
  tx: string;
  expire: number;
};

export type SubRes = Sub & MongoDBRes;

export type BookmarkRes = Omit<Sub, 'tx' | 'expire'> & MongoDBRes;

export declare type VideoListParams = {
  page?: number;
  count?: number;
  category?: string;
  channelId?: string;
};

export declare type VideoListRes = {
  page: number;
  count: number;
  total: number;
  totalPage: number;
  list: VideoRes[];
};

export type Data<T> = {
  success: boolean;
  data: T;
};

export type CL = {
  name: string;
  address: string;
  avatar: string;
  banner: string;
  introduction: string;
  topVideoId: VideoRes | string | null;
};
type RequiredCL = Pick<CL, 'address'>;
type PartialCL = Partial<Omit<CL, keyof RequiredCL>>;

export type CreateCL = RequiredCL & PartialCL;
export type UpdateCL = PartialCL;
export type CLRes = CL & MongoDBRes;

export type Video<> = {
  channelId: CLRes | string;
  hash: string;
  overlay: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  category: string;
  status: 'draft' | 'private' | 'public' | 'member' | 'secret';
  views: number;
  dislikes: number;
  likes: number;
};

type RequiredVideo = Pick<Video, 'overlay' | 'hash' | 'channelId'>;
type PartialVideo = Partial<Omit<Video, keyof RequiredVideo>>;

export type CreateVideo = RequiredVideo | PartialVideo;
export type UpdateVideo = PartialVideo;
export type VideoRes = Video & MongoDBRes;
