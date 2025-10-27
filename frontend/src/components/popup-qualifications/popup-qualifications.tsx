import {useEffect, useState} from 'react';
import classNames from 'classnames';

import {usePDFJS, useSlider} from '../../hooks';
import {isEscape} from '../../libs/shared/helpers';
import {QualificationType} from '../../libs/shared/types';
import {PDFViewer} from '../pdf-viewer';
import {STATIC_BASE_PATH} from '../../libs/shared/constants';

type PopupQualificationsPropsType = {
  qualifications: QualificationType[];
  isActive: boolean;
  onCloseClick: () => void;
}

export const PopupQualifications = ({qualifications, isActive, onCloseClick}: PopupQualificationsPropsType) => {
  const [localQualifications, setLocalQualifications] = useState<QualificationType[]>([]);
  const {allPages} = usePDFJS(localQualifications);
  const {sliderRef, buttonPrevRef, buttonNextRef} = useSlider(allPages.length, 1, 1, 'vertical');

  useEffect(() => {
    if (qualifications) {
      setLocalQualifications(qualifications.map((qualification) => (
        {...qualification, path: `${STATIC_BASE_PATH}/${qualification.path}`}
      )));
    }
  }, [qualifications]);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('keydown', handleKeyPressEsc);
    }

    return () => document.removeEventListener('keydown', handleKeyPressEsc);
  }, [isActive]);

  const handleKeyPressEsc = (evt: KeyboardEvent) => {
    if (isEscape(evt.key)) {
      onCloseClick();
    }
  };

  return (
    <div className={classNames('wrapper modal modal--certificates', {'is-active': isActive})}>
      <main>
        <div className="popup-form popup-form--certificates">
          <section className="popup">
            <h2 className="visually-hidden">Слайдер с сертификатами.</h2>
            <div className="popup__wrapper">
              <div className="popup-head">
                <h2 className="popup-head__header">Сертификаты</h2>
                <button
                  className="btn-icon btn-icon--outlined btn-icon--big"
                  type="button"
                  aria-label="close"
                  onClick={() => onCloseClick()}
                >
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref="#icon-cross"></use>
                  </svg>
                </button>
              </div>
              <div className="popup__content popup__content--certificates" ref={sliderRef}>
                <div className="popup__slider-buttons">
                  <button
                    className="btn-icon popup__slider-btn popup__slider-btn--prev"
                    type="button"
                    aria-label="prev"
                    ref={buttonPrevRef}
                  >
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg>
                  </button>
                  <button
                    className="btn-icon popup__slider-btn popup__slider-btn--next"
                    type="button"
                    aria-label="next"
                    ref={buttonNextRef}
                  >
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlinkHref="#arrow-right"></use>
                    </svg>
                  </button>
                </div>
                <ul className="popup__slider-list" style={{height: '471px'}}>
                  {
                    allPages.map((page) => (
                      <li className="popup__slide popup__slide--current" key={page.id}>
                        <div className="popup__slide-img">
                          <PDFViewer pdfPage={page} width={294} height={360}/>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
