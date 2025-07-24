import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/layout';
import { Reviews } from '../../components/reviews';
import { Video } from '../../components/video';
import { PopupBuy } from '../../components/popup-buy';
import { BackButton } from '../../components/back-button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getTrainingAction, selectTraining } from '../../store';
import { Picture } from '../../ui/picture';
import { Params } from '../../lib/shared/types';
import classNames from 'classnames';

export const TrainingCardPage = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const param = useParams<Params>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTrainingAction({ trainingId: param.id }));
  }, [param, dispatch]);

  const training = useAppSelector(selectTraining);

  if (!training) {
    return;
  }

  const handleToggleClick = () => {
    setIsActive(!isActive);
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
                <Reviews />
              </aside>
              <div className="training-card">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <div className="training-info__photo">
                        <Picture
                          width={ 64 }
                          height={ 64 }
                          alt='Изображение тренера'
                          image={ training.image }
                        />
                      </div>
                      <div className="training-info__coach-info">
                        <span className="training-info__label">Тренер</span>
                        <span className="training-info__name">{ training.coach.name }</span>
                      </div>
                    </div>
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label>
                              <span className="training-info__label">Название тренировки</span>
                              <input type="text" name="training" value={ training.name } disabled />
                            </label>
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
                            <label>
                              <span className="training-info__label">Описание тренировки</span>
                              <textarea name="description" disabled>{ training.description }</textarea>
                            </label>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className={ classNames('training-info__input', 'training-info__input--rating', { 'is-invalid': errorMessage }) }>
                            { errorMessage && <span className="training-info__error">{ errorMessage }</span> }
                            <label>
                              <span className="training-info__label">Рейтинг</span>
                              <span className="training-info__rating-icon">
                                <svg width="18" height="18" aria-hidden="true">
                                  <use xlinkHref="#icon-star"></use>
                                </svg>
                              </span>
                              <input type="number" name="rating" value={ training.rating } disabled />
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
                            onClick={ handleToggleClick }
                          >
                            Купить
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <Video />
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <PopupBuy
        product={ training }
        isActive= { isActive }
        onToggleClick={ handleToggleClick }
      />
    </>
  );
};
