import { PaymentMethod } from '@fitfriends/lib/shared/types';

import { PaymentPropsType } from './payment-props.type';
import { PAYMENT_OPTIONS } from './payment-props.constant';

export const Payment = ({ selectedValue, onInputChange }: PaymentPropsType) => (
  <section className="payment-method">
    <h4 className="payment-method__title">Выберите способ оплаты</h4>
    <ul className="payment-method__list">
      {
        PAYMENT_OPTIONS.map((option) => (
          <li className="payment-method__item" key={ option.id }>
            <div className="btn-radio-image">
              <label>
                <input
                  type="radio"
                  name={ option.name }
                  aria-label={ option.label }
                  value={ option.value }
                  onChange={ onInputChange }
                  checked={ option.value === selectedValue as PaymentMethod }
                />
                <span className="btn-radio-image__image">
                  <svg
                    width={ option.width }
                    height={ option.height }
                    aria-hidden="true"
                  >
                    <use xlinkHref={ option.logo }></use>
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
