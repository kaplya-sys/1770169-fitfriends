import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import classNames from 'classnames';

import {ParamsType, Role} from '../../libs/shared/types';
import {EXERCISE_NAMES, STATIC_BASE_PATH} from '../../libs/shared/constants';
import {BackButton} from '../../components/back-button';
import {TrainingList} from '../../components/training-list';
import {PopupUserMap} from '../../components/popup-user-map';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useSlider} from '../../hooks';
import {
  addFriendAction,
  deleteFriendAction,
  getFriendsByUserAction,
  getTrainingsAction,
  getUserAction,
  selectAuthenticatedUser,
  selectFriends,
  selectTrainings,
  selectUser,
  selectUserBackgrounds
} from '../../store';
import './user-info-page.css';

export const UserInfoPage = () => {
  const [isUseMapShow, setIsUseMapShow] = useState<boolean>(false);
  const [isSubscribe, setIsSubscribe] = useState<boolean>(false);
  const {id} = useParams<ParamsType>();
  const user = useAppSelector(selectUser);
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const friends = useAppSelector(selectFriends);
  const backgrounds = useAppSelector(selectUserBackgrounds);
  const trainings = useAppSelector(selectTrainings);
  const dispatch = useAppDispatch();
  const {sliderRef, buttonNextRef, buttonPrevRef} = useSlider(!!trainings?.entities.length);
  const friend = useMemo(() => friends?.entities.find((entity) => entity.friend.id === id), [friends, id]);

  useEffect(() => {
    dispatch(getUserAction({id}));
    dispatch(getFriendsByUserAction({}));

    if (user?.role === Role.Coach) {
      dispatch(getTrainingsAction({query: {coach: id}}));
    }
  }, [id, dispatch]);

  const handleAddOrDeleteFriendClick = () => {
    if (friend) {
      dispatch(deleteFriendAction({id: friend.id}));
    } else {
      dispatch(addFriendAction({id}));
    }
  };
  const handleUserMapClick = () => {
    setIsUseMapShow((prevState) => !prevState);
  };
  const handleSubscribeChange = () => {
    setIsSubscribe((prevState) => !prevState);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <BackButton className='btn-flat inner-page__back'/>
            <div className="inner-page__content">
              {
                user.role === Role.User ?
                  <section className="user-card">
                    <h1 className="visually-hidden">Карточка пользователя</h1>
                    <div className="user-card__wrapper">
                      <div className="user-card__content">
                        <div className="user-card__head">
                          <h2 className="user-card__title">{user.name}</h2>
                        </div>
                        <div className="user-card__label">
                          <a href='#' onClick={handleUserMapClick}>
                            <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                              <use xlinkHref="#icon-location"></use>
                            </svg>
                            <span>{user.location}</span>
                          </a>
                        </div>
                        <div className={classNames('user-card__status', {'user-card__status--noReady': !user.isReady})}>
                          <span>{user.isReady ? 'Готов к тренировке' : 'Не готов к тренировке'}</span>
                        </div>
                        <div className="user-card__text">{user.description}</div>
                        <ul className="user-card__hashtag-list">
                          {user.questionnaire.exercises.map((exercise) => (
                            <li className="user-card__hashtag-item" key={exercise}>
                              <div className="hashtag">
                                <span>{`#${EXERCISE_NAMES[exercise]}`}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {
                          user.id !== authenticatedUser?.id &&
                            <button
                              className={classNames('btn user-card__btn', {'btn--outlined': friend})}
                              type="button"
                              onClick={handleAddOrDeleteFriendClick}
                            >
                              {friend ? 'Удалить из друзей' : 'Добавить в друзья'}
                            </button>
                        }
                      </div>
                      <div className="user-card__gallary">
                        <ul className="user-card__gallary-list">
                          {backgrounds.map((background) => (
                            <li className="user-card__gallary-item" key={background.id}>
                              <img
                                src={`${STATIC_BASE_PATH}/${background.image}`}
                                srcSet={`${STATIC_BASE_PATH}/${background.image2x} 2x`}
                                width="334"
                                height="573"
                                alt=""
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section> :
                  <section className="user-card-coach">
                    <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
                    <div className="user-card-coach__wrapper">
                      <div className="user-card-coach__card">
                        <div className="user-card-coach__content">
                          <div className="user-card-coach__head">
                            <h2 className="user-card-coach__title">{user.name}</h2>
                          </div>
                          <div className="user-card-coach__label">
                            <a href='#' onClick={handleUserMapClick}>
                              <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                                <use xlinkHref="#icon-location"></use>
                              </svg>
                              <span>{user.location}</span>
                            </a>
                          </div>
                          <div className="user-card-coach__status-container">
                            <div className="user-card-coach__status user-card-coach__status--tag">
                              <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg>
                              <span>Тренер</span>
                            </div>
                            <div className={classNames('user-card-coach__status user-card-coach__status--check', {'user-card-coach__status--noReady': !user.isReady})}>
                              <span>{user.isReady ? 'Готов тренировать' : 'Не готов тренировать'}</span>
                            </div>
                          </div>
                          <div className="user-card-coach__text">{user.description}</div>
                          <button className="btn-flat user-card-coach__sertificate" type="button">
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-teacher"></use>
                            </svg>
                            <span>Посмотреть сертификаты</span>
                          </button>
                          <ul className="user-card-coach__hashtag-list">
                            {user.questionnaire.exercises.map((exercise) => (
                              <li className="user-card-coach__hashtag-item" key={exercise}>
                                <div className="hashtag">
                                  <span>{`#${EXERCISE_NAMES[exercise]}`}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                          {
                            user.id !== authenticatedUser?.id &&
                              <button
                                className={classNames('btn user-card-coach__btn', {'btn--outlined': friend})}
                                type="button"
                                onClick={handleAddOrDeleteFriendClick}
                              >
                                {friend ? 'Удалить из друзей' : 'Добавить в друзья'}
                              </button>
                          }
                        </div>
                        <div className="user-card-coach__gallary">
                          <ul className="user-card-coach__gallary-list">
                            {backgrounds.map((background) => (
                              <li className="user-card-coach__gallary-item" key={background.id}>
                                <img
                                  src={`${STATIC_BASE_PATH}/${background.image}`}
                                  srcSet={`${STATIC_BASE_PATH}/${background.image2x} 2x`}
                                  width="334"
                                  height="573"
                                  alt=""
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="user-card-coach__training" ref={sliderRef}>
                        <div className="user-card-coach__training-head">
                          <h2 className="user-card-coach__training-title">Тренировки</h2>
                          <div className="user-card-coach__training-bts">
                            <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back" ref={buttonPrevRef}>
                              <svg width="14" height="10" aria-hidden="true">
                                <use xlinkHref="#arrow-left"></use>
                              </svg>
                            </button>
                            <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next" ref={buttonNextRef}>
                              <svg width="14" height="10" aria-hidden="true">
                                <use xlinkHref="#arrow-right"></use>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <TrainingList className='user-card-coach__training' trainings={trainings?.entities || []} isWithSlider/>
                        <form className="user-card-coach__training-form">
                          <button className="btn user-card-coach__btn-training" type="button">Хочу персональную тренировку</button>
                          <div className="user-card-coach__training-check">
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  value="user-agreement-1"
                                  name="user-agreement"
                                  checked={isSubscribe}
                                  onChange={handleSubscribeChange}
                                />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                              </label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
              }
            </div>
          </div>
        </div>
      </div>
      <PopupUserMap
        user={user}
        isActive={isUseMapShow}
        onCloseClick={handleUserMapClick}
      />
    </>
  );
};
