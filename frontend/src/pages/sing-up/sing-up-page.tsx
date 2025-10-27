import {ChangeEvent, FormEvent, useEffect, useState} from 'react';

import {StationSelect} from '../../components/station-select';
import {Logo} from '../../components/logo/logo';
import {RoleSelection} from '../../components/role-selection';
import {CustomInput} from '../../ui/custom-input';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {registerAction, selectAuthenticatedUserError} from '../../store';
import {CreateUserType, Gender, StationType} from '../../libs/shared/types';
import {isErrorObject, validateFields} from '../../libs/shared/helpers';
import {GENDER_NAME} from '../../libs/shared/constants';
import classNames from 'classnames';

export const SingUpPage = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<CreateUserType>({
    name: '',
    email: '',
    password: '',
    gender: '',
    station: '',
    role: ''
  });
  const [error, setError] = useState<Partial<Record<keyof CreateUserType, string>>>({});
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const authenticatedUserError = useAppSelector(selectAuthenticatedUserError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isErrorObject(authenticatedUserError) && authenticatedUserError.statusCode === 400) {
      for (const message of authenticatedUserError.message) {
        const field = message.split(' ')[0];
        setError((prevState) => ({...prevState, [field]: message}));
      }
    }
  }, [authenticatedUserError]);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('station', data.station);
    formData.append('password', data.password);
    formData.append('gender', data.gender);
    formData.append('role', data.role);

    if (data.birthday) {
      formData.append('birthday', data.birthday);
    }

    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }
    const newError = validateFields(data);

    if (!newError) {
      dispatch(registerAction(formData));
      setUserAvatar(null);
      setIsChecked(false);
      for (const key of Object.keys(data)) {
        setData((prevState) => ({...prevState, [key]: ''}));
      }
    } else {
      setError(newError);
    }
  };

  const handleListBoxClick = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleStationClick = (station: StationType) => {
    setData((prevState) => ({...prevState, station}));
    setError((prevState) => ({...prevState, station: ''}));
    setIsOpen((prevState) => !prevState);
  };
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = evt.target;
    setData((prevState) => ({...prevState, [name]: value}));
    setError((prevState) => ({...prevState, [name]: ''}));
  };
  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
      setData((prevState) => ({...prevState, avatar: file}));
    }
  };
  const handleUserAgreementChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <div className="wrapper">
      <main>
        <Logo/>
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                <form onSubmit={handleFormSubmit}>
                  <div className="sign-up">
                    <div className="sign-up__load-photo">
                      <div className="input-load-avatar">
                        <label>
                          <input
                            className="visually-hidden"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                          />
                          <span className={classNames({
                            'input-load-avatar__avatar': userAvatar,
                            'input-load-avatar__btn': !userAvatar,
                          })}
                          >
                            {
                              userAvatar ?
                                <img
                                  src={userAvatar}
                                  width="98"
                                  height="98"
                                  alt="User avatar"
                                /> :
                                <svg width="20" height="20" aria-hidden="true">
                                  <use xlinkHref="#icon-import"></use>
                                </svg>
                            }
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__description">
                        <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                        <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                      </div>
                    </div>
                    <div className="sign-up__data">
                      <CustomInput
                        label='Имя'
                        type='text'
                        name='name'
                        errorMessage={error.name}
                        value={data.name}
                        onInputChange={handleInputChange}
                      />
                      <CustomInput
                        label='E-mail'
                        type='email'
                        name='email'
                        errorMessage={error.email}
                        value={data.email}
                        onInputChange={handleInputChange}
                      />
                      <CustomInput
                        label='Дата рождения'
                        type='date'
                        name='birthday'
                        errorMessage={ error.birthday }
                        max="2099-12-31"
                        value={data.birthday ?? ''}
                        onInputChange={handleInputChange}
                      />
                      <StationSelect
                        selectedValue={data.station}
                        isOpen={isOpen}
                        isReadonly={false}
                        errorMessage={error.station}
                        onListBoxClick={handleListBoxClick}
                        onListOptionClick={handleStationClick}
                      />
                      <CustomInput
                        label='Пароль'
                        type='password'
                        name='password'
                        errorMessage={error.password}
                        autoComplete='off'
                        value={data.password}
                        onInputChange={handleInputChange}
                      />
                      <div className="sign-up__radio">
                        <span className="sign-up__label">Пол</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big">
                          {Object.values(Gender).map((gender) => (
                            <div className="custom-toggle-radio__block" key={gender}>
                              <label>
                                <input
                                  type="radio"
                                  name="gender"
                                  value={gender}
                                  checked={data.gender === gender}
                                  onChange={handleInputChange}
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{GENDER_NAME[gender]}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <RoleSelection
                      blockClassName='sign-up'
                      value={data.role}
                      onInputChange={handleInputChange}
                    />
                    <div className="sign-up__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value="user-agreement"
                          name="user-agreement"
                          checked={isChecked}
                          onChange={handleUserAgreementChange}
                        />
                        <span className="sign-up__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                      </label>
                    </div>
                    <button
                      className="btn sign-up__button"
                      type="submit"
                      disabled={!isChecked}
                    >
                      Продолжить
                    </button>
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
