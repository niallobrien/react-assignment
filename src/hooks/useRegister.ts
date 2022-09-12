import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const registerUser = async (name: string, email: string) => {
  const response = await axios.post('/register', {
    name,
    email,
  });
  return response.data.data;
};

const useRegister = (name: string, email: string) =>
  useQuery(['register', email], () => {
    if (name === '' || email === '') return;
    return registerUser(name, email);
  });

export { registerUser, useRegister };
