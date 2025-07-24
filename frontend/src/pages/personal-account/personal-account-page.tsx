import { ChangeEvent, MouseEvent, useState } from 'react';
import classNames from 'classnames';

import { Role, Specialization } from '@fitfriends/lib/shared/types';

import { Layout } from '../../components/layout';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteUserAction, getUserAction, selectUser, updateUserAction } from '../../store';
import { SpecializationsGroup } from '../../components/specializations-group';
import {
  AttributeName,
  SPECIALIZATION_OPTIONS,
  LEVEL_OPTIONS,
  LOCATION_OPTIONS,
  SEX_OPTIONS,
  USER_LEVEL_NAME,
  USER_LOCATION_NAME,
  USER_SEX_NAME
} from '../../lib/shared/constants';
import { CustomSelect } from '../../ui/custom-select';
import { Level, UserLocation, Sex } from '@fitfriends/lib/shared/types';
import { UpdateUserType } from '../../lib/shared/types/lib/update-user.type';
import { CoachPersonalAccount } from '../../components/coach-personal-account';
import { UserPersonalAccount } from '../../components/user-personal-account';

export const PersonalAccountPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [data, setData] = useState<UpdateUserType>({
    name: user?.name || '',
    description: user?.description || '',
    isReady: user?.isReady || false,
    specializations: user?.specializations || [],
    location: user?.location || '',
    sex: user?.sex || '',
    level: user?.level || ''
  });
  const [error, setError] = useState({
    name: '',
    description: '',
    specializations: '',
    location: '',
    sex: '',
    level: ''
  });
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [isSexOpen, setIsSexOpen] = useState<boolean>(false);
  const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (evt.currentTarget.type === 'button') {
      return setIsEdit((prevState) => !prevState);
    }
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('isReady', data.isReady.toString());
    formData.append('location', data.location);
    formData.append('sex', data.sex);
    formData.append('level', data.level);

    /*Object.entries(data).forEach(([key, value]) => {
      if (key in fieldValidators && typeof value === 'string') {
        const message = fieldValidators[key](value);
        if (message) {
          setError((prevState) => ({...prevState, [key]: message}));
        }
      }
    });*/

    if (!Object.values(!error).length) {
      dispatch(updateUserAction(formData));
    }
    setIsEdit((prevState) => !prevState);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setData((prevState) => {
      if (name === AttributeName.SPECIALIZATION && 'checked' in evt.target) {
        if (evt.target.checked && data.specializations.length < 3) {
          return {
            ...prevState,
            specializations: prevState.specializations?.concat(value as Specialization)
          };
        }

        return {
          ...prevState,
          specializations: prevState.specializations?.filter((item) => item !== value)
        };
      }

      return { ...prevState, [name]: value };
    });
  };
  const handleLocationSelectClick = () => {
    setIsLocationOpen((prevState) => !prevState);
  };

  const handleSexSelectClick = () => {
    setIsSexOpen((prevState) => !prevState);
  };

  const handleLevelSelectClick = () => {
    setIsLevelOpen((prevState) => !prevState);
  };

  const handleLocationClick = (location: string) => {
    setData((prevState) => ({ ...prevState, location }));
    setError((prevState) => ({ ...prevState, location: '' }));
    setIsLocationOpen((prevState) => !prevState);
  };

  const handleSexClick = (sex: string) => {
    setData((prevState) => ({ ...prevState, sex }));
    setError((prevState) => ({ ...prevState, sex: '' }));
    setIsSexOpen((prevState) => !prevState);
  };

  const handleLevelClick = (level: string) => {
    setData((prevState) => ({ ...prevState, level }));
    setError((prevState) => ({ ...prevState, level: '' }));
    setIsLevelOpen((prevState) => !prevState);
  };

  return (
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <section className="user-info">
              <div className="user-info__header">
                <div className="input-load-avatar">
                  <label>
                    <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
                    <span className="input-load-avatar__avatar">
                      <img
                        src={ user?.avatar?.file.path }
                        srcSet={ user?.avatar?.file2x?.path }
                        width="98"
                        height="98"
                        alt="user photo"
                      />
                    </span>
                  </label>
                </div>
                { user?.role === Role.Coach &&
                  <div className="user-info-edit__controls">
                    <button
                      className="user-info-edit__control-btn"
                      aria-label="обновить"
                      onClick={ () => void dispatch(getUserAction(user.id))}
                    >
                      <svg width="16" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-change"></use>
                      </svg>
                    </button>
                    <button
                      className="user-info-edit__control-btn"
                      aria-label="удалить"
                      onClick={ () => void dispatch(deleteUserAction()) }
                    >
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div> }
              </div>
              <form className="user-info__form">
                <button
                  className="btn-flat btn-flat--underlined user-info__edit-button"
                  type={ isEdit ? 'submit' : 'button' }
                  aria-label={ isEdit ? 'Сохранить' : 'Редактировать' }
                  onClick={ handleEditButtonClick }
                >
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg>
                  <span>{ isEdit ? 'Сохранить' : 'Редактировать' }</span>
                </button>
                <div className="user-info__section">
                  <h2 className="user-info__title">Обо мне</h2>
                  <div className={ classNames('custom-input', { 'custom-input--readonly': !isEdit }, 'user-info__input') }>
                    <label>
                      <span className="custom-input__label">Имя</span>
                      <span className="custom-input__wrapper">
                        <input
                          type="text"
                          name="name"
                          value={ data.name }
                          disabled={ !isEdit }
                          onChange={ handleInputChange }
                        />
                      </span>
                    </label>
                  </div>
                  { (data.description || isEdit) &&
                    <div className={ classNames('custom-textarea', { 'custom-textarea--readonly': !isEdit }, 'user-info__textarea') }>
                      <label>
                        <span className="custom-textarea__label">Описание</span>
                        <textarea
                          name="description"
                          value={ data.description }
                          disabled={ !isEdit }
                          onChange={ handleInputChange }
                        />
                      </label>
                    </div> }
                </div>
                <div className="user-info__section user-info__section--status">
                  <h2 className="user-info__title user-info__title--status">Статус</h2>
                  <div className="custom-toggle custom-toggle--switch user-info__toggle">
                    <label>
                      <input
                        type="checkbox"
                        name="ready-for-training"
                        checked={ data.isReady }
                        disabled={ !isEdit }
                        onChange={ () => setData((prevState) => ({ ...prevState, isReady: !prevState.isReady })) }
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">{ user?.role === Role.Coach ? 'Готов тренировать' : 'Готов тренироваться' }</span>
                    </label>
                  </div>
                </div>
                <div className="user-info__section">
                  <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
                  <SpecializationsGroup
                    blockClassName='user-info'
                    options={ SPECIALIZATION_OPTIONS }
                    selectedValue={ data.specializations as Specialization[] }
                    isDisabled={ !isEdit }
                    onInputChange={ handleInputChange }
                  />
                </div>
                <CustomSelect
                  title='Локация'
                  selectedValue={ data.location }
                  options={ LOCATION_OPTIONS }
                  isOpen={ isLocationOpen }
                  isReadonly={ !isEdit }
                  nameTransform={ USER_LOCATION_NAME }
                  className='user-info__select'
                  placeholder={ `ст. м. ${ USER_LOCATION_NAME[UserLocation.Petrogradskaya] }` }
                  onListBoxClick={ handleLocationSelectClick }
                  onListOptionClick={ handleLocationClick }
                />
                <CustomSelect
                  title='Пол'
                  selectedValue={ data.sex }
                  options={ SEX_OPTIONS }
                  isOpen={ isSexOpen }
                  isReadonly={ !isEdit }
                  nameTransform={ USER_SEX_NAME }
                  className='user-info__select'
                  placeholder={ USER_SEX_NAME[Sex.Woman] }
                  onListBoxClick={ handleSexSelectClick }
                  onListOptionClick={ handleSexClick }
                />
                <CustomSelect
                  title='Уровень'
                  selectedValue={ data.level }
                  options={ LEVEL_OPTIONS }
                  isOpen={ isLevelOpen }
                  isReadonly={ !isEdit }
                  nameTransform={ USER_LEVEL_NAME }
                  className='user-info__select'
                  placeholder={ USER_LEVEL_NAME[Level.Professional] }
                  onListBoxClick={ handleLevelSelectClick }
                  onListOptionClick={ handleLevelClick }
                />
              </form>
            </section>
            <div className="inner-page__content">
              { user?.role === Role.Coach ?
                <CoachPersonalAccount /> :
                <UserPersonalAccount /> }
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
