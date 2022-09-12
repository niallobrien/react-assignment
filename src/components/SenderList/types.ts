import { IPost } from '../Dashboard/types';

export interface ISendersWithPosts {
  [key: string]: IPost[];
}
