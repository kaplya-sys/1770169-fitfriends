import {ChangeEvent, MouseEvent, useEffect, useMemo, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import classNames from 'classnames';

import {Layout} from '../../components/layout';
import {Feedbacks} from '../../components/feedbacks';
import {Video} from '../../components/video';
import {Picture} from '../../components/picture';
import {PopupBuy} from '../../components/popup-buy';
import {PopupFeedback} from '../../components/popup-feedback';
import {BackButton} from '../../components/back-button';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {
  getFeedbacksAction,
  getTrainingAction,
  getUserAction,
  getUserBalanceAction,
  selectAuthenticatedUser,
  selectFeedbacks,
  selectTraining,
  selectUser,
  selectUserBalance,
  updateTrainingAction,
  applyUserBalanceAction,
  selectTrainingError
} from '../../store';
import {ParamsType, Role, UpdateTrainingType} from '../../libs/shared/types';
import {getPriceWithDiscount, getPriceWithoutDiscount, isErrorObject, validateFields} from '../../libs/shared/helpers';
import {EXERCISE_NAMES, GENDER_SECOND_VARIANT_NAME, TRAINING_TIME_SECOND_NAMES} from '../../libs/shared/constants';

import './training-card-page.css';

export const TrainingCardPage = () => {
  const [isFeedbackShow, setIsFeedbackShow] = useState<boolean>(false);
  const [isBuyShow, setIsBuyShow] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isRemoved, setIsRemoved] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [data, setData] = useState<UpdateTrainingType>({
    title: '',
    description: '',
    price: 0,
    video: null,
  });
  const [error, setError] = useState<Partial<Record<keyof UpdateTrainingType, string>>>({});
  const {id} = useParams<ParamsType>();
  const training = useAppSelector(selectTraining);
  const feedbacks = useAppSelector(selectFeedbacks);
  const userBalance = useAppSelector(selectUserBalance);
  const authenticatedUser = useAppSelector(selectAuthenticatedUser);
  const coach = useAppSelector(selectUser);
  const trainingError = useAppSelector(selectTrainingError);
  const innerRef = useRef<HTMLSelectElement | null>(null);
  const dispatch = useAppDispatch();
  const isPurchased = useMemo(() => !!userBalance?.entities.find((entity) => entity.training.id === id), [id, userBalance?.entities]);
  const isActivePurchase = useMemo(() => {
    const purchasedTraining = userBalance?.entities.find((entity) => entity.training.id === id);

    return purchasedTraining ? purchasedTraining.amount > 0 : false;
  }, [id, userBalance?.entities]);

  useEffect(() => {
    dispatch(getTrainingAction({id}));
    dispatch(getFeedbacksAction({id}));
  }, [id, dispatch]);

  useEffect(() => {
    if (authenticatedUser) {
      dispatch(getUserBalanceAction({id: authenticatedUser.id}));
    }
  }, [authenticatedUser, dispatch]);

  useEffect(() => {
    if (training) {
      setData((prevState) => ({
        ...prevState,
        description: training.description,
        title: training.title,
        specialOffer: training.specialOffer,
        price: training.price
      }));
      dispatch(getUserAction({id: training.coachId}));
    }
  }, [training, dispatch]);

  useEffect(() => {
    if (innerRef.current) {
      if (isFeedbackShow || isBuyShow) {
        document.body.style.overflow = 'hidden';
        innerRef.current.inert = true;
      } else {
        document.body.removeAttribute('style');
        innerRef.current.inert = false;
      }
    }
  }, [isFeedbackShow, isBuyShow]);

  useEffect(() => {
    if (isErrorObject(trainingError) && trainingError.statusCode === 400) {
      for (const message of trainingError.message) {
        const field = message.split(' ')[0];
        setError((prevState) => ({...prevState, [field]: message}));
      }
    }
  }, [trainingError]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (evt.target instanceof HTMLTextAreaElement) {
      setData((prevState) => ({...prevState, description: evt.target.value}));
      setError((prevState) => ({...prevState, description: ''}));

      return;
    }

    if (evt.target instanceof HTMLInputElement) {
      const {name, value, files} = evt.target;
      setData((prevState) => {
        if (files?.length) {
          return {...prevState, video: files[0]};
        }

        return {...prevState, [name]: value};
      });
      setError((prevState) => ({...prevState, [name]: ''}));
    }
  };
  const handleRemoveClick = () => {
    setIsRemoved(true);
    setData((prevState) => ({...prevState, video: null}));
  };
  const handleToggleBuyShowClick = () => {
    setIsBuyShow((prevState) => !prevState);
  };
  const handleToggleFeedbackShowClick = () => {
    setIsFeedbackShow((prevState) => !prevState);
  };
  const handleTogglePlayClick = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const handleToggleStartClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if (evt.currentTarget.textContent === 'Закончить') {
      return setIsStarted((prevState) => !prevState);
    }

    if (training) {
      dispatch(applyUserBalanceAction({id: training.id}));
    }
    setIsStarted((prevState) => !prevState);
  };
  const handleDiscountClick = () => {
    if (training) {
      const formData = new FormData();
      formData.append('specialOffer', training.specialOffer ? 'false' : 'true');
      formData.append(
        'price',
        training.specialOffer ?
          getPriceWithoutDiscount(training.price).toString() :
          getPriceWithDiscount(training.price).toString());

      dispatch(updateTrainingAction(formData));
    }
    setIsEdit((prevState) => !prevState);
  };
  const handleSaveVideClick = () => {
    if (data.video) {
      const formData = new FormData();
      formData.append('video', data.video);

      dispatch(updateTrainingAction(formData));
      setData((prevState) => ({...prevState, video: null}));
      setIsRemoved(false);
    }
    setIsEdit((prevState) => !prevState);
  };
  const handleToggleEditClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if (evt.currentTarget.textContent === 'Редактировать') {
      setIsEdit((prevState) => !prevState);

      return;
    }
    const formData = new FormData();
    const newError = validateFields(data);

    if (!newError) {
      if (data.description) {
        formData.append('description', data.description);
      }

      if (data.price) {
        formData.append('price', data.price.toString());
      }

      if (data.title) {
        formData.append('title', data.title);
      }
      dispatch(updateTrainingAction(formData));
      setIsEdit((prevState) => !prevState);
    } else {
      setError(newError);
    }
  };

  if (!training || !authenticatedUser) {
    return null;
  }

  return (
    <>
      <Layout>
        <section className="inner-page" ref={innerRef}>
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <BackButton className='btn-flat--underlined reviews-side-bar__back'/>
                <Feedbacks
                  feedbacks={feedbacks}
                  userRole={authenticatedUser.role}
                  isPurchased={isPurchased}
                  onFeedbackClick={handleToggleFeedbackShowClick}
                />
              </aside>
              <div className={classNames('training-card', {'training-card--edit': isEdit})}>
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <Picture
                          width={64}
                          height={64}
                          alt='Изображение тренера'
                          image={coach?.avatar}
                        />
                      </div>
                      <div className="training-info__coach-info">
                        <span className="training-info__label">Тренер</span>
                        <span className="training-info__name">{training.coachName}</span>
                      </div>
                    </div>
                    {
                      authenticatedUser.role === Role.Coach &&
                        <button
                          className={classNames('btn-flat btn-flat--light training-info__edit', {
                            'btn-flat--underlined': isEdit,
                            'training-info__edit--edit': !isEdit,
                            'training-info__edit--save': isEdit
                          })}
                          type="button"
                          onClick={handleToggleEditClick}
                        >
                          <svg width="12" height="12" aria-hidden="true">
                            <use xlinkHref="#icon-edit"></use>
                          </svg>
                          <span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
                        </button>
                    }
                  </div>
                  <div className="training-info__main-content">
                    <form>
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className={classNames('training-info__input', 'training-info__input--training', {'is-invalid': error.title})}>
                            <label>
                              <span className="training-info__label">Название тренировки</span>
                              <input
                                type="text"
                                name="title"
                                value={data.title}
                                disabled={!isEdit}
                                onChange={handleInputChange}
                              />
                            </label>
                            <span className="training-info__error">{error.title}</span>
                          </div>
                          <div className={classNames('training-info__textarea', {'is-invalid': error.description})}>
                            <label>
                              <span className="training-info__label">Описание тренировки</span>
                              <textarea
                                name="description"
                                value={data.description}
                                disabled={!isEdit}
                                onChange={handleInputChange}
                              >
                              </textarea>
                            </label>
                            <span className="training-info__error">{error.description}</span>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label>
                              <span className="training-info__label">Рейтинг</span>
                              <span className="training-info__rating-icon">
                                <svg width="18" height="18" aria-hidden="true">
                                  <use xlinkHref="#icon-star"></use>
                                </svg>
                              </span>
                              <input type="number" name="rating" value={training.rating} disabled/>
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>{`#${EXERCISE_NAMES[training.type].toLocaleLowerCase()}`}</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>{`#${GENDER_SECOND_VARIANT_NAME[training.gender]}`}</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>{`#${training.calories}ккал`}</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>{`#${TRAINING_TIME_SECOND_NAMES[training.trainingTime]}минут`}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className={classNames('training-info__input training-info__input--price', {'is-invalid': error.price})}>
                            <label>
                              <span className="training-info__label">Стоимость</span>
                              <input
                                type="text"
                                name="price"
                                value={data.price}
                                disabled={!isEdit}
                                onChange={handleInputChange}
                              />
                            </label>
                            <div className="training-info__error">{error.price}</div>
                          </div>
                          {
                            authenticatedUser.role === Role.Coach ?
                              <button
                                className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                                type="button"
                                onClick={handleDiscountClick}
                              >
                                <svg width="14" height="14" aria-hidden="true">
                                  <use xlinkHref="#icon-discount"></use>
                                </svg>
                                <span>{data.specialOffer ? 'Отменить скидку' : 'Сделать скидку 10%'}</span>
                              </button> :
                              <button
                                className="btn training-info__buy"
                                type="button"
                                disabled={isActivePurchase || isStarted}
                                onClick={handleToggleBuyShowClick}
                              >
                                Купить
                              </button>
                          }
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className={classNames('training-video', {
                  'training-video--stop': isStarted,
                  'training-video--load': isRemoved
                })}
                >
                  <h2 className="training-video__title">Видео</h2>
                  <Video
                    training={training}
                    isPlaying={isPlaying}
                    isVideoDisabled={!isStarted && authenticatedUser.role === Role.User}
                    onPlayClick={handleTogglePlayClick}
                  />
                  <div className="training-video__drop-files">
                    <form>
                      <div className="training-video__form-wrapper">
                        <div className="drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>
                              Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input
                              type="file"
                              name="video"
                              tabIndex={-1} accept=".mov, .avi, .mp4"
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    <button
                      className={classNames('btn training-video__button', {
                        'training-video__button--stop': isStarted,
                        'training-video__button--start': !isStarted
                      })}
                      onClick={handleToggleStartClick}
                      disabled={!isActivePurchase && !isStarted}
                      type="button"
                    >
                      {isStarted ? 'Закончить' : 'Приступить'}
                    </button>
                    <div className="training-video__edit-buttons">
                      <button
                        className="btn"
                        type="button"
                        disabled={!data.video && isRemoved}
                        onClick={handleSaveVideClick}
                      >
                        Сохранить
                      </button>
                      <button
                        className="btn btn--outlined"
                        type="button"
                        onClick={handleRemoveClick}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <PopupBuy
        product={training}
        isActive= {isBuyShow}
        onCloseClick={handleToggleBuyShowClick}
      />
      <PopupFeedback
        isActive={isFeedbackShow}
        onCloseClick={handleToggleFeedbackShowClick}
      />
    </>
  );
};
