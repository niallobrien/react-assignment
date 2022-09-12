import React, { ReactElement, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './LoginFormSchema';
import { ILoginFormInputs } from './types';

import './Login.css';
import '../../styles/shadows.css';
import '../../styles/form.css';
import '../../styles/statuses.css';
import '../../styles/utilities.css';
import { useRegister } from '../../hooks/useRegister';
import { useNavigate } from 'react-router';

export const Login = (): ReactElement => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ILoginFormInputs>({
    mode: 'all',
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
  });
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ILoginFormInputs>({
    name: '',
    email: '',
  });

  // move to clientId to .env
  const { data, isLoading } = useRegister(formData.name, formData.email);

  const onSubmit: SubmitHandler<ILoginFormInputs> = (
    values: ILoginFormInputs
  ): void => {
    setFormData(values);
  };

  useEffect(() => {
    if (data?.sl_token) {
      localStorage.setItem('token', JSON.stringify(data.sl_token));
      localStorage.setItem(
        'user',
        JSON.stringify({ name: formData.name, email: formData.email })
      );
      navigate('/dashboard');
    }
  }, [data]);

  return (
    <>
      <form className="login-form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="box-shadow">
          <div className="login-form">
            <h1 className="heading">Login</h1>
            <div className="form-inputs">
              <div>
                <span className="error text-error text-left m0">
                  {errors?.name?.message}
                </span>
              </div>

              <Controller
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Name"
                    className="text-input"
                    id="name"
                    {...register('name')}
                    onChange={(e) => {
                      setValue('name', e.target.value);
                    }}
                  />
                )}
                name="name"
                control={control}
              />

              <div>
                <span className="error text-error text-left m0">
                  {errors?.email?.message}
                </span>
              </div>

              <Controller
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Email"
                    className="text-input"
                    {...register('email')}
                    onChange={(e) => {
                      setValue('email', e.target.value);
                    }}
                  />
                )}
                name="email"
                control={control}
              />

              <input
                type="submit"
                value="Login"
                className="button-input"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
