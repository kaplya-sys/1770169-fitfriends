import {Link} from 'react-router-dom';

import {AppRoute, TrainingType} from '../../libs/shared/types';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {Picture} from '../picture';

type TrainingCardPropsType = {
  training: TrainingType;
  className: string;
  orderInfo?: {
    count: number;
    amount: number;
  };
}

export const TrainingCard = ({training, className, orderInfo}: TrainingCardPropsType) => (
  <li className={className}>
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <Picture
            width={330}
            height={190}
            alt={training.title}
            image={training.background}
          />
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">
            {training.price === 0 ? 'Бесплатно' : training.price}
          </span>
          <span>₽</span>
        </p>
        <h3 className="thumbnail-training__title">{training.title}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>{`#${training.type}`}</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>{`#${training.calories}ккал`}</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span className="thumbnail-training__rate-value">{training.rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{training.description}</p>
        </div>
        {orderInfo ?
          <Link
            className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
            to={getRouteWithParam(AppRoute.Training, {id: training.id})}
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-info"></use>
            </svg>
            <span>Подробнее</span>
          </Link> :
          <div className="thumbnail-training__button-wrapper">
            <Link
              className="btn btn--small thumbnail-training__button-catalog"
              to={getRouteWithParam(AppRoute.Training, {id: training.id})}
            >
              Подробнее
            </Link>
            <Link
              className="btn btn--small btn--outlined thumbnail-training__button-catalog"
              to={getRouteWithParam(AppRoute.Feedbacks, {id: training.id})}
            >
              Отзывы
            </Link>
          </div>}
      </div>
      {orderInfo &&
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true">
              <use xlinkHref="#icon-chart"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">1</p>
            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true">
              <use xlinkHref="#icon-wallet"></use>
            </svg>
            <p className="thumbnail-training__total-info-value">800<span>₽</span></p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>}
    </div>
  </li>
);
