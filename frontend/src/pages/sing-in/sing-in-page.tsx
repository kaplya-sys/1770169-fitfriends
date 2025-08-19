import {ChangeEvent, FormEvent, useState} from 'react';

import {Logo} from '../../components/logo/logo';
import {CustomInput} from '../../ui/custom-input';
import {AuthUserType} from '../../libs/shared/types';
import {useAppDispatch} from '../../hooks';
import {authAction} from '../../store';

export const SingInPage = () => {
  const [data, setData] = useState<AuthUserType>({
    email: '',
    password: ''
  });
  const dispatch = useAppDispatch();
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = evt.target;
    setData((prevState) => ({...prevState, [name]: value}));
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(authAction(data));
    setData((prevState) => ({...prevState, email: '', password: ''}));
  };

  return (
    <div className='wrapper'>
      <main>
        <Logo/>
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form onSubmit={handleFormSubmit}>
                  <div className="sign-in">
                    <CustomInput
                      label='E-mail'
                      type='email'
                      name='email'
                      className='sign-in__input'
                      value={data.email}
                      onInputChange={handleInputChange}
                    />
                    <CustomInput
                      label='Пароль'
                      type='password'
                      name='password'
                      className='sign-in__input'
                      value={data.password}
                      onInputChange={handleInputChange}
                    />
                    <button className="btn sign-in__button" type="submit">Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
