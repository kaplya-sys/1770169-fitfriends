import { useState } from 'react';
import classNames from 'classnames';

import { PromoSliderProps } from './promo-slider-props.type';

export const PromoSlider = ({ blockClassName, promotions }: PromoSliderProps) => {
  const [activeId, setActiveId] = useState<string>(promotions[0].id);

  return (
    <>
      <h2 className="visually-hidden">Специальные предложения</h2>
      <ul className={ `${ blockClassName }__list` }>
        {
          promotions.map((promotion) => (
            <li
              className={
                classNames(`${ blockClassName }__item`,
                  { 'is-active': activeId === promotion.id })
              }
              key={ promotion.id }
            >
              <aside className="promo-slider">
                <div className="promo-slider__overlay"></div>
                <div className="promo-slider__image">
                  <img
                    src={ promotion.image }
                    srcSet={ `${ promotion.image2x } 2x` }
                    width="1040"
                    height="469"
                    alt="promo-photo"
                  />
                </div>
                <div className="promo-slider__header">
                  <h3 className="promo-slider__title">{ promotion.title }</h3>
                  <div className="promo-slider__logo">
                    <svg width="74" height="74" aria-hidden="true">
                      <use xlinkHref="#logotype"></use>
                    </svg>
                  </div>
                </div>
                <span className="promo-slider__text">{ promotion.promoText }</span>
                <div className="promo-slider__bottom-container">
                  <div className="promo-slider__slider-dots">
                    {
                      promotions.map((item) => (
                        <button
                          className={
                            classNames('promo-slider__slider-dot',
                              { 'promo-slider__slider-dot--active': item.id === promotion.id }
                            )
                          }
                          aria-label={ item.dotLabel }
                          key={ item.id }
                          onClick={() => setActiveId(item.id)}
                        >
                        </button>
                      ))
                    }
                  </div>
                  <div className="promo-slider__price-container">
                    <p className="promo-slider__price">{ `${ promotion.newPrice } ₽` }</p>
                    <p className="promo-slider__sup">за занятие</p>
                    <p className="promo-slider__old-price">{ `${ promotion.oldPrice } ₽` }</p>
                  </div>
                </div>
              </aside>
            </li>
          ))
        }
      </ul>
    </>
  );
};
