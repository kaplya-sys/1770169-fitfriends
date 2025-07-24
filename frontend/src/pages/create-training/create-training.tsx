import { ChangeEvent, useState } from 'react';

import { Layout } from '../../components/layout';
import { CustomInput } from '../../ui/custom-input';
import { CustomSelect } from '../../ui/custom-select';
import { LEVEL_OPTIONS, SEX_OPTIONS, SPECIALIZATION_NAMES, SPECIALIZATION_OPTIONS, TRAINING_TIME_NAMES, TRAINING_TIME_OPTIONS, USER_LEVEL_NAME } from '../../lib/shared/constants';
import { CustomRadioGroup } from '../../ui/custom-radio-group';
import { CustomTextarea } from '../../ui/custom-textarea';

export const CreateTraining = () => {
  const [data, setData] = useState({
    name: '',
    type: '',
    description: '',
    trainingTime: '',
    level: '',
    sex: '',
    calories: '',
    price: '',
    video: File
  });
  const [error, setError] = useState({
    name: '',
    type: '',
    calories: '',
    trainingTime: '',
    price: '',
    level: '',
    description: ''
  });
  const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false);
  const [isTrainingTimeOpen, setIsTrainingTimeOpen] = useState<boolean>(false);
  const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTypeSelectClick = () => {
    setIsTypeOpen((prevState) => !prevState);
  };

  const handleTrainingTimeSelectClick = () => {
    setIsTrainingTimeOpen((prevState) => !prevState);
  };

  const handleLevelSelectClick = () => {
    setIsLevelOpen((prevState) => !prevState);
  };

  const handleTypeClick = (type: string) => {
    setData((prevState) => ({ ...prevState, type }));
    setError((prevState) => ({ ...prevState, type: '' }));
    setIsTypeOpen((prevState) => !prevState);
  };

  const handleTrainingTimeClick = (trainingTime: string) => {
    setData((prevState) => ({ ...prevState, trainingTime }));
    setError((prevState) => ({ ...prevState, trainingTime: '' }));
    setIsTrainingTimeOpen((prevState) => !prevState);
  };

  const handleLevelClick = (level: string) => {
    setData((prevState) => ({ ...prevState, level }));
    setError((prevState) => ({ ...prevState, level: '' }));
    setIsLevelOpen((prevState) => !prevState);
  };

  return (
    <Layout>
      <div className="popup-form popup-form--create-training">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Создание тренировки</h1>
            </div>
            <div className="popup-form__form">
              <form method="get">
                <div className="create-training">
                  <div className="create-training__wrapper">
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Название тренировки</h2>
                      <CustomInput
                        type='text'
                        name='name'
                        value={ data.name }
                        errorMessage={ error.name }
                        className='create-training__input'
                        onInputChange={ handleFieldChange }
                      />
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Характеристики тренировки</h2>
                      <div className="create-training__info">
                        <CustomSelect
                          title='Выберите тип тренировки'
                          selectedValue={ data.type }
                          isOpen={ isTypeOpen }
                          errorMessage={ error.type }
                          options={ SPECIALIZATION_OPTIONS }
                          nameTransform={ SPECIALIZATION_NAMES }
                          onListBoxClick={ handleTypeSelectClick }
                          onListOptionClick={ handleTypeClick }
                        />
                        <CustomInput
                          label='Сколько калорий потратим'
                          type='number'
                          name='calories'
                          value={ data.calories }
                          errorMessage={ error.calories }
                          fieldText='ккал'
                          textPosition='right'
                          onInputChange={ handleFieldChange }
                        />
                        <CustomSelect
                          title='Сколько времени потратим'
                          selectedValue={ data.trainingTime }
                          isOpen={ isTrainingTimeOpen }
                          errorMessage={ error.trainingTime }
                          options={ TRAINING_TIME_OPTIONS }
                          nameTransform={ TRAINING_TIME_NAMES }
                          onListBoxClick={ handleTrainingTimeSelectClick }
                          onListOptionClick={ handleTrainingTimeClick }
                        />
                        <CustomInput
                          label='Стоимость тренировки'
                          type='number'
                          name='price'
                          value={ data.price }
                          errorMessage={ error.price }
                          fieldText='₽'
                          textPosition='right'
                          onInputChange={ handleFieldChange }
                        />
                        <CustomSelect
                          title='Выберите уровень тренировки'
                          selectedValue={ data.level }
                          isOpen={ isLevelOpen }
                          errorMessage={ error.level }
                          options={ LEVEL_OPTIONS }
                          nameTransform={ USER_LEVEL_NAME }
                          onListBoxClick={ handleLevelSelectClick }
                          onListOptionClick={ handleLevelClick }
                        />
                        <div className="create-training__radio-wrapper">
                          <span className="create-training__label">Кому подойдет тренировка</span>
                          <br />
                          <CustomRadioGroup
                            selectedValue={ data.sex }
                            className='create-training__radio'
                            isBig={ false }
                            options={ SEX_OPTIONS }
                            onInputChange={ handleFieldChange }
                          />
                          <div className="custom-toggle-radio create-training__radio">
                            <div className="custom-toggle-radio__block">
                              <label>
                                <input type="radio" name="gender" />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">Мужчинам</span>
                              </label>
                            </div>
                            <div className="custom-toggle-radio__block">
                              <label>
                                <input type="radio" name="gender" checked/>
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">Женщинам</span>
                              </label>
                            </div>
                            <div className="custom-toggle-radio__block">
                              <label>
                                <input type="radio" name="gender" />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">Всем</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Описание тренировки</h2>
                      <CustomTextarea
                        name='description'
                        value={ data.description }
                        className='create-training__textarea'
                        onTextareaChange={ handleFieldChange }
                      />
                    </div>
                    <div className="create-training__block">
                      <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                      <div className="drag-and-drop create-training__drag-and-drop">
                        <label>
                          <span className="drag-and-drop__label" tabIndex={ 0 }>Загрузите сюда файлы формата MOV, AVI или MP4
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import-video"></use>
                            </svg>
                          </span>
                          <input type="file" name="import" tabIndex={ -1 } accept=".mov, .avi, .mp4" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="btn create-training__button" type="submit">Опубликовать</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
