import { ChangeEvent, FormEvent, useState } from 'react';

import { Logo } from '../../components/logo/logo';
import { PopupForm } from '../../components/popup-form';
import { CustomInput } from '../../ui/custom-input';
import { AuthUser } from '@fitfriends/lib/shared/types';
import { useAppDispatch } from '../../hooks';
import { authAction } from '../../store';

export const SingInPage = () => {
  const [data, setData] = useState<AuthUser>({
    email: '',
    password: ''
  });

  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    dispatch(authAction(formData));
    setData((prevState) => ({ ...prevState, email: '', password: '' }));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className='wrapper'>
      <main>
        <Logo />
        <PopupForm
          blockClassName='sign-in'
          title='Вход'
          onFormSubmit={ handleFormSubmit }
        >
          <CustomInput
            label='E-mail'
            type='email'
            name='email'
            className='sign-in__input'
            value={ data.email }
            onInputChange={ handleInputChange }
          />
          <CustomInput
            label='Пароль'
            type='password'
            name='password'
            className='sign-in__input'
            value={ data.password }
            onInputChange={ handleInputChange }
          />
        </PopupForm>
      </main>
    </div>
  );
};
