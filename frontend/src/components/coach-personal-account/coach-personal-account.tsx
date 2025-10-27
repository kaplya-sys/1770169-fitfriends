import {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {StubGum} from '../stub-gym';
import {
  AppRoute,
  CardInfoType,
  PDFPageType,
  QualificationType,
  UserType
} from '../../libs/shared/types';
import {getRouteWithParam, removePDFPage, updatePDFPage} from '../../libs/shared/helpers';
import {PDFViewer} from '../pdf-viewer';
import {SliderControls} from '../slider-controls';
import {useAppDispatch, usePDFJS, useSlider} from '../../hooks';
import {STATIC_BASE_PATH} from '../../libs/shared/constants';
import {deleteQualificationFileAction, updateQualificationFileAction, updateUserAction} from '../../store';

type CoachPersonalAccountProps = {
  user: UserType;
}

export const CoachPersonalAccount = ({user}: CoachPersonalAccountProps) => {
  const [qualifications, setQualifications] = useState<QualificationType[]>([]);
  const [pdfFile, setPDFFile] = useState<null | Blob>(null);
  const [cardInfo, setCardInfo] = useState<CardInfoType[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const {allPages} = usePDFJS(qualifications);
  const {sliderRef, buttonPrevRef, buttonNextRef} = useSlider(allPages.length, 3, 3);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.questionnaire.qualifications) {
      setQualifications(user.questionnaire.qualifications.map((qualification) => (
        {...qualification, path: `${STATIC_BASE_PATH}/${qualification.path}`}
      )));
    }
  }, [user.questionnaire.qualifications]);

  useEffect(() => {
    if (cardInfo.length) {
      setCardInfo(allPages.map((page) => {
        const card = cardInfo.find((item) => item.id === page.id);
        return card ? card : {id: page.id, isEdit: false, isDisabled: false};
      }));
      return;
    }
    setCardInfo(allPages.map((page) => ({id: page.id, isEdit: false, isDisabled: false})));
  }, [allPages.length]);

  const handleUploadClick = (page?: PDFPageType) => {
    if (inputRef.current) {
      if (page) {
        inputRef.current.dataset.page = page.qualificationId;
      }
      inputRef.current.click();
    }
  };
  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {files, dataset} = evt.target;

    if (files) {
      if (dataset.page) {
        const update = async () => {
          const page = allPages.find((item) => item.qualificationId === dataset.page);

          if (!page) {
            return;
          }
          const pdfBlob = await updatePDFPage(qualifications, page, files[0]);

          if (pdfBlob && pdfBlob instanceof Blob) {
            const pdfBytes = URL.createObjectURL(pdfBlob);
            setPDFFile(pdfBlob);
            setQualifications((prevState) => {
              const filteredQualifications = prevState.filter((item) => item.id !== page.qualificationId);
              filteredQualifications.unshift({id: page.qualificationId, path: pdfBytes});

              return filteredQualifications;
            });
          }
        };
        update();
        inputRef.current?.removeAttribute('data-page');

        return;
      }
      const formData = new FormData();
      formData.append('qualification', files[0]);
      dispatch(updateUserAction(formData));
    }
  };
  const handleRemoveClick = (page: PDFPageType) => {
    if (pdfFile) {
      const qualification = user.questionnaire.qualifications?.find((item) => item.id === page.qualificationId);
      setQualifications((prevState) => {
        const filteredQualifications = prevState.filter((item) => item.id !== page.qualificationId);
        filteredQualifications.unshift({id: page.qualificationId, path: `${STATIC_BASE_PATH}/${qualification?.path}`});

        return filteredQualifications;
      });
      setPDFFile(null);
      return;
    }
    setCardInfo((prevState) => prevState.map((item) => {
      if (item.id === page.id) {
        return ({...item, isDisabled: !item.isDisabled});
      }

      return ({...item, isDisabled: false});
    }));
  };
  const handleToggleEditClick = (page: PDFPageType) => {
    const card = cardInfo.find((item) => item.id === page.id);

    if (!card) {
      return;
    }

    if (!card.isEdit) {
      setCardInfo((prevState) => prevState.map((item) => {
        if (item.id === page.id) {
          return ({...item, isEdit: true});
        }

        return ({...item, isEdit: false});
      }));

      return;
    }
    const formData = new FormData();

    if (!card.isDisabled && pdfFile) {
      formData.append('qualification', pdfFile);
      dispatch(updateQualificationFileAction({id: page.qualificationId, formData}));
      setPDFFile(null);
    }

    if (card.isDisabled) {
      const remove = async () => {
        const pdfBlob = await removePDFPage(qualifications, page);

        if (!pdfBlob) {
          dispatch(deleteQualificationFileAction({id: page.qualificationId}));
          setQualifications((prevState) => prevState.filter((item) => item.id !== page.qualificationId));
          return;
        }

        if (pdfBlob instanceof Blob) {
          const pdfBytes = URL.createObjectURL(pdfBlob);
          formData.append('qualification', pdfBlob);
          dispatch(updateQualificationFileAction({id: page.qualificationId, formData}));
          setQualifications((prevState) => prevState.map((item) => item.id === page.qualificationId ? {...item, path: pdfBytes} : item));
        }
      };

      remove();
    }
    setCardInfo((prevState) => prevState.map((item) => {
      if (item.id === page.id) {
        return ({...item, isEdit: !item.isEdit});
      }

      return ({...item, isEdit: false});
    }));
  };

  return (
    <div className="personal-account-coach">
      <div className="personal-account-coach__navigation">
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={getRouteWithParam(AppRoute.MyTrainings, {id: user.id})}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-flash"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои тренировки</span>
        </Link>
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={AppRoute.CreateTraining}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-add"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Создать тренировку</span>
        </Link>
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={getRouteWithParam(AppRoute.MyFriends, {id: user.id})}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои друзья</span>
        </Link>
        <Link
          className="thumbnail-link thumbnail-link--theme-light"
          to={getRouteWithParam(AppRoute.MyOrders, {id: user.id})}
        >
          <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
            <svg width="30" height="26" aria-hidden="true">
              <use xlinkHref="#icon-bag"></use>
            </svg>
          </div>
          <span className="thumbnail-link__text">Мои заказы</span>
        </Link>
        <div className="personal-account-coach__calendar">
          <StubGum title='Скоро тут будет интересно'/>
        </div>
      </div>
      <div className="personal-account-coach__additional-info" ref={sliderRef}>
        <div className="personal-account-coach__label-wrapper">
          <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
          <input
            ref={inputRef}
            className='visually-hidden'
            type="file"
            name="qualifications"
            tabIndex={-1}
            accept=".pdf"
            onChange={handleInputChange}
          />
          <button
            className="btn-flat btn-flat--underlined personal-account-coach__button"
            type="button"
            onClick={() => handleUploadClick()}
          >
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-import"></use>
            </svg>
            <span>Загрузить</span>
          </button>
          <SliderControls
            className='personal-account-coach'
            prevRef={buttonPrevRef}
            nextRef={buttonNextRef}
          />
        </div>
        <ul className="personal-account-coach__list">
          {
            allPages.map((page) => {
              const card = cardInfo.find((item) => item.id === page.id);
              const isCardEdit = card?.isEdit;
              const isCardDisabled = card?.isDisabled;

              return (
                <li className="personal-account-coach__item" key={page.id}>
                  <div className={classNames('certificate-card', {'certificate-card--edit': isCardEdit})}>
                    <div className="certificate-card__image" style={isCardDisabled ? {opacity: 0.2} : {}}>
                      <PDFViewer pdfPage={page} width={294} height={360}/>
                    </div>
                    <div className="certificate-card__buttons">
                      <button
                        className={classNames(
                          'btn-flat btn-flat--underlined certificate-card__button',
                          {
                            'certificate-card__button--edit': !isCardEdit,
                            'certificate-card__button--save': isCardEdit
                          })}
                        type="button"
                        onClick={() => handleToggleEditClick(page)}
                      >
                        <svg width="12" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-edit"></use>
                        </svg>
                        <span>{isCardEdit ? 'Сохранить' : 'Изменить'}</span>
                      </button>
                      <div className="certificate-card__controls">
                        <button
                          className="btn-icon certificate-card__control"
                          type="button"
                          aria-label="next"
                          onClick={() => handleUploadClick(page)}
                        >
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-change"></use>
                          </svg>
                        </button>
                        <button
                          className="btn-icon certificate-card__control"
                          type="button" aria-label="next"
                          onClick={() => handleRemoveClick(page)}
                        >
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-trash"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};
