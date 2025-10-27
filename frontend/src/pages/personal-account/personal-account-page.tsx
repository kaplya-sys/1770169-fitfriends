import {ChangeEvent, MouseEvent, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import {useParams} from 'react-router-dom';

import {Layout} from '../../components/layout';
import {CoachPersonalAccount} from '../../components/coach-personal-account';
import {UserPersonalAccount} from '../../components/user-personal-account';
import {CustomSelect} from '../../ui/custom-select';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  deleteUserAvatarAction,
  getUserAction,
  selectUser,
  updateUserAction
} from '../../store';
import {
  AttributeName,
  EXERCISE_NAMES,
  FITNESS_LEVEL_NAME,
  GENDER_NAME,
  STATION_NAME,
  MAX_EXERCISES_LENGTH,
  STATIC_BASE_PATH,
} from '../../libs/shared/constants';
import {
  Exercise,
  ExerciseType,
  FitnessLevel,
  FitnessLevelType,
  Gender,
  GenderType,
  Station,
  StationType,
  ParamsType,
  Role,
  UpdateUserType,
  ImageType
} from '../../libs/shared/types';
import {validateFields} from '../../libs/shared/helpers';

export const PersonalAccountPage = () => {
  const [data, setData] = useState<UpdateUserType>({
    avatar: null,
    description: '',
    exercises: [],
    fitnessLevel: '',
    gender: '',
    isReady: false,
    station: '',
    name: '',
  });
  const [error, setError] = useState<Partial<Record<keyof UpdateUserType, string>>>({});
  const [isStationOpen, setIsStationOpen] = useState<boolean>(false);
  const [isGenderOpen, setIsGenderOpen] = useState<boolean>(false);
  const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<string | ImageType | null>(null);
  const {id} = useParams<ParamsType>();
  const user = useAppSelector(selectUser);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserAction({id}));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setData({
        name: user.name,
        description: user.description ?? '',
        isReady: user.isReady,
        exercises: user.questionnaire.exercises
      });

      if (user.avatar) {
        setUserAvatar(user.avatar);
      }
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleUserAvatarDelete = () => {
    if (userAvatar) {
      setUserAvatar(null);
    }
  };
  const handleToggleEditClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (evt.currentTarget.type === 'button') {
      setIsEdit((prevState) => !prevState);

      return;
    }

    if (user.avatar && !userAvatar) {
      dispatch(deleteUserAvatarAction());
    }
    const formData = new FormData();
    const newError = validateFields(data);

    if (!newError) {
      if (data.exercises?.length) {
        for (const exercise of data.exercises) {
          formData.append('exercises', exercise);
        }
      }

      if (data.name) {
        formData.append('name', data.name);
      }

      if (data.description) {
        formData.append('description', data.description);
      }

      if (data.gender) {
        formData.append('gender', data.gender);
      }

      if (data.isReady !== undefined) {
        formData.append('isReady', String(data.isReady));
      }

      if (data.fitnessLevel) {
        formData.append('fitnessLevel', data.fitnessLevel);
      }

      if (data.avatar && typeof userAvatar === 'string') {
        formData.append('avatar', data.avatar);
      }

      dispatch(updateUserAction(formData));
      setIsEdit((prevState) => !prevState);
    } else {
      setError(newError);
    }
  };
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (evt.target instanceof HTMLTextAreaElement) {
      return setData((prevState) => ({...prevState, description: evt.target.value}));
    }

    if (evt.target instanceof HTMLInputElement) {
      const {name, value, checked, files} = evt.target;
      setData((prevState) => {
        if (name === AttributeName.EXERCISES) {
          if (!data.exercises) {
            return {
              ...prevState,
              exercises: new Array(value as ExerciseType)
            };
          }

          if (checked && data.exercises?.length < MAX_EXERCISES_LENGTH) {
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

        if (files?.length) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUserAvatar(reader.result as string);
          };
          reader.readAsDataURL(files[0]);

          return {...prevState, avatar: files[0]};
        }

        return {...prevState, [name]: value};
      });
    }
  };
  const handleStationSelectClick = () => {
    setIsStationOpen((prevState) => !prevState);
  };
  const handleGenderSelectClick = () => {
    setIsGenderOpen((prevState) => !prevState);
  };
  const handleLevelSelectClick = () => {
    setIsLevelOpen((prevState) => !prevState);
  };
  const handleReadyClick = () => {
    setData((prevState) => ({...prevState, isReady: !prevState.isReady}));
  };
  const handleStationClick = (station: StationType) => {
    setData((prevState) => ({...prevState, station}));
    setIsStationOpen((prevState) => !prevState);
  };
  const handleGenderClick = (gender: GenderType) => {
    setData((prevState) => ({...prevState, gender}));
    setIsGenderOpen((prevState) => !prevState);
  };
  const handleLevelClick = (fitnessLevel: FitnessLevelType) => {
    setData((prevState) => ({...prevState, fitnessLevel}));
    setIsLevelOpen((prevState) => !prevState);
  };
  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
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
                    <input
                      className="visually-hidden"
                      ref={inputRef}
                      type="file"
                      name="avatar"
                      disabled={!isEdit}
                      accept="image/png, image/jpeg"
                      onChange={handleInputChange}
                    />
                    <span className={classNames({
                      'input-load-avatar__avatar': userAvatar,
                      'input-load-avatar__btn': !userAvatar,
                    })}
                    >
                      {
                        userAvatar ?
                          <img
                            src={typeof userAvatar === 'string' ? userAvatar : `${STATIC_BASE_PATH}/${userAvatar.image}`}
                            srcSet={typeof userAvatar === 'string' ? undefined : `${STATIC_BASE_PATH}/${userAvatar.image2x} 2x`}
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
                {
                  isEdit &&
                    <div className="user-info-edit__controls">
                      <button
                        className="user-info-edit__control-btn"
                        aria-label="обновить"
                        onClick={handleUploadClick}
                      >
                        <svg width="16" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-change"></use>
                        </svg>
                      </button>
                      <button
                        className="user-info-edit__control-btn"
                        aria-label="удалить"
                        onClick={handleUserAvatarDelete}
                      >
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-trash"></use>
                        </svg>
                      </button>
                    </div>
                }
              </div>
              <form className="user-info__form">
                <button
                  className="btn-flat btn-flat--underlined user-info__edit-button"
                  type={isEdit ? 'submit' : 'button'}
                  aria-label={isEdit ? 'Сохранить' : 'Редактировать'}
                  onClick={handleToggleEditClick}
                >
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-edit"></use>
                  </svg>
                  <span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
                </button>
                <div className="user-info__section">
                  <h2 className="user-info__title">Обо мне</h2>
                  <div className={classNames('custom-input', {
                    'custom-input--readonly': !isEdit,
                    'custom-input--error': error.name,
                  }, 'user-info__input')}
                  >
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
                      {error.name && <span className="custom-input__error">{error.name}</span>}
                    </label>
                  </div>
                  {(user.description || isEdit) &&
                    <div className={classNames('custom-textarea', {
                      'custom-textarea--readonly': !isEdit,
                      'custom-textarea--error': error.description
                    }, 'user-info__textarea')}
                    >
                      <label>
                        <span className="custom-textarea__label">Описание</span>
                        <textarea
                          name="description"
                          value={data.description}
                          disabled={!isEdit}
                          onChange={handleInputChange}
                        />
                        {error.description && <span className="custom-textarea__error">{error.description}</span>}
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
                        onChange={handleReadyClick}
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">{user.role === Role.Coach ? 'Готов тренировать' : 'Готов к тренировке'}</span>
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
                            name="exercises"
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
                  selectedValue={data.station}
                  errorMessage={error.station}
                  option={Station}
                  isOpen={isStationOpen}
                  isReadonly={!isEdit}
                  nameTransform={STATION_NAME}
                  className='user-info__select'
                  placeholder={`ст. м. ${STATION_NAME[user.station.station]}`}
                  onListBoxClick={handleStationSelectClick}
                  onListOptionClick={handleStationClick}
                />
                <CustomSelect
                  title='Пол'
                  selectedValue={data.gender}
                  errorMessage={error.gender}
                  option={Gender}
                  isOpen={isGenderOpen}
                  isReadonly={!isEdit}
                  nameTransform={GENDER_NAME}
                  className='user-info__select'
                  placeholder={GENDER_NAME[user.gender]}
                  onListBoxClick={handleGenderSelectClick}
                  onListOptionClick={handleGenderClick}
                />
                <CustomSelect
                  title='Уровень'
                  selectedValue={data.fitnessLevel}
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
              {user.role === Role.Coach ?
                <CoachPersonalAccount user={user}/> :
                <UserPersonalAccount user={user}/>}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
