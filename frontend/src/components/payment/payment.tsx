import {ChangeEvent} from 'react';

import {PaymentMethod, PaymentMethodType} from '../../libs/shared/types';

type PaymentPropsType = {
  selectedValue: PaymentMethodType;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export const Payment = ({selectedValue, onInputChange}: PaymentPropsType) => (
  <section className="payment-method">
    <h4 className="payment-method__title">Выберите способ оплаты</h4>
    <ul className="payment-method__list">
      {
        Object.values(PaymentMethod).map((paymentMethod) => (
          <li className="payment-method__item" key={paymentMethod}>
            <div className="btn-radio-image">
              <label>
                <input
                  type="radio"
                  name="payment"
                  aria-label={paymentMethod}
                  value={paymentMethod}
                  onChange={onInputChange}
                  checked={paymentMethod === selectedValue}
                />
                <span className="btn-radio-image__image">
                  <svg width="58" height="20" aria-hidden="true">
                    <use xlinkHref={`#${paymentMethod}-logo`}></use>
                  </svg>
                </span>
              </label>
            </div>
          </li>
        ))
      }
    </ul>
  </section>
);
