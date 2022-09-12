import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().min(5).required('Please enter your name').label('Name'),
  email: yup
    .string()
    .email()
    .min(5)
    .required('Please enter your email')
    .label('Email'),
});
