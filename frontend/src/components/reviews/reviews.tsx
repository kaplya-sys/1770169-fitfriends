export const Reviews = () => {
  const reviews = [
    {
      id: '1',
      feedback: 'Эта тренировка для меня зарядка по&nbsp;утрам, помогает проснуться.',
      rating: 5,
      user: {
        name: 'Никита',
        avatar: 'img/content/avatars/users//photo-1.png'
      },
      trainingId: {

      }
    }
  ];
  return (
    <>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {
          reviews.map((review) => (
            <li className="reviews-side-bar__item" key={ review.id }>
              <div className="review">
                <div className="review__user-info">
                  <div className="review__user-photo">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet="img/content/avatars/users//photo-1.webp, img/content/avatars/users//photo-1@2x.webp 2x"
                      />
                      <img
                        src={ review.user.avatar }
                        srcSet="img/content/avatars/users//photo-1@2x.png 2x"
                        width="64"
                        height="64"
                        alt="Изображение пользователя"
                      />
                    </picture>
                  </div>
                  <span className="review__user-name">{ review.user.name }</span>
                  <div className="review__rating">
                    <svg width="16" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                    <span>{ review.rating }</span>
                  </div>
                </div>
                <p className="review__comment">{ review.feedback }</p>
              </div>
            </li>
          ))
        }
      </ul>
      <button
        className="btn btn--medium reviews-side-bar__button"
        type="button"
      >
        Оставить отзыв
      </button>
    </>
  );
};
