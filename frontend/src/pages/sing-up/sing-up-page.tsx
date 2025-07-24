import { ChangeEvent, FormEvent, useState } from 'react';

import { ImageLoad } from '../../components/image-load';
import { CustomSelect } from '../../ui/custom-select';
import { Logo } from '../../components/logo/logo';
import { PopupForm } from '../../components/popup-form';
import { RoleSelection } from '../../components/role-selection';
import { UserAgreement } from '../../components/user-agreement';
import { CustomRadioGroup } from '../../ui/custom-radio-group';
import { CustomInput } from '../../ui/custom-input';
import { useAppDispatch } from '../../hooks';
import { registerAction } from '../../store';
import { CreateUserType } from '../../lib/shared/types';
import { fieldValidators } from '../../lib/shared/helpers';
import { LOCATION_OPTIONS, SEX_OPTIONS } from '../../lib/shared/constants';

export const SingUpPage = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<CreateUserType>({
    name: '',
    email: '',
    birthday: '',
    location: '',
    password: '',
    sex: '',
    role: ''
  });
  const [error, setError] = useState<Omit<CreateUserType, 'avatar' | 'role' | 'sex'>>({
    name: '',
    email: '',
    birthday: '',
    location: '',
    password: ''
  });

  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('location', data.location);
    formData.append('password', data.password);
    formData.append('sex', data.sex);
    formData.append('role', data.role);

    if (data.birthday) {
      formData.append('birthday', data.birthday);
    }

    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key in fieldValidators && typeof value === 'string') {
        const message = fieldValidators[key](value);
        if (message) {
          setError((prevState) => ({...prevState, [key]: message}));
        }
      }
    });

    if (!Object.values(!error).length) {
      dispatch(registerAction(formData));
    }
  };

  const handleListBoxClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLocationClick = (location: string) => {
    setData((prevState) => ({ ...prevState, location }));
    setError((prevState) => ({ ...prevState, location: '' }));
    setIsOpen((prevState) => !prevState);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
    setError((prevState) => ({ ...prevState, [name]: '' }));
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];

    if (file) {
      setData((prevState) => ({ ...prevState, avatar: file }));
    }
  };

  const handleUserAgreementChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className='wrapper'>
      <main>
        <Logo />
        <PopupForm
          blockClassName='sign-up'
          title='Регистрация'
          agreementISChecked={ isChecked }
          onFormSubmit={ handleFormSubmit }
        >
          <ImageLoad blockClassName='sign-up' onFileChange={ handleFileChange } />
          <div className="sign-up__data">
            <CustomInput
              label='Имя'
              type='text'
              name='name'
              errorMessage={ error.name }
              value={ data.name }
              onInputChange={ handleInputChange }
            />
            <CustomInput
              label='E-mail'
              type='email'
              name='email'
              errorMessage={ error.email }
              value={ data.email }
              onInputChange={ handleInputChange }
            />
            <CustomInput
              label='Дата рождения'
              type='date'
              name='birthday'
              errorMessage={ error.birthday }
              max="2099-12-31"
              value={ data.birthday ?? '' }
              onInputChange={ handleInputChange }
            />
            <CustomSelect
              title='Ваша локация'
              selectedValue={ data.location }
              isOpen={ isOpen }
              isReadonly={ false }
              options={ LOCATION_OPTIONS }
              errorMessage={ error.location }
              onListBoxClick={ handleListBoxClick }
              onListOptionClick={ handleLocationClick }
            />
            <CustomInput
              label='Пароль'
              type='password'
              name='password'
              errorMessage={ error.password }
              autoComplete='off'
              value={ data.password }
              onInputChange={ handleInputChange }
            />
            <div className="sign-up__radio">
              <span className="sign-up__label">Пол</span>
              <CustomRadioGroup
                options={ SEX_OPTIONS }
                selectedValue={ data.sex }
                onInputChange={ handleInputChange }
              />
            </div>
          </div>
          <RoleSelection
            blockClassName='sign-up'
            value={ data.role }
            onInputChange={ handleInputChange }
          />
          <UserAgreement
            blockClassName='sign-up'
            checked={ isChecked }
            onUserAgreementChange={ handleUserAgreementChange }
          />
        </PopupForm>
      </main>
    </div>
  );
};
