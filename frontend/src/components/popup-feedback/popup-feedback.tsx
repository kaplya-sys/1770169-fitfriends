import {ChangeEvent, useState} from 'react';
import classNames from 'classnames';

import {CustomTextarea} from '../../ui/custom-textarea';
import {TRAINING_RATE} from '../../libs/shared/constants';
import {CreateFeedbackType} from '../../libs/shared/types';
import {validateFields} from '../../libs/shared/helpers';
import {createFeedbackAction} from '../../store';
import { useAppDispatch } from '../../hooks';

type PopupFeedbackProps = {
  isActive: boolean;
  onCloseClick: () => void;
}

export const PopupFeedback = ({isActive, onCloseClick}: PopupFeedbackProps) => {
  const [data, setData] = useState<CreateFeedbackType>({
    assessment: null,
    content: null
  });
  const [error, setError] = useState<Partial<Record<keyof CreateFeedbackType, string>>>({});
  const dispatch = useAppDispatch();

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setData((prevState) => ({...prevState, [name]: value}));
  };
  const handleContinueClick = () => {
    const newError = validateFields(data);

    if (!newError) {
      dispatch(createFeedbackAction(data));
      setData((prevState) => ({...prevState, assessment: null, content: null}));
      setError((prevState) => ({...prevState, assessment: '', content: ''}));
      onCloseClick();
    } else {
      setError(newError);
    }
  };

  return (
    <div className={classNames('wrapper modal modal--buy', {'is-active': isActive})}>
      <main>
        <div className="popup-form popup-form--feedback">
          <section className="popup">
            <div className="popup__wrapper">
              <div className="popup-head">
                <h2 className="popup-head__header">Оставить отзыв</h2>
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
              <div className="popup__content popup__content--feedback">
                <h3 className="popup__feedback-title">Оцените тренировку</h3>
                <ul className="popup__rate-list">
                  {Array.from({length: TRAINING_RATE.MAX}, (_, key) => ({rate: key + 1})).map(({rate}) => (
                    <li className="popup__rate-item" key={rate}>
                      <div className="popup__rate-item-wrap">
                        <label>
                          <input
                            type="radio"
                            name="assessment"
                            aria-label={`оценка ${rate}.`}
                            value={rate}
                            checked={rate === Number(data.assessment)}
                            onChange={handleFieldChange}
                          />
                          <span className="popup__rate-number">{rate}</span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="popup__feedback">
                  <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
                  <div className="popup__feedback-textarea">
                    <CustomTextarea
                      name='content'
                      errorMessage={error.content}
                      value={data.content || ''}
                      onTextareaChange={handleFieldChange}
                    />
                  </div>
                </div>
                <div className="popup__button">
                  <button className="btn" type="button" onClick={handleContinueClick}>Продолжить</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
