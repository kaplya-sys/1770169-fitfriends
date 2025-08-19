import {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import classNames from 'classnames';
import {useParams} from 'react-router-dom';

import {Layout} from '../../components/layout';
import {CoachPersonalAccount} from '../../components/coach-personal-account';
import {UserPersonalAccount} from '../../components/user-personal-account';
import {CustomSelect} from '../../ui/custom-select';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  deleteUserAction,
  getUserAction,
  selectUser,
  updateUserAction
} from '../../store';
import {
  AttributeName,
  EXERCISE_NAMES,
  FITNESS_LEVEL_NAME,
  GENDER_NAME,
  LOCATION_NAME,
} from '../../libs/shared/constants';
import {
  Exercise,
  ExerciseType,
  FitnessLevel,
  FitnessLevelType,
  Gender,
  GenderType,
  Location,
  LocationType,
  ParamsType,
  Role,
  UpdateUserType
} from '../../libs/shared/types';
import {validateFields} from '../../libs/shared/helpers';

export const PersonalAccountPage = () => {
  const [data, setData] = useState<UpdateUserType>({});
  const [error, setError] = useState<Partial<Record<keyof UpdateUserType, string>>>({});
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [isSexOpen, setIsSexOpen] = useState<boolean>(false);
  const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {id} = useParams<ParamsType>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch, id]);
  const user = useAppSelector(selectUser);

  if (!user) {
    return null;
  }
  setData({
    name: user.name,
    gender: user.gender,
    location: user.location,
    exercises: user.questionnaire.exercises,
    description: user.description,
    isReady: user.isReady,
    fitnessLevel: user.questionnaire.fitnessLevel
  });
  const handleEditButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (evt.currentTarget.type === 'button') {
      return setIsEdit((prevState) => !prevState);
    }
    const newError = validateFields(data);

    if (!newError) {
      dispatch(updateUserAction(data));
    } else {
      setError(newError);
    }
    setIsEdit((prevState) => !prevState);
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setData((prevState) => {
      if (name === AttributeName.EXERCISE && data.exercises && evt.target instanceof HTMLInputElement) {
        if (evt.target.checked && data.exercises.length < 3) {
          return {
            ...prevState,
            exercises: prevState.exercises?.concat(value as ExerciseType)
          };
        }

        return {
          ...prevState,
          exercises: prevState.exercises?.filter((item) => item !== value)
        };
      }

      return {...prevState, [name]: value};
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

  const handleLocationClick = (location: LocationType) => {
    setData((prevState) => ({...prevState, location}));
    setIsLocationOpen((prevState) => !prevState);
  };

  const handleSexClick = (gender: GenderType) => {
    setData((prevState) => ({...prevState, gender}));
    setIsSexOpen((prevState) => !prevState);
  };

  const handleLevelClick = (fitnessLevel: FitnessLevelType) => {
    setData((prevState) => ({...prevState, fitnessLevel}));
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
                        src={user.avatar?.image}
                        srcSet={user.avatar?.image2x}
                        width="98"
                        height="98"
                        alt="User avatar"
                      />
                    </span>
                  </label>
                </div>
                {user.role === Role.Coach &&
                  <div className="user-info-edit__controls">
                    <button
                      className="user-info-edit__control-btn"
                      aria-label="обновить"
                      onClick={() => void dispatch(getUserAction())}
                    >
                      <svg width="16" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-change"></use>
                      </svg>
                    </button>
                    <button
                      className="user-info-edit__control-btn"
                      aria-label="удалить"
                      onClick={() => void dispatch(deleteUserAction())}
                    >
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>}
              </div>
              <form className="user-info__form">
                <button
                  className="btn-flat btn-flat--underlined user-info__edit-button"
                  type={isEdit ? 'submit' : 'button'}
                  aria-label={isEdit ? 'Сохранить' : 'Редактировать'}
                  onClick={handleEditButtonClick}
                >
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg>
                  <span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
                </button>
                <div className="user-info__section">
                  <h2 className="user-info__title">Обо мне</h2>
                  <div className={classNames('custom-input', {'custom-input--readonly': !isEdit}, 'user-info__input')}>
                    <label>
                      <span className="custom-input__label">Имя</span>
                      <span className="custom-input__wrapper">
                        <input
                          type="text"
                          name="name"
                          value={data.name}
                          disabled={!isEdit}
                          onChange={handleInputChange}
                        />
                      </span>
                    </label>
                  </div>
                  {(data.description || isEdit) &&
                    <div className={classNames('custom-textarea', {'custom-textarea--readonly': !isEdit}, 'user-info__textarea')}>
                      <label>
                        <span className="custom-textarea__label">Описание</span>
                        <textarea
                          name="description"
                          value={data.description}
                          disabled={!isEdit}
                          onChange={handleInputChange}
                        />
                      </label>
                    </div>}
                </div>
                <div className="user-info__section user-info__section--status">
                  <h2 className="user-info__title user-info__title--status">Статус</h2>
                  <div className="custom-toggle custom-toggle--switch user-info__toggle">
                    <label>
                      <input
                        type="checkbox"
                        name="ready-for-training"
                        checked={data.isReady}
                        disabled={!isEdit}
                        onChange={() => setData((prevState) => ({...prevState, isReady: !prevState.isReady}))}
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">{user.role === Role.Coach ? 'Готов тренировать' : 'Готов тренироваться'}</span>
                    </label>
                  </div>
                </div>
                <div className="user-info__section">
                  <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
                  <div className="specialization-checkbox user-info__specialization">
                    {Object.values(Exercise).map((exercise) => (
                      <div className="btn-checkbox" key={exercise}>
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="exercise"
                            value={exercise}
                            disabled={!isEdit}
                            checked= {data.exercises?.includes(exercise)}
                            onChange={handleInputChange}
                          />
                          <span className="btn-checkbox__btn">{EXERCISE_NAMES[exercise]}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <CustomSelect
                  title='Локация'
                  selectedValue={data.location || ''}
                  errorMessage={error.location}
                  option={Location}
                  isOpen={isLocationOpen}
                  isReadonly={!isEdit}
                  nameTransform={LOCATION_NAME}
                  className='user-info__select'
                  placeholder={`ст. м. ${LOCATION_NAME[user.location]}`}
                  onListBoxClick={handleLocationSelectClick}
                  onListOptionClick={handleLocationClick}
                />
                <CustomSelect
                  title='Пол'
                  selectedValue={data.gender || ''}
                  errorMessage={error.gender}
                  option={Gender}
                  isOpen={isSexOpen}
                  isReadonly={!isEdit}
                  nameTransform={GENDER_NAME}
                  className='user-info__select'
                  placeholder={GENDER_NAME[user.gender]}
                  onListBoxClick={handleSexSelectClick}
                  onListOptionClick={handleSexClick}
                />
                <CustomSelect
                  title='Уровень'
                  selectedValue={data.fitnessLevel || ''}
                  errorMessage={error.fitnessLevel}
                  option={FitnessLevel}
                  isOpen={isLevelOpen}
                  isReadonly={!isEdit}
                  nameTransform={FITNESS_LEVEL_NAME}
                  className='user-info__select'
                  placeholder={FITNESS_LEVEL_NAME[user.questionnaire.fitnessLevel]}
                  onListBoxClick={handleLevelSelectClick}
                  onListOptionClick={handleLevelClick}
                />
              </form>
            </section>
            <div className="inner-page__content">
              {user.role === Role.Coach ? <CoachPersonalAccount/> : <UserPersonalAccount/>}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
