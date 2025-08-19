import {useState} from 'react';
import classNames from 'classnames';

import {PromoTraining} from '../../libs/shared/types';
import {STATIC_BASE_PATH} from '../../libs/shared/constants';

type SpecialOffersProps = {
  specialOffers: PromoTraining[];
}

export const SpecialOffers = ({specialOffers}: SpecialOffersProps) => {
  const [activeId, setActiveId] = useState<string>(specialOffers[0].id || '');

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            {specialOffers.map((specialOffer) => (
              <li
                className={classNames('special-offers__item',
                  {'is-active': activeId === specialOffer.id})}
                key={specialOffer.id}
              >
                <aside className="promo-slider">
                  <div className="promo-slider__overlay"></div>
                  <div className="promo-slider__image">
                    <img
                      src={`${STATIC_BASE_PATH}/${specialOffer.background.image}`}
                      srcSet={`${STATIC_BASE_PATH}/${specialOffer.background.image2x} 2x`}
                      width="1040"
                      height="469"
                      alt={specialOffer.title}
                    />
                  </div>
                  <div className="promo-slider__header">
                    <h3 className="promo-slider__title">{specialOffer.title}</h3>
                    <div className="promo-slider__logo">
                      <svg width="74" height="74" aria-hidden="true">
                        <use xlinkHref="#logotype"></use>
                      </svg>
                    </div>
                  </div>
                  <span className="promo-slider__text">{specialOffer.promoText}</span>
                  <div className="promo-slider__bottom-container">
                    <div className="promo-slider__slider-dots">
                      {specialOffers.map((item, index) => (
                        <button
                          className={
                            classNames('promo-slider__slider-dot',
                              {'promo-slider__slider-dot--active': item.id === specialOffer.id}
                            )
                          }
                          aria-label={`${index + 1} слайд`}
                          key={item.id}
                          onClick={() => setActiveId(item.id)}
                        >
                        </button>
                      ))}
                    </div>
                    <div className="promo-slider__price-container">
                      <p className="promo-slider__price">{`${specialOffer.newPrice} ₽`}</p>
                      <p className="promo-slider__sup">за занятие</p>
                      <p className="promo-slider__old-price">{`${specialOffer.price} ₽`}</p>
                    </div>
                  </div>
                </aside>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
