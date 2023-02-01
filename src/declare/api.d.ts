export declare type ApiPort = {
  debugApiPort: string;
  rpcWsPort: string;
};

type FilterOptional<T extends {}> = {
  [K in keyof T]?: undefined extends T[K] ? T[K] : never;
};

export type MongoDBRes = {
  id: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type CLCreatePS<T = string> = {
  name?: string;
  address: string;
  avatar?: string;
  banner?: string;
  introduction?: string;
  topVideoId?: T;
};

export type CLUpdatePS = FilterOptional<CLCreatePS>;

export type CLRes = Required<CLCreatePS<Required<VideoCreatePS>> | null> &
  MongoDBRes;

export type VideoCreatePS<T = string | undefined> = {
  channelId: T;
  hash: string;
  overlay: string;
  title?: string;
  description?: string;
  tags?: string[];
  thumbnail?: string;
  category?: string;
};

export type VideoUpdatePS = FilterOptional<VideoCreatePS>;

export type VideoRes = VideoCreatePS<Required<CLCreatePS>> & MongoDBRes;

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
  list: VideoRes[];
};

export type Data<T> = {
  success: boolean;
  data: T;
};
