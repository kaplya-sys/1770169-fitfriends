import {ChangeEvent, useEffect, useState} from 'react';
import classNames from 'classnames';

import {CustomTextarea} from '../../ui/custom-textarea';
import {TRAINING_RATE} from '../../libs/shared/constants';
import {CreateFeedbackType} from '../../libs/shared/types';
import {isErrorObject, isEscape, validateFields} from '../../libs/shared/helpers';
import {createFeedbackAction, selectFeedbackError} from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';

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
  const feedbackError = useAppSelector(selectFeedbackError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPressEsc);
    }

    return () => document.removeEventListener('keydown', handleKeyPressEsc);
  }, [isActive]);

  useEffect(() => {
    if (isErrorObject(feedbackError) && feedbackError.statusCode === 400) {
      for (const message of feedbackError.message) {
        const field = message.split(' ')[0];
        setError((prevState) => ({...prevState, [field]: message}));
      }
    }
  }, [feedbackError]);

  const handleKeyPressEsc = (evt: KeyboardEvent) => {
    if (isEscape(evt.key)) {
      onCloseClick();
    }
  };
  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setData((prevState) => ({...prevState, [name]: value}));
    setError((prevState) => ({...prevState, [name]: ''}));
  };
  const handleContinueClick = () => {
    const newError = validateFields(data);

    if (!newError) {
      dispatch(createFeedbackAction(data));
      setData((prevState) => ({...prevState, assessment: null, content: null}));
      onCloseClick();
    } else {
      setError(newError);
    }
  };
  const handleCloseClick = () => {
    setData((prevState) => ({...prevState, assessment: null, content: null}));
    onCloseClick();
  };

  return (
    <div className={classNames('wrapper modal modal--feedback', {'is-active': isActive})}>
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
                  onClick={handleCloseClick}
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
