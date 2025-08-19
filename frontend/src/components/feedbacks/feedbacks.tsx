import {FeedbackType} from '../../libs/shared/types';
import {Picture} from '../picture';

type FeedbacksProps = {
  feedbacks: FeedbackType[];
  onFeedbackClick: () => void;
}

export const Feedbacks = ({feedbacks, onFeedbackClick}: FeedbacksProps) => (
  <>
    <h2 className="reviews-side-bar__title">Отзывы</h2>
    <ul className="reviews-side-bar__list">
      {
        feedbacks.map((feedback) => (
          <li className="reviews-side-bar__item" key={feedback.id}>
            <div className="review">
              <div className="review__user-info">
                <div className="review__user-photo">
                  <Picture
                    width={64}
                    height={64}
                    alt={'Изображение пользователя'}
                    image={feedback.author.avatar}
                  />
                </div>
                <span className="review__user-name">{feedback.author.name}</span>
                <div className="review__rating">
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                  <span>{feedback.assessment}</span>
                </div>
              </div>
              <p className="review__comment">{feedback.content}</p>
            </div>
          </li>
        ))
      }
    </ul>
    <button
      className="btn btn--medium reviews-side-bar__button"
      type="button"
      onClick={onFeedbackClick}
    >
      Оставить отзыв
    </button>
  </>
);
