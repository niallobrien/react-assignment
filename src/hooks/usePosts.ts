import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getPosts = async (page: number) => {
  const response = await axios.get('/posts', {
    params: {
      page,
    },
  });
  return response.data.data;
};

const usePosts = (page = 1) => useQuery(['posts', page], () => getPosts(page));
export { usePosts };
