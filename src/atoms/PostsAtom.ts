import { atom } from 'jotai';
import { IPost } from '../components/Dashboard/types';
import { ISendersWithPosts } from '../components/SenderList/types';

export const SenderSearchInputAtom = atom('');
export const PostSearchInputAtom = atom('');
export const PostSortAtom = atom('desc');
export const SenderListAtom = atom<ISendersWithPosts>({});
export const UsersPostsAtom = atom<IPost[]>([]);

export const FilteredSendersAtom = atom<ISendersWithPosts>((get) => {
  let results = get(SenderListAtom);
  const searchInput = get(SenderSearchInputAtom);

  if (searchInput !== '') {
    results = Object.values(results ?? {}).filter((userPosts: IPost[]) =>
      userPosts[0].from_name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }
  return results;
});

export const FilteredUsersPostsAtom = atom<IPost[]>((get) => {
  let results = get(UsersPostsAtom);
  const sortOrder = get(PostSortAtom);

  if (results && sortOrder === 'asc') {
    results = results.sort(
      (a, b) =>
        new Date(a.created_time).getTime() - new Date(b.created_time).getTime()
    );
  } else if (results) {
    results = results.sort(
      (a, b) =>
        new Date(b.created_time).getTime() - new Date(a.created_time).getTime()
    );
  }

  if (get(PostSearchInputAtom) !== '') {
    results = results.filter((searchItem) => {
      return searchItem.message.includes(get(PostSearchInputAtom));
    });
  }

  return results;
});
