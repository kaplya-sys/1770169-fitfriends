import {ChangeEvent, useState} from 'react';
import classNames from 'classnames';

import {Payment} from '../payment';
import {Picture} from '../picture';
import {Quantity} from '../quantity';
import {useAppDispatch} from '../../hooks';
import {CreateOrderType, TrainingType} from '../../libs/shared/types';
import {createOrderAction} from '../../store';

type PopupBuyPropsType = {
  product: TrainingType;
  isActive: boolean;
  onCloseClick: () => void;
}

export const PopupBuy = ({product, isActive,onCloseClick}: PopupBuyPropsType) => {
  const [data, setData] = useState<CreateOrderType>({
    exercise: product.type,
    price: product.price,
    count: 0,
    amount: 0,
    payment: null
  });
  const dispatch = useAppDispatch();

  const handleIncrementClick = () => {
    setData((prevState) => ({...prevState, count: prevState.count + 1}));
  };
  const handleDecrementClick = () => {
    if (data.count >= 0) {
      setData((prevState) => ({...prevState, count: prevState.count - 1}));
    }
  };
  const handlePaymentChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({...prevState, payment: evt.target.value}));
  };
  const handleBuyClick = () => {
    dispatch(createOrderAction({...data, amount: data.count * data.price}));
    setData((prevState) => ({...prevState, count: 0, amount: 0, payment: null}));
    onCloseClick();
  };

  return (
    <div className={classNames('wrapper modal modal--buy', {'is-active': isActive})}>
      <main>
        <div className="popup-form popup-form--buy">
          <section className="popup">
            <div className="popup__wrapper">
              <div className="popup-head">
                <h2 className="popup-head__header">Купить тренировку</h2>
                <button
                  className="btn-icon btn-icon--outlined btn-icon--big"
                  type="button"
                  aria-label="close"
                  onClick={onCloseClick}
                >
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-cross"></use>
                  </svg>
                </button>
              </div>
              <div className="popup__content popup__content--purchases">
                <div className="popup__product">
                  <div className="popup__product-image">
                    <Picture
                      width={98}
                      height={80}
                      image={product.background}
                      alt=''
                    />
                  </div>
                  <div className="popup__product-info">
                    <h3 className="popup__product-title">{product.title}</h3>
                    <p className="popup__product-price">{`${product.price} ₽`}</p>
                  </div>
                  <div className="popup__product-quantity">
                    <p className="popup__quantity">Количество</p>
                    <Quantity
                      selectedValue={data.count}
                      onIncrementClick={handleIncrementClick}
                      onDecrementClick={handleDecrementClick}
                    />
                  </div>
                </div>
                <Payment
                  selectedValue={data.payment || ''}
                  onInputChange={handlePaymentChange}
                />
                <div className="popup__total">
                  <p className="popup__total-text">Итого</p>
                  <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                    <use xlinkHref="#dash-line"></use>
                  </svg>
                  <p className="popup__total-price">4&nbsp;000&nbsp;₽</p>
                </div>
                <div className="popup__button">
                  <button className="btn" type="button" onClick={handleBuyClick}>Купить</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
