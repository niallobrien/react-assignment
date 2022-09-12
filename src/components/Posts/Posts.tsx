import { ChangeEvent, ReactElement } from 'react';
import { useAtom } from 'jotai';
import {
  FilteredUsersPostsAtom,
  PostSearchInputAtom,
  PostSortAtom,
} from '../../atoms/PostsAtom';

export const Posts = (): ReactElement => {
  const [postSearchInput, setPostSearchInput] = useAtom(PostSearchInputAtom);
  const [, setPostSortDropdown] = useAtom(PostSortAtom);
  const [filteredPosts, setFilteredPosts] = useAtom(FilteredUsersPostsAtom);

  const onChangeSortHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPostSortDropdown(e.target?.value);
  };

  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPostSearchInput(e.target.value);
  };

  return (
    <>
      <div className="row">
        {filteredPosts?.length > 0 && (
          <div className="column">
            <select className="field-input mr1" onChange={onChangeSortHandler}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        )}
        <div className="column">
          <input
            type="search"
            placeholder="Search posts"
            className="field-input"
            onChange={onChangeSearchHandler}
          />
        </div>
      </div>
      {filteredPosts?.length > 0 && (
        <h3 className="pl1">{filteredPosts[0].from_name}</h3>
      )}
      {filteredPosts?.map((post) => {
        return (
          <div key={post.id} className="box-shadow p1 mb1">
            <p>
              {new Date(post.created_time).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })}
            </p>
            <p>{post.message}</p>
          </div>
        );
      })}
      {filteredPosts?.length === 0 && postSearchInput !== '' && (
        <p>No results found.</p>
      )}
      {filteredPosts?.length === 0 && postSearchInput === '' && (
        <p>Please select a sender.</p>
      )}
    </>
  );
};
