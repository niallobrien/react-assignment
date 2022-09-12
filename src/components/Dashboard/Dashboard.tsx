import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { usePosts } from '../../hooks/usePosts';
import Sender from '../SenderList';
import { UsersPostsAtom } from '../../atoms/PostsAtom';
import './Dashboard.css';
import '../../styles/grid.css';
import Posts from '../Posts';

export const Dashboard = () => {
  const [, setToken] = useState('');
  const navigate = useNavigate();
  const { data, isLoading } = usePosts();
  const [usersPosts, setUsersPosts] = useAtom(UsersPostsAtom);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) return setToken(JSON.parse(token));
    return navigate('/');
  }, []);

  return (
    <div className="row">
      <div className="column sidebar p1">
        <Sender data={data} />
      </div>
      <div className="main-content column">
        <Posts />
      </div>
    </div>
  );
};
