import { FC, useEffect, useState } from 'react';
import { IPost } from '../Dashboard/types';
import { useAtom } from 'jotai';
import {
  FilteredSendersAtom,
  SenderListAtom,
  SenderSearchInputAtom,
  UsersPostsAtom,
} from '../../atoms/PostsAtom';
import { ISendersWithPosts } from './types';
import { useSearchParams } from 'react-router-dom';

export const SenderList: FC<{ data: { page: number; posts: IPost[] } }> = (
  props
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setSenderSearchInput] = useAtom(SenderSearchInputAtom);
  const [, setSenderList] = useAtom(SenderListAtom);
  const [filteredSenders] = useAtom(FilteredSendersAtom);
  const [, setUsersPosts] = useAtom(UsersPostsAtom);
  const [groupedPosts, setGroupedPosts] = useState<ISendersWithPosts>({});
  const [activeSender, setActiveSender] = useState('');

  const onClickSenderHandler = (userPosts: IPost[]): void => {
    setUsersPosts(userPosts);
    setSearchParams({ sender: userPosts[0].from_id });
  };

  useEffect(() => {
    const sortedNames = props.data?.posts.sort((a, b) =>
      a.from_name.toLowerCase().localeCompare(b.from_name.toLowerCase())
    );

    const groupByName = sortedNames?.reduce(
      (senderListWithPosts: ISendersWithPosts, currentPost: IPost) => {
        // eslint-disable-next-line camelcase
        const { from_id } = currentPost;
        // eslint-disable-next-line camelcase
        senderListWithPosts[from_id] = senderListWithPosts[from_id] ?? [];
        // eslint-disable-next-line camelcase
        senderListWithPosts[from_id].push(currentPost);
        return senderListWithPosts;
      },
      {}
    );

    setGroupedPosts(groupByName);
  }, [props.data]);

  useEffect(() => {
    const userId = new URLSearchParams(searchParams).get('sender') || '';
    if (userId !== '' && groupedPosts) {
      setUsersPosts(groupedPosts[userId]);
    }
    setSenderList(groupedPosts);
    setActiveSender(userId);
  }, [searchParams, groupedPosts]);

  return (
    <>
      <input
        type="search"
        placeholder="Search users"
        className="field-input"
        onChange={(e) => setSenderSearchInput(e.target.value)}
      />

      {Object.values(filteredSenders ?? {}).map((userPosts: IPost[]) => (
        <a
          href="#"
          key={userPosts[0].from_name}
          className={
            activeSender === userPosts[0].from_id ? 'sender active' : 'sender'
          }
          onClick={() => onClickSenderHandler(userPosts)}
        >
          <span>{userPosts[0].from_name}</span>
          <span className="float-right">{userPosts.length}</span>
        </a>
      ))}
    </>
  );
};
