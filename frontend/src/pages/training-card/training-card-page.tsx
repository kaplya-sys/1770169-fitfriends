import {FormEvent, useEffect, useState} from 'react';
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
  selectFeedbacks,
  selectTraining,
  updateTrainingAction
} from '../../store';
import {ParamsType, UpdateTrainingType} from '../../libs/shared/types';
import {validateFields} from '../../libs/shared/helpers';

export const TrainingCardPage = () => {
  const [isFeedbackShow, setIsFeedbackShow] = useState<boolean>(false);
  const [isBuyShow, setIsBuyShow] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [data, setData] = useState<UpdateTrainingType>({});
  const [error, setError] = useState<Partial<Record<keyof UpdateTrainingType, string>>>({});
  const {id} = useParams<ParamsType>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTrainingAction({id}));
    dispatch(getFeedbacksAction({id}));
  }, [id, dispatch]);
  const training = useAppSelector(selectTraining);
  const feedbacks = useAppSelector(selectFeedbacks);

  if (!training) {
    return null;
  }
  const handleBuyClick = () => {
    setIsBuyShow(!isBuyShow);
  };
  const handleFeedbackClick = () => {
    setIsFeedbackShow(!isFeedbackShow);
  };
  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newError = validateFields(data);

    if (!newError) {
      dispatch(updateTrainingAction(data));
      setData((prevState) => ({...prevState, title: '', description: '', price: ''}));
      setError((prevState) => ({...prevState, title: '', description: '', price: ''}));
    } else {
      setError(newError);
    }
  };

  return (
    <>
      <Layout>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <BackButton blockClassName='reviews-side-bar__back' />
                <Feedbacks feedbacks={feedbacks} onFeedbackClick={handleFeedbackClick}/>
              </aside>
              <div className="training-card">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <Picture
                          width={64}
                          height={64}
                          alt='Изображение тренера'
                          image={training.background}
                        />
                      </div>
                      <div className="training-info__coach-info">
                        <span className="training-info__label">Тренер</span>
                        <span className="training-info__name">{training.coachName}</span>
                      </div>
                    </div>
                  </div>
                  <div className="training-info__main-content">
                    <form onSubmit={handleFormSubmit}>
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label>
                              <span className="training-info__label">Название тренировки</span>
                              <input type="text" name="training" value={training.title} disabled />
                            </label>
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
                            <label>
                              <span className="training-info__label">Описание тренировки</span>
                              <textarea name="description" value={training.description} disabled></textarea>
                            </label>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className={classNames('training-info__input', 'training-info__input--rating', {'is-invalid': error})}>
                            {error && <span className="training-info__error">{error.title}</span>}
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
                                <span>#пилатес</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>#для_всех</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>#320ккал</span>
                              </div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white">
                                <span>#30_50минут</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label>
                              <span className="training-info__label">Стоимость</span>
                              <input type="text" name="price" value="800 ₽" disabled />
                            </label>
                            <div className="training-info__error">Введите число</div>
                          </div>
                          <button
                            className="btn training-info__buy"
                            type="button"
                            onClick={handleBuyClick}
                          >
                            Купить
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <Video
                  training={training}
                  isPlaying={isPlaying}
                  onPlayClick={handlePlayClick}
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <PopupBuy
        product={training}
        isActive= {isBuyShow}
        onCloseClick={handleBuyClick}
      />
      <PopupFeedback
        isActive={isFeedbackShow}
        onCloseClick={handleFeedbackClick}
      />
    </>
  );
};
