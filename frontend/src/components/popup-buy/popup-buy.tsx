import { ChangeEvent, useState } from 'react';

import { PaymentMethod } from '@fitfriends/lib/shared/types';

import { Payment } from '../payment';
import { Popup } from '../popup';
import { PopupBuyPropsType } from './popup-buy-props.type';
import { Quantity } from '../quantity';
import { Picture } from '../../ui/picture';
import { useAppDispatch } from '../../hooks';
import { createOrderAction } from '../../store';

export const PopupBuy = ({ product, isActive, onToggleClick }: PopupBuyPropsType) => {
  const [payment, setPayment] = useState<PaymentMethod | string>('');
  const [quantity, setQuantity] = useState<number>(0);

  const dispatch = useAppDispatch();

  const handleIncrementClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrementClick = () => {
    if (quantity >= 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleBuyClick = () => {
    dispatch(createOrderAction({
      type: product.type,
      coachId: '',
      consumerId: '',
      trainingId: '',
      count: quantity,
      price: product.price,
      sum: product.price * quantity,
      payment: payment as PaymentMethod
    }));
    onToggleClick();
  };

  const handlePaymentChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPayment(evt.target.value);
  };

  return (
    <Popup
      isActive={ isActive }
      blockClassName='buy'
      title='Купить тренировку'
      onCloseClick={ onToggleClick }
    >
      <div className="popup__product">
        <div className="popup__product-image">
          <Picture
            image={ product.image }
            width={ 98 }
            height={ 80 }
            alt=''
          />
        </div>
        <div className="popup__product-info">
          <h3 className="popup__product-title">{ product.name }</h3>
          <p className="popup__product-price">{ `${ product.price } ₽` }</p>
        </div>
        <div className="popup__product-quantity">
          <p className="popup__quantity">Количество</p>
          <Quantity
            selectedValue={ quantity }
            onIncrementClick={ handleIncrementClick }
            onDecrementClick={ handleDecrementClick }
          />
        </div>
      </div>
      <Payment
        selectedValue={ payment }
        onInputChange={ handlePaymentChange }
      />
      <div className="popup__total">
        <p className="popup__total-text">Итого</p>
        <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
          <use xlinkHref="#dash-line"></use>
        </svg>
        <p className="popup__total-price">4&nbsp;000&nbsp;₽</p>
      </div>
      <div className="popup__button">
        <button
          className="btn"
          type="button"
          onClick={ handleBuyClick }
        >
          Купить
        </button>
      </div>
    </Popup>
  );
};
