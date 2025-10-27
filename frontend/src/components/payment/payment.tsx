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
      <li className="payment-method__item">
        <div className="btn-radio-image">
          <label>
            <input
              type="radio"
              name="payment"
              aria-label="Visa."
              value={PaymentMethod.Visa}
              onChange={onInputChange}
              checked={PaymentMethod.Visa === selectedValue}
            />
            <span className="btn-radio-image__image">
              <svg width="58" height="20" aria-hidden="true">
                <use xlinkHref="#visa-logo"></use>
              </svg>
            </span>
          </label>
        </div>
      </li>
      <li className="payment-method__item">
        <div className="btn-radio-image">
          <label>
            <input
              type="radio"
              name="payment"
              aria-label="Мир."
              value={PaymentMethod.Mir}
              onChange={onInputChange}
              checked={PaymentMethod.Mir === selectedValue}
            />
            <span className="btn-radio-image__image">
              <svg width="66" height="20" aria-hidden="true">
                <use xlinkHref="#mir-logo"></use>
              </svg>
            </span>
          </label>
        </div>
      </li>
      <li className="payment-method__item">
        <div className="btn-radio-image">
          <label>
            <input
              type="radio"
              name="payment"
              aria-label="Iomoney."
              value={PaymentMethod.Umoney}
              onChange={onInputChange}
              checked={PaymentMethod.Umoney === selectedValue}
            />
            <span className="btn-radio-image__image">
              <svg width="106" height="24" aria-hidden="true">
                <use xlinkHref="#iomoney-logo"></use>
              </svg>
            </span>
          </label>
        </div>
      </li>
    </ul>
  </section>
);
