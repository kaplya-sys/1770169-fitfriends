import {Link} from 'react-router-dom';

import {AppRoute, TrainingType} from '../../libs/shared/types';
import {getRouteWithParam} from '../../libs/shared/helpers';
import {Picture} from '../picture';

type TrainingCardPropsType = {
  training: TrainingType;
  className: string;
}

export const TrainingCard = ({training, className}: TrainingCardPropsType) => (
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
                <span>{`#${ training.type }`}</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>{`#${ training.calories}ккал`}</span>
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
        </div>
      </div>
    </div>
  </li>
);
